import type { Tag, TagType } from '@prisma/client';
import { Message } from 'discord.js';
import { prisma } from '../controllers/';

export const fetchTag = async (name: string, type: TagType): Promise<Tag | null> => {
  const tag = await prisma.tag.findUnique({
    where: {
      name,
      type,
    },
  });

  return tag;
};

export const createTag = async (message: Message, args: string[], type: TagType) => {
  const name = args.join(' ');

  if (name.length < 1) {
    await message.reply('Enter tag name!');
    return;
  }

  await message.reply(
    `Creating \`${type.toLowerCase()}\` tag **${name}**:\n\nEnter the content of the tag as your next message. You have 30 seconds to do so.`,
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
          name,
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
    msg.reply(`Your tag ${name} was created successfully!`);
    return;
  });

  collector.on('end', (_, reason) => {
    if (reason === 'time') message.reply('You failed to post the tag content in the required amount of time. Bye!');
    return;
  });

  return;
};

export const deleteTag = async (message: Message, args: string[], type: TagType) => {
  const name = args.join(' ');

  if (name.length < 1) {
    await message.reply('Enter tag name!');
    return;
  }

  await prisma.tag
    .delete({
      where: {
        name,
        type,
      },
    })
    .catch(() => {
      message.reply('Tag not found!');
      return;
    });

  await message.reply(`${type} Tag \`${name}\` deleted!`);
};
