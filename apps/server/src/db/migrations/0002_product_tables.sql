CREATE TABLE IF NOT EXISTS products(
  internal_id SERIAL,
	id UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
  sku VARCHAR(16) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(internal_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS products_uuid_index ON products(id);
CREATE UNIQUE INDEX IF NOT EXISTS products_sku_index ON products(sku);

CREATE TABLE IF NOT EXISTS images(
  internal_id SERIAL,
  id UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY(internal_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS images_uuid_index ON products(id);

CREATE TABLE IF NOT EXISTS product_images(
  product_id UUID NOT NULL,
  image_id UUID NOT NULL,
  is_primary BOOLEAN NOT NULL,
  PRIMARY KEY(product_id, image_id),
  CONSTRAINT fk_product_images_to_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_product_images_to_image FOREIGN KEY(image_id) REFERENCES images(id) ON DELETE CASCADE
);