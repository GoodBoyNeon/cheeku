import { Command, type Props } from '../../lib/structures';
import { deleteTag } from '../../lib/modules';
import type { Message } from 'discord.js';

export default class TagDeleteCommand extends Command {
  constructor(context: Props) {
    super(context, {
      description: 'Delete a rule tag',
      aliases: ['rdel', 'ruledelete', 'drule'],
      ownerOnly: true,
    });
  }

  async run(message: Message, args: string[]) {
    await deleteTag(message, args, 'Rule');
  }
}
