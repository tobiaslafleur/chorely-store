import { validatorCompiler } from '@/middleware/validatorCompiler';
import routeHandler from '@/routes';
import fastify from 'fastify';
import multipart from '@fastify/multipart';

export function buildServer() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);

  app.register(multipart, {
    attachFieldsToBody: 'keyValues',
  });

  app.register(routeHandler, { prefix: '/api/v1' });

  return app;
}
