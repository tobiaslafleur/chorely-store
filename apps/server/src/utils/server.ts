import { validatorCompiler } from '@/middleware/validatorCompiler';
import routeHandler from '@/routes';
import fastify from 'fastify';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';

export function buildServer() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);

  app.register(multipart, {
    attachFieldsToBody: 'keyValues',
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, '../..', 'uploads'),
    prefix: '/public',
    immutable: true,
  });

  app.register(routeHandler, { prefix: '/api/v1' });

  return app;
}
