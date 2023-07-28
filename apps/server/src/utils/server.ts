import { validatorCompiler } from '@/middleware/validatorCompiler';
import fastify from 'fastify';

export function buildServer() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);

  return app;
}
