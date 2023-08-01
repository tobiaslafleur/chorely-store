import db from '@/db';
import { queries } from '@/db/queries';
import { InsertUser, SelectMultipleUsers, SelectUserById } from '@/db/types';
import { CreateUser } from '@/models/users/users.schema';

export async function createUser(input: Omit<CreateUser, 'confirm_password'>) {
  const { email, password, first_name, last_name } = input;

  const { rows } = await db.query<InsertUser>({
    text: queries.users.insertUser,
    values: [email, password, first_name, last_name],
  });

  return rows[0];
}

export async function getUsers() {
  const { rows } = await db.query<SelectMultipleUsers>({
    text: queries.users.selectMultipleUsers,
  });

  return rows;
}

export async function getUserById(id: string) {
  const { rows } = await db.query<SelectUserById>({
    text: queries.users.selectUserById,
    values: [id],
  });

  return rows[0];
}
