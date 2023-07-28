import db from '@/db';
import { FastifyInstance } from 'fastify';

const signals = ['SIGTERM', 'SIGINT', 'SIGBREAK'] as const;

export async function gracefulShutdown(app: FastifyInstance) {
  await app.close();
  await db.end();

  process.exit(1);
}

export async function registerSignals(app: FastifyInstance) {
  signals.forEach((signal) => {
    process.on(signal, async () => await gracefulShutdown(app));
  });
}

export async function checkDatabase(app: FastifyInstance) {
  if (!(await db.healthCheck())) await gracefulShutdown(app);
}
