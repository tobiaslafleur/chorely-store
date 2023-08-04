export const insertProduct = /*sql*/ `
  INSERT INTO products(sku, name, description, price)
  VALUES($1, $2, $3, $4)
  RETURNING id, sku, name, description, price, created_at, updated_at
`.replace(/\n/g, ' ');

export const insertProductImages = /*sql*/ `
  INSERT INTO product_images(product_id, image_id, is_primary)
  VALUES($1, $2, $3)
  RETURNING product_id, image_id, is_primary
`.replace(/\n/g, ' ');

export const selectProducts = /*sql*/ `
  SELECT 
    p.id,
    p.sku,
    p.name,
    p.description,
    p.price,
    p.created_at,
    p.updated_at,
    i.url as product_image
  FROM products p
  LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = true
  LEFT JOIN images i ON i.id = pi.image_id
`.replace(/\n/g, ' ');

export const selectProductById = /*sql*/ `
  SELECT 
    p.id,
    p.sku,
    p.name,
    p.description,
    p.price,
    p.created_at,
    p.updated_at,
    (
      SELECT
        i.url
      FROM product_images pi
      LEFT JOIN images i ON i.id = pi.image_id
      WHERE pi.product_id = p.id AND pi.is_primary = true
      LIMIT 1
	  ) AS product_image,
    CASE WHEN COUNT(pi.product_id) > 0 THEN ARRAY_AGG(i.url) ELSE ARRAY[]::VARCHAR[] END AS images
  FROM products p
  LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = false
  LEFT JOIN images i ON i.id = pi.image_id
  WHERE p.id = $1
  GROUP BY  p.id, p.sku, p.name, p.description, p.price, p.created_at, p.updated_at
`.replace(/\n/g, ' ');
