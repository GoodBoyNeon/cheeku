import { container } from '@sapphire/pieces';
import path from 'path';
import { getAllFiles } from '../utils/getAllFiles';
import { Command } from '../structures/Command';

const EXT = process.env.NODE_ENV === 'development' ? '.ts' : '.js';

const commands = getAllFiles(path.join(__dirname, '..', '..', 'commands')).filter((n) => n.endsWith(EXT));

commands.forEach(async (command) => {
  const CommandClass = (await import(command)).default;

  const name = path.basename(command, EXT);
  const category = path.dirname(command).split('/').at(-1);

  const cmd = new CommandClass({
    context: container,
    name,
    category,
  }) as Command;
  container.client.rawCommands.set(cmd['_name'], cmd);

  container.client.commands.set(cmd._name, cmd);
  if (cmd.aliases.length > 0) for (const alias of cmd.aliases) container.client.commands.set(alias, cmd);
});
