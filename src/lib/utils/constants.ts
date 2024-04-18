const dev = process.env.NODE_ENV === 'development';

const Channels = {
  noPingAnnouncements: dev ? '952514063148146691' : '977455361676156940',
} as const;

const Roles = {
  folksOfSnowdin: '743528017099489300',
};

export const Constants = {
  Channels,
  Roles,
} as const;
