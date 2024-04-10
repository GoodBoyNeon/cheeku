import { Listener } from '../lib/structures/Listener';

class ReadyListener extends Listener<'ready'> {
  run() {
    console.log('Authenticated as', this.container.client.user?.username);
  }
}

import '../lib/controllers/bootstrapCommands';

export default ReadyListener;
