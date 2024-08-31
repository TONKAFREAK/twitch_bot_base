const axios = require('axios');
require('dotenv').config();

const { DateTime } = require('luxon');

async function getStreamStartTime(channelName) {
    try {
        const response = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
            headers: {
                'Client-ID': process.env.CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_KEY}`
            }
        });

        const userData = response.data.data[0];
        return userData.started_at;
    } catch (error) {
        console.error(`[${DateTime.utc().toFormat('HH:mm')}] Error fetching channel name:`, error);
    }
}

module.exports = getStreamStartTime;