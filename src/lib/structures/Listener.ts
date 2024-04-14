import { Client } from './Client';
import { Piece } from '@sapphire/pieces';
import type { Awaitable, ClientEvents } from 'discord.js';

export abstract class Listener<E extends keyof ClientEvents> extends Piece {
  public readonly event: E;
  public readonly once: boolean;

  private _listener: (...args: ClientEvents[E]) => Awaitable<void>;

  constructor(context: Piece.LoaderContext, event: E, once: boolean) {
    super(context);

    this.once = once;

    this.event = event;

    this._listener = this._run.bind(this);
  }

  public abstract run(...args: ClientEvents[E]): Awaitable<void>;

  public listen() {
    this.once ? this.container.client.once(this.event, this._listener) : this.container.client.on(this.event, this._listener);
  }

  private _run(...args: ClientEvents[E]): Awaitable<void> {
    this.run(...args);
  }
}

export interface ListenerOptions extends Piece.Options {
  readonly emitter?: keyof Client;
  readonly event?: string | symbol;
  readonly once?: boolean;
}
