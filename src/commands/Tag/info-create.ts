import { Message } from 'discord.js';
import { createTag } from '@/lib/modules/';
import { Command, type Props } from '@/lib/structures';

export default class TagCreateCommand extends Command {
  constructor(context: Props) {
    super(context, {
      description: 'Create a info tag',
      aliases: ['icreate', 'infocreate', 'cinfo', 'createinfo'],
      staffOnly: true,
    });
  }

  async run(message: Message, args: string[]) {
    await createTag(message, args, 'Info');
  }
}
