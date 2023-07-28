import { buildServer } from '@/utils/server';

async function main() {
  const app = buildServer();

  app.listen({
    port: 3001,
  });
}

main();
