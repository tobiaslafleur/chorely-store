import { Pool, QueryConfig, QueryResultRow } from 'pg';

const pool = new Pool({});

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
};
