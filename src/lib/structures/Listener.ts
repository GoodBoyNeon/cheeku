import { Awaitable, ClientEvents } from 'discord.js';
import { Client } from '..';
import { EventEmitter } from 'events';
import { Piece } from '@sapphire/pieces';

export abstract class Listener<E extends keyof ClientEvents> extends Piece {
  public readonly event: E;
  public readonly once: boolean;

  private _listener: (...args: any[]) => void;

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

  private _run(...args: ClientEvents[E]) {
    this.run(...args);
  }
}

export interface ListenerOptions extends Piece.Options {
  readonly emitter?: keyof Client | EventEmitter;
  readonly event?: string | symbol;
  readonly once?: boolean;
}
