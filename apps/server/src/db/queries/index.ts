import * as users from '@/db/queries/users';
import * as products from '@/db/queries/products';
import * as images from '@/db/queries/images';
export * from '@/db/queries/types';

export const queries = {
  users,
  products,
  images,
};
