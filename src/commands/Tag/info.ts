import { Message } from 'discord.js';
import { fetchTag } from '@/lib/modules';
import { Command, type Props } from '@/lib/structures';

export default class RuleCommand extends Command {
  public constructor(context: Props) {
    super(context, {
      description: 'View a info tag',
    });
  }

  async run(message: Message<true>, args: string[]) {
    const name = args.join(' ');
    if (name.length < 1) {
      await message.reply('Enter tag name!');
      return;
    }
    const tag = await fetchTag(args.join(' '), 'Info');

    if (!tag) {
      await message.reply('Tag not found!');
      return;
    }

    await message.channel.send(`# ${tag.name}\n\n${tag.content}`);
  }
}
