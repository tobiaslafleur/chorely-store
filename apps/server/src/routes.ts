import db from '@/db';
import usersHandler from '@/models/users/users.route';
import { FastifyInstance } from 'fastify';

export default async function routeHandler(app: FastifyInstance) {
  app.get('/healthcheck', async (request, reply) => {
    const health = await db.healthCheck();

    if (!health) {
      return reply.code(500).send({ message: 'Postgres is not responding 🔥' });
    }

    return reply.code(200).send({ message: 'OK' });
  });

  app.register(usersHandler, { prefix: '/users' });
}
