import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  HOST: z
    .string({
      invalid_type_error: 'HOST must be of type string',
    })
    .ip('HOST must be a valid ip adress')
    .default('127.0.0.1'),
  PORT: z.coerce
    .number({
      invalid_type_error: 'PORT must be of type number or string',
    })
    .default(3001),
  PG_HOST: z
    .string({
      invalid_type_error: 'HOST must be of type string',
      required_error: 'HOST is required',
    })
    .ip('PG_HOST must be a valid ip adress'),
  PG_PORT: z.coerce
    .number({
      invalid_type_error: 'PG_PORT must be of type number or string',
    })
    .default(5432),
  PG_DATABASE: z.string({
    invalid_type_error: 'PG_DATABASE must be of type string',
    required_error: 'PG_DATABASE is required',
  }),
  PG_USER: z.string({
    invalid_type_error: 'PG_USER must be of type string',
    required_error: 'PG_USER is required',
  }),
  PG_PASSWORD: z.string({
    invalid_type_error: 'PG_PASSWORD must be of type string',
    required_error: 'PG_PASSWORD is required',
  }),
});

const env = envSchema.parse(process.env);

export default env;