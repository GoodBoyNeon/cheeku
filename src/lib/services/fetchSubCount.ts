import axios from 'axios';

const url = 'https://www.googleapis.com/youtube/v3';
const CHANNEL_ID = 'UCzBQ65qoUGqNPcbiNQN2pJA';

export const fetchSubCount = async () => {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
    (await axios.get(`${url}/channels?part=statistics&id=${CHANNEL_ID}&key=${process.env.GOOGLE_API_KEY}`)).data.items[0].statistics.subscriberCount,
  );
};
