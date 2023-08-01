import {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
} from '@/models/users/users.controller';
import {
  createUserSchema,
  getUserByIdSchema,
} from '@/models/users/users.schema';
import { FastifyInstance } from 'fastify';

export default async function usersRouteHandler(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        body: createUserSchema,
      },
    },
    createUserHandler
  );

  app.get('/', getUsersHandler);

  app.get(
    '/:id',
    {
      schema: {
        params: getUserByIdSchema,
      },
    },
    getUserByIdHandler
  );
}
