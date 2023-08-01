import {
  CreateProduct,
  GetProductById,
} from '@/models/products/products.schema';
import {
  createProduct,
  getProductById,
  getProducts,
} from '@/models/products/products.service';
import {
  ImageReturn,
  handleImageUpload,
  removeUploadedImages,
} from '@/utils/upload/imageUpload';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DatabaseError } from 'pg';

export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProduct;
  }>,
  reply: FastifyReply
) {
  const images = Array<ImageReturn>();

  try {
    await handleImageUpload(
      {
        file: request.body.product_image,
        files: request.body.image_gallery,
      },
      images
    );

    const product = await createProduct({
      ...request.body,
      images,
    });

    reply.code(201).send(product);
  } catch (error) {
    await removeUploadedImages(images);

    if (error instanceof DatabaseError) {
      if (error.code === '23505') {
        return reply.code(409).send({ message: 'SKU is already in use' });
      }
    }

    reply.code(500).send({ message: 'Internal server error' });
  }
}

export async function getProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getProducts();

    reply.code(200).send(products);
  } catch (error) {
    reply.code(500).send({ message: 'Internal server error' });
  }
}

export async function getProductByIdHandler(
  request: FastifyRequest<{ Params: GetProductById }>,
  reply: FastifyReply
) {
  try {
    const product = await getProductById(request.params.id);

    if (!product) reply.code(404).send({ message: 'Product not found' });

    reply.code(200).send(product);
  } catch (error) {
    console.log(error);

    reply.code(500).send({ message: 'Internal server error' });
  }
}
