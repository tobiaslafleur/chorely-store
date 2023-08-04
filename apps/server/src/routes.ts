import db from '@/db';
import usersRouteHandler from '@/models/users/users.route';
import productsRouteHandler from '@/models/products/products.route';
import sessionsRouteHandler from '@/models/sessions/sessions.route';
import { FastifyInstance } from 'fastify';

export default async function routeHandler(app: FastifyInstance) {
  app.get('/healthcheck', async (request, reply) => {
    const healthy = await db.healthCheck();

    if (!healthy) {
      return reply.code(500).send({ message: 'Postgres is not responding 🔥' });
    }

    return reply.code(200).send({ message: 'OK' });
  });

  app.register(usersRouteHandler, { prefix: '/users' });
  app.register(sessionsRouteHandler, { prefix: '/sessions' });
  app.register(productsRouteHandler, { prefix: '/products' });
}
