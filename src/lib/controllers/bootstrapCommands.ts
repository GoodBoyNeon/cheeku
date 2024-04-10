import { container } from '@sapphire/pieces';
import path from 'path';
import { getAllFiles } from '../utils/getAllFiles';
import { Command } from '../structures/Command';

const commands = getAllFiles(path.join(__dirname, '..', '..', 'commands')).filter((n) => n.endsWith('.ts') || n.endsWith('.js'));

commands.forEach(async (command) => {
  const CommandClass = (await import(command)).default;

  const name = path.basename(command, '.ts');
  const category = path.dirname(command).split('/').at(-1);

  const cmd = new CommandClass({
    context: container,
    name,
    category,
  }) as Command;

  container.client.commands.set(cmd._name, cmd);
  if (cmd.aliases.length > 0) for (const alias of cmd.aliases) container.client.commands.set(alias, cmd);
});
