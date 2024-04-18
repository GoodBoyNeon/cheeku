import { Message } from 'discord.js';
import { createTag } from '../../lib/modules/';
import { Command, type Props } from '../../lib/structures';
import { Constants } from '../../lib/utils';

export default class TagCreateCommand extends Command {
  constructor(context: Props) {
    super(context, {
      description: 'Create a info tag',
      aliases: ['icreate', 'infocreate', 'cinfo', 'createinfo'],
    });
  }

  async run(message: Message, args: string[]) {
    if (!message.member?.roles.cache.has(Constants.Roles.folksOfSnowdin)) {
      await message.reply('You are not eligible to create an info tag.');
      return;
    }

    await createTag(message, args, 'Info');
  }
}
