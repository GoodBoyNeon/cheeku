import { Message } from 'discord.js';
import { Command, Props } from '../../lib/structures/Command';

export default class PingCommand extends Command {
  constructor(context: Props) {
    super(context, {
      description: 'echo',
      aliases: ['repeat'],
    });
  }

  async run(message: Message, args: string[]) {
    await message.reply(args.join(' '));
  }
}
