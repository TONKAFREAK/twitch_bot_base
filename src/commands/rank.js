const axios = require('axios');
const { DateTime } = require('luxon');
const getLosesAndWinsForTheStream = require('../util/getLosesAndWinsForTheStream');
require('dotenv').config();

function getTimeDifference(pastTime2) {
    const pastTime = new Date(pastTime2);
    const currentTime = new Date();

    const timeDifference = currentTime - pastTime;

    let diffInSeconds = Math.floor(timeDifference / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    diffInSeconds %= 3600;
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;

    return minutes;
}


async function rank(user){

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
        //console.log('sending request to API');
        const response = await axios.get(`https://api.henrikdev.xyz/valorant/v3/mmr/${region}/${platform}/${username}/${tagline}`, { headers });
        //console.log('sent request to API');
        if (response.status == 200) {

            const rank = response.data.data.current.tier.name;

            const rr = response.data.data.current.rr;

            const highest_rank = response.data.data.peak.tier.name;

            const leaderboard = response.data.data.current.leaderboard_placement.rank;
            
            const updatedAt = response.data.data.current.leaderboard_placement.updated_at;
            console.log(updatedAt);	
            const updateTime = getTimeDifference(updatedAt);

            //return ` @${user} \nCurrent Rank: ${rank} | RR: ${rr} | \nPeak: ${highest_rank} | \nLeaderboard : #${leaderboard} \n(updated ${updateTime} minutes ago)`;
            const {wins , losses} = await getLosesAndWinsForTheStream();
            return ` @${user} ${rank} => ${rr}rr (Top ${leaderboard} NA)\n (w: ${wins} | l: ${losses})`;


        }

    } catch (error) {
        
        console.error(`[${DateTime.utc().toFormat('HH:mm')}]error getting the response from API: `+ error.message);
        return `@${user} woof`;
    }

}

module.exports = rank;
