import path from 'path';
import { getAllFiles } from '../utils/getAllFiles';
import { container } from '@sapphire/pieces';

const listeners = getAllFiles(path.join(__dirname, '..', '..', 'listeners')).filter((n) => n.endsWith('.js') || n.endsWith('.ts'));

listeners.forEach(async (listener) => {
  const ListenerEvent = (await import(listener)).default;
  const event = new ListenerEvent(container, path.basename(listener, '.ts'));

  event.listen();
});
