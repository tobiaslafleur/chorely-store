import db from '@/db';
import { queries } from '@/db/queries';
import {
  InsertUser,
  SelectMultipleUsers,
  SelectUserByEmailWithPassword,
  SelectUserById,
} from '@/db/types';
import { CreateUser } from '@/models/users/users.schema';
import argon2 from 'argon2';

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

export async function getUserByEmailWithPassword(email: string) {
  const { rows } = await db.query<SelectUserByEmailWithPassword>({
    text: queries.users.selectUserByEmailWithPassword,
    values: [email],
  });

  return rows[0];
}

export async function validatePassword(
  password: string,
  candidatePassword: string
) {
  return await argon2.verify(password, candidatePassword);
}
