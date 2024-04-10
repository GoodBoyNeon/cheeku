import { Message } from 'discord.js';
import { fetchTag } from 'lib/modules/fetchTag';
import { Command, Props } from 'lib/structures/Command';

export default class RuleCommand extends Command {
  public constructor(context: Props) {
    super(context, {
      description: 'View a rule tag',
    });
  }

  async run(message: Message<true>, args: string[]) {
    const tag = await fetchTag(args.join(' '), 'Rule');

    if (!tag) {
      await message.reply('Tag not found!');
      return;
    }

    await message.channel.send(`# ${tag.name}\n\n${tag.content}`);
  }
}
