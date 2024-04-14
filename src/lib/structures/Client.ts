import { container } from '@sapphire/pieces';
import { logger } from 'console-wizard';
import { ActivityType, Client as DjsClient, type ClientOptions, type Snowflake } from 'discord.js';
import { fetchSubCount } from '../services/fetchSubCount';
import { Command } from './Command';

import '../controllers/database';

interface ExtendedClientOptions {
  prefix: string;
}

export class Client<Ready extends boolean = boolean> extends DjsClient<Ready> {
  public commands: Map<string, Command>;

  constructor(options: ClientOptions) {
    super(options);

    container.client = this;

    this.commands = new Map();
  }

  public async init() {
    logger.info('[CLIENT] Connecting...');

    const start = Date.now();

    this.options.presence = {
      status: 'online',
      activities: [
        {
          name: `${await fetchSubCount()} subscribers on YouTube`,
          type: ActivityType.Watching,
        },
      ],
    };

    await this.login(process.env['DISCORD_TOKEN']);

    logger.info(`[CLIENT] Connected! Took ${Date.now() - start}ms`);
  }
}

declare module 'discord.js' {
  interface Client {
    id: Snowflake | null;
  }
  interface ClientOptions extends ExtendedClientOptions {}
}

declare module '@sapphire/pieces' {
  interface Container {
    client: Client;
  }
}
