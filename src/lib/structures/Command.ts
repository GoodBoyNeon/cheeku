import { Piece } from '@sapphire/pieces';
import type { Awaitable, Message } from 'discord.js';

export interface CommandOptions {
  name?: string;

  description: string;

  aliases?: string[];

  category?: string;

  ownerOnly?: boolean;

  devOnly?: boolean;

  staffOnly?: boolean;
}

export interface Props {
  context: Piece.LoaderContext;
  name: string;
  category: string;
}

export abstract class Command extends Piece {
  public readonly _name: string;

  public readonly description: string;

  public readonly category: string;

  public readonly aliases: string[];

  public readonly devOnly?: boolean;

  public readonly ownerOnly?: boolean;

  public readonly staffOnly?: boolean;

  public constructor(p: Props, options: CommandOptions) {
    super(p.context);

    this.description = options.description;

    this.aliases = options.aliases ?? [];

    this.devOnly = options.devOnly;

    this.ownerOnly = options.ownerOnly;

    this.staffOnly = options.staffOnly;

    this._name = options.name ?? p.name;

    this.category = options.category ?? p.category;
  }

  public abstract run(message: Message, args: string[]): Awaitable<void>;
}
