import { EmbedBuilder, Message } from 'discord.js';
import { Command, type Props } from '../../lib/structures';

export default class HelpCommand extends Command {
  constructor(context: Props) {
    super(context, {
      description: 'Help Command',
      aliases: ['h'],
    });
  }

  async run(message: Message) {
    const commands = Array.from(this.container.client.rawCommands.values());

    let description = '';

    for (const cmd of commands) {
      description += `**${cmd._name}:** ${cmd.description}${cmd.aliases.length > 0 ? `\nAliases: ${cmd.aliases.join(', ')}` : ''}${cmd.staffOnly ? '\n[Can only be ran by Staffs]' : ''}${cmd.devOnly ? '\n[Can only be rna by Developers]' : ''}${cmd.ownerOnly ? '\n[Can only be ran by the Owner]' : ''}\n\n`;
    }

    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Cheeku - Help')
          .setDescription(description)
          .setColor('Green')
          .setThumbnail(this.container.client.user?.displayAvatarURL() || ''),
      ],
    });
  }
}
