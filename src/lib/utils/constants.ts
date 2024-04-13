const dev = process.env.NODE_ENV === 'development';

const Channels = {
  noPingAnnouncements: dev ? '952514063148146691' : '977455361676156940',
} as const;

export const Constants = {
  Channels,
} as const;
