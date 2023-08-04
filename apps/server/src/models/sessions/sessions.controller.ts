import { Login } from '@/models/sessions/sessions.schema';
import { createSession } from '@/models/sessions/sessions.service';
import {
  getUserByEmailWithPassword,
  validatePassword,
} from '@/models/users/users.service';
import { signJWT } from '@/utils/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { omit } from '@/utils/omit';

export async function loginHandler(
  request: FastifyRequest<{ Body: Login }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;

    const user = await getUserByEmailWithPassword(email);

    if (!user) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await validatePassword(user.password, password);

    if (!isPasswordValid) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const session = await createSession(
      user.id,
      request.headers['user-agent'] || ''
    );

    const accessToken = signJWT(
      {
        ...omit(user, ['password']),
        session: session.id,
      },
      {
        expiresIn: 900,
      }
    );

    const refreshToken = signJWT(
      {
        ...omit(user, ['password']),
        session: session.id,
      },
      {
        expiresIn: 3600,
      }
    );

    return reply.status(200).send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return reply.code(500).send({ message: 'Internal server error' });
  }
}
