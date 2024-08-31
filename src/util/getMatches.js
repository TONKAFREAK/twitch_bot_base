const axios = require('axios');
const { DateTime } = require('luxon');
require('dotenv').config();


async function getMatches(){

    const username = 'Extreme';
    const tagline = 'ext';
    const region = 'na';
    const platform = 'pc'; 
    const headers = {
        'accept': 'application/json',
	    'Authorization': process.env.VAL_KEY
    };

    try {
        console.log(`[${DateTime.utc().toFormat('HH:mm')}] info: Requesting rank for ${username}#${tagline}`);
        const response = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${region}/${username}/${tagline}`, { headers });
        if (response.status == 200) {
            return response.data.data;
        }

        return null;

    } catch (error) {
        
        return null;
    }

}

module.exports = getMatches;
