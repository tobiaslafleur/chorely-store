import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { ZodSchema } from 'zod';

export function validatorCompiler({
  schema,
  httpPart,
}: FastifyRouteSchemaDef<ZodSchema>) {
  return (data: any) => {
    const parsed = schema.safeParse(data);

    if (parsed.success) return true;

    const issues = parsed.error.issues.map((issue) => issue.message).join(', ');

    return {
      error: new Error(`${issues} on request.${httpPart}`),
    };
  };
}
