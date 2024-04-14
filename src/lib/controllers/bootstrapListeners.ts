import path from 'path';
import { getAllFiles } from '../utils/getAllFiles';
import { container } from '@sapphire/pieces';

const EXT = process.env.NODE_ENV === 'development' ? '.ts' : '.js';

const listeners = getAllFiles(path.join(__dirname, '..', '..', 'listeners')).filter((n) => n.endsWith(EXT));

listeners.forEach(async (listener) => {
  const ListenerEvent = (await import(listener)).default;
  const event = new ListenerEvent(container, path.basename(listener, EXT));

  event.listen();
});
