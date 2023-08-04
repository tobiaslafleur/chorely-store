import db from '@/db';
import { queries } from '@/db/queries';
import { Session } from '@/db/types';

export async function login() {}

export async function createSession(userId: string, userAgent: string) {
  const { rows } = await db.query<Session>({
    text: queries.sessions.insertSession,
    values: [userId, userAgent],
  });

  return rows[0];
}
