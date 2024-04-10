import { Message } from 'discord.js';
import { createTag } from 'lib/modules/createTag';
import { Command, Props } from 'lib/structures/Command';

export default class TagCreateCommand extends Command {
  constructor(context: Props) {
    super(context, {
      description: 'Create a rule tag',
      aliases: ['rcreate', 'rulecreate', 'crule', 'createrule'],
      staffOnly: true,
    });
  }

  async run(message: Message, args: string[]) {
    await createTag(message, args, 'Rule');
  }
}
