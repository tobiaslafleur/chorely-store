import env from '@/utils/env';
import { Pool, QueryConfig, QueryResultRow } from 'pg';

const pool = new Pool({
  host: env.PG_HOST,
  port: env.PG_PORT,
  database: env.PG_DATABASE,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
});

export default {
  query: async <R extends QueryResultRow = any, I extends any[] = any[]>(
    config: QueryConfig<I>
  ) => {
    const res = await pool.query<R, I>(config);

    return res;
  },
  getConnection: async () => {
    return await pool.connect();
  },
  healthCheck: async () => {
    try {
      await pool.query('SELECT 1;');

      return true;
    } catch (error) {
      return false;
    }
  },
  end: async () => {
    return await pool.end();
  },
};
