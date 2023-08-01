import {
  createProductHandler,
  getProductByIdHandler,
  getProductsHandler,
} from '@/models/products/products.controller';
import {
  createProductSchema,
  getProductByIdSchema,
} from '@/models/products/products.schema';
import { FastifyInstance } from 'fastify';

export default async function productsRouteHandler(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        body: createProductSchema,
      },
    },
    createProductHandler
  );

  app.get('/', getProductsHandler);

  app.get(
    '/:id',
    {
      schema: {
        params: getProductByIdSchema,
      },
    },
    getProductByIdHandler
  );
}
