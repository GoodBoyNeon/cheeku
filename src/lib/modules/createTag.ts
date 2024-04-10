import { TagType } from '@prisma/client';
import { Message } from 'discord.js';
import { prisma } from 'lib/controllers/database';

export const createTag = async (message: Message, args: string[], type: TagType) => {
  const name = args.join(' ');

  await message.reply(
    `Creating \`${type.toLowerCase()}\` tag **${name}**:\n\nEnter the content of the tag as your next message. You have 30 seconds to do so.`,
  );

  const collector = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id,
    time: 30 * 1000,
    max: 1,
  });

  collector.on('collect', async (msg) => {
    if (!message.content) {
      await message.reply('Tag content has to be string!');
      return;
    }

    await prisma.tag.create({
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
    });

    msg.reply(`Your tag ${name} was created successfully!`);
    return;
  });

  collector.on('end', (_, reason) => {
    if (reason === 'time') message.reply('You failed to post the tag content in the required amount of time. Bye!');
    return;
  });

  return;
};
