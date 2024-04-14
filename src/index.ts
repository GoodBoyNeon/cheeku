import { config } from './config';
import { Client } from './lib/structures';

import './lib/controllers/bootstrapListeners';

process.env.NODE_ENV ??= 'production';

void (async () => {
  const client = new Client({
    prefix: '.',
    intents: config.intents,
    partials: config.partials,
  });

  await client.init();
})();

// declare module 'bun' {
//   interface Env {
//     DISCORD_TOKEN: string;
//     GOOGLE_API_KEY: string;
//   }
// }
//
