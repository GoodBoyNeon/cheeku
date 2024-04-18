import type { Tag, TagType } from '@prisma/client';
import { Message } from 'discord.js';
import { prisma } from '../controllers/';

export const fetchTag = async (name: string): Promise<Tag | null> => {
  const tag = await prisma.tag.findFirst({
    where: {
      aliases: {
        has: name,
      },
    },
  });

  return tag;
};

export const createTag = async (message: Message, args: string[], type: TagType) => {
  if (args.length < 1) {
    await message.reply('Enter tag name(s)!');
    return;
  }

  const tags = await prisma.tag.findMany({
    where: {
      aliases: {
        hasSome: args,
      },
    },
  });

  if (tags.length > 0) {
    await message.reply('Tag name and aliases must be unique!');
    return;
  }

  await message.reply(
    `Creating \`${type.toLowerCase()}\` tag **${args[0]}**:\n\nEnter the content of the tag as your next message. You have 30 seconds to do so.`,
  );

  const collector = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id,
    time: 30 * 1000,
    max: 1,
  });

  collector.on('collect', async (msg) => {
    let exit: boolean = false;
    if (!message.content) {
      await message.reply('Tag content has to be string!');
      return;
    }

    await prisma.tag
      .create({
        data: {
          aliases: args,
          type,
          content: msg.content,
          owner: {
            connectOrCreate: {
              where: {
                userId: msg.author.id,
              },
              create: {
                name: msg.author.username,
                userId: msg.author.id,
              },
            },
          },
        },
      })
      .catch(async () => {
        await message.reply('Tag could not be created. This usually happens if your tag name is not unique');
        exit = true;
      });

    if (exit) return;
    msg.reply(`Your tag was created successfully!`);
    return;
  });

  collector.on('end', (_, reason) => {
    if (reason === 'time') message.reply('You failed to post the tag content in the required amount of time. Bye!');
    return;
  });

  return;
};

export const deleteTag = async (message: Message, args: string[], type: TagType) => {
  const name = args[0];

  if (typeof name !== 'string' || name.length < 1) {
    await message.reply('Enter tag name!');
    return;
  }

  await prisma.tag
    .deleteMany({
      where: {
        aliases: {
          has: name,
        },
        type,
      },
    })
    .catch(() => {
      message.reply('Tag not found!');
      return;
    });

  await message.reply(`${type} Tag \`${name}\` deleted!`);
};
