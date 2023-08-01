import env from '@/utils/env';
import { createFolders } from '@/utils/folders';
import {
  checkDatabase,
  gracefulShutdown,
  registerSignals,
} from '@/utils/gracefulShutdown';
import { buildServer } from '@/utils/server';

async function main() {
  const app = buildServer();

  await createFolders();
  await checkDatabase(app);
  await registerSignals(app);

  app.listen({ port: env.PORT }, async (error) => {
    if (error) return await gracefulShutdown(app);

    console.log(
      `Application is listening on http://${env.HOST}:${env.PORT} 🚀`
    );
  });
}

main();
