import { Tag, TagType } from '@prisma/client';
import { prisma } from 'lib/controllers/database';

export const fetchTag = async (name: string, type: TagType): Promise<Tag | null> => {
  const tag = await prisma.tag.findUnique({
    where: {
      name,
      type,
    },
  });

  return tag;
};
