import { Message } from 'discord.js';
import { Command, type Props } from '../../lib/structures';

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
