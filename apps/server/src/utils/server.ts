import { validatorCompiler } from '@/middleware/validatorCompiler';
import routeHandler from '@/routes';
import fastify from 'fastify';

export function buildServer() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);

  app.register(routeHandler, { prefix: '/api/v1' });

  return app;
}
