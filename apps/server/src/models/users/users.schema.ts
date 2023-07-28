import { z } from 'zod';

// TODO: Add custom error messages
export const createUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  })
  .refine(({ password, confirm_password }) => password === confirm_password);

export type CreateUser = z.infer<typeof createUserSchema>;

// TODO: Add custom error messages
export const getUserByIdSchema = z.object({
  id: z.string().uuid(),
});

export type GetUserById = z.infer<typeof getUserByIdSchema>;
