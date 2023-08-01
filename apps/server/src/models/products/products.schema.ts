import { Prettify } from '@/db/types';
import { ImageReturn } from '@/utils/upload/imageUpload';
import { z } from 'zod';

// TODO: Add custom error messages
export const createProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  description: z.string(),
  price: z
    .number({
      coerce: true,
    })
    .int(),
  product_image: z.instanceof(Buffer),
  image_gallery: z.array(z.instanceof(Buffer)),
});

export type CreateProduct = z.infer<typeof createProductSchema>;
export type CreateProductInsert = Prettify<
  Omit<CreateProduct, 'product_image' | 'image_gallery'> & {
    images: ImageReturn[];
  }
>;

// TODO: Add custom error messages
export const getProductByIdSchema = z.object({
  id: z.string().uuid(),
});

export type GetProductById = z.infer<typeof getProductByIdSchema>;
