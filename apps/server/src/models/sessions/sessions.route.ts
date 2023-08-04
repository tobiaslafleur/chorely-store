import { loginHandler } from '@/models/sessions/sessions.controller';
import { loginSchema } from '@/models/sessions/sessions.schema';
import { FastifyInstance } from 'fastify';

export default async function sessionsRouteHandler(app: FastifyInstance) {
  app.post(
    '/login',
    {
      schema: {
        body: loginSchema,
      },
    },
    loginHandler
  );
}
