import { GatewayIntentBits, Partials } from 'discord.js';

export const config = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],

  partials: [Partials.GuildMember, Partials.Channel, Partials.Message, Partials.Reaction],

  owner: '453457425429692417',
  developers: ['453457425429692417', '816253376962625537'],
  staffs: [
    /* Imager */
    '453457425429692417',
    /* Edgewroth */
    '688687152070000642',
    /* Aljoey <3 */
    '738354468709597227',
    /* spum  */
    '768362780545384449',

    /*TODO: Add the staffs i forgor about*/
  ],
};
