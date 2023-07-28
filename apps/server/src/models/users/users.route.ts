import {
  createUserHandler,
  getMultipleUsersHandler,
  getUserByIdHandler,
} from '@/models/users/users.controller';
import {
  createUserSchema,
  getUserByIdSchema,
} from '@/models/users/users.schema';
import { FastifyInstance } from 'fastify';

export default async function usersHandler(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        body: createUserSchema,
      },
    },
    createUserHandler
  );

  app.get('/', getMultipleUsersHandler);

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
