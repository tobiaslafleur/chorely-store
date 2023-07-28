import { CreateUser, GetUserById } from '@/models/users/users.schema';
import { FastifyReply, FastifyRequest } from 'fastify';
import argon2 from 'argon2';
import {
  createUser,
  getMultipleUsers,
  getUserById,
} from '@/models/users/users.service';
import { DatabaseError } from 'pg';

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUser }>,
  reply: FastifyReply
) {
  try {
    const { password, confirm_password, ...rest } = request.body;

    const hash = await argon2.hash(password);

    const user = await createUser({ ...rest, password: hash });

    return reply.code(201).send(user);
  } catch (error) {
    if (error instanceof DatabaseError) {
      if (error.code === '23505') {
        return reply.code(409).send({ message: 'Email is already in use' });
      }
    }

    return reply.code(500).send({ message: 'Internal server error' });
  }
}

export async function getMultipleUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userList = await getMultipleUsers();

    return reply.code(200).send(userList);
  } catch (error) {
    return reply.code(500).send({ message: 'Internal server error' });
  }
}

export async function getUserByIdHandler(
  request: FastifyRequest<{ Params: GetUserById }>,
  reply: FastifyReply
) {
  try {
    const user = await getUserById(request.params.id);

    return reply.code(200).send(user);
  } catch (error) {
    return reply.code(500).send({ message: 'Internal server error' });
  }
}
