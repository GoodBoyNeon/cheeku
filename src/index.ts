import { config } from './config';
import { Client } from './lib';
import announcement from '../announcement.json';
import { writeFileSync } from 'fs';

import './lib/controllers/bootstrapListeners';
import { Channels } from 'lib/utils/constants';
import { TextBasedChannel } from 'discord.js';
import path from 'path';

process.env.NODE_ENV ??= 'development';

void (async () => {
  const client = new Client({
    prefix: '.',
    intents: config.intents,
    partials: config.partials,
  });

  await client.init();

  /* Announcements */

  if (announcement.new) {
    await ((await client.channels.fetch(Channels.noPingAnnouncements)) as TextBasedChannel).send(announcement.message);

    writeFileSync(path.join(__dirname, '..', 'announcement.json'), JSON.stringify({ new: false, message: announcement.message }), 'utf-8');
  }
})();

declare module 'bun' {
  interface Env {
    DISCORD_TOKEN: string;
    GOOGLE_API_KEY: string;
  }
}
