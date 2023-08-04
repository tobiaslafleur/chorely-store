import { z } from 'zod';

//TODO: Add custom errors and password constraints
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type Login = z.infer<typeof loginSchema>;
