import { Message } from 'discord.js';
import { Listener } from '../lib/structures';
import { config } from '../config';
import { fetchTag } from '../lib/modules';

export default class MessageCreateListener extends Listener<'messageCreate'> {
  async run(message: Message) {
    if (message.author.bot || message.webhookId) return;

    if (message.content.startsWith(this.container.client.options.prefix)) {
      await this.handleCommands(message);
      return;
    }

    if (message.content.startsWith('-')) {
      await this.handleTags(message, message.content.substring(1));
      return;
    }
  }

  private async handleCommands(message: Message) {
    const args = message.content.substring(this.container.client.options.prefix.length).split(' ');

    const commandName = args.shift();

    if (!commandName) return;

    const command = this.container.client.commands.get(commandName);

    if (!command) return;

    if (command.ownerOnly && config.owner !== message.author.id) {
      await message.reply('This command can only be ran by the owner apparently 🙄 (sucks to not be the owner, innit?)');
      return;
    }

    if (command.devOnly && !config.developers.includes(message.author.id)) {
      await message.reply('This command can only be ran by developers (imagine not being one lmao, I cant relate ¯\\_(ツ)_/¯ [But keita can])');
      return;
    }

    if (command.staffOnly && !config.staffs.includes(message.author.id)) {
      await message.reply('You need to be a staff to run this command (staffs are overrated tbh /j)');
      return;
    }

    if (!command.run) {
      await message.reply('The command does not have a run method. I guess the devs were high when making this command ¯\\_(ツ)_/¯');
      return;
    }

    await command.run(message, args);
  }

  private async handleTags(message: Message, name: string) {
    if (name.length < 1) {
      await message.reply('Enter tag name!');
      return;
    }
    const tag = await fetchTag(name);

    if (!tag) {
      await message.reply('Tag not found!');
      return;
    }

    await message.channel.send(tag.content);
  }
}
