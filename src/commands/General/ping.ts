import { Message } from 'discord.js';
import { Command, type Props } from '@/lib/structures';

export default class PingCommand extends Command {
  constructor(context: Props) {
    super(context, {
      description: 'Pong!',
      aliases: ['pong', 'p'],
    });
  }

  async run(message: Message) {
    const msg = await message.reply(':ping_pong: Pong!');

    const clientLatency = msg.createdTimestamp - message.createdTimestamp;
    const discordAPILatency = this.container.client.ws.ping;

    msg.edit(`:ping_pong: Pong! Client latency is \`${clientLatency}ms\`, API latency is \`${discordAPILatency}ms\``);
  }
}
