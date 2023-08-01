import db from '@/db';
import { queries } from '@/db/queries';
import { Image, Product, SelectProductById, SelectProducts } from '@/db/types';
import { CreateProductInsert } from '@/models/products/products.schema';

export async function createProduct(input: CreateProductInsert) {
  const { sku, name, description, price, images } = input;

  const client = await db.getConnection();

  try {
    await client.query('BEGIN');

    const { rows: product } = await client.query<Product>({
      text: queries.products.insertProduct,
      values: [sku, name, description, price],
    });

    for (const image of images) {
      const { rows: insertedImage } = await client.query<Image>({
        text: queries.images.insertImage,
        values: [image.url],
      });

      await client.query({
        text: queries.products.insertProductImages,
        values: [product[0].id, insertedImage[0].id, image.isPrimary],
      });
    }

    await client.query('COMMIT');

    return {
      ...product[0],
      product_image: images.filter((image) => image.isPrimary)[0].url,
      images: images
        .filter((image) => !image.isPrimary)
        .map((image) => image.url),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getProducts() {
  const { rows } = await db.query<SelectProducts>({
    text: queries.products.selectProducts,
  });

  return rows;
}

export async function getProductById(id: string) {
  const { rows } = await db.query<SelectProductById>({
    text: queries.products.selectProductById,
    values: [id],
  });

  return rows[0];
}
