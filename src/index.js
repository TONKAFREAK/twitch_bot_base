const tmi = require('tmi.js'), {channel, username, password} = require('../settings.json');
require('dotenv').config();

const { DateTime } = require('luxon');
const rank = require('./commands/rank.js');

const options = {
    options : { debug : true },
    connection : { 
        reconnect : true,
        secure : true
     },
     identity : {
            username,
            password
        },
        channels : [channel]
    };
const client = new tmi.client(options);
client.connect().catch(console.error);

client.on('connected', async () => {
    console.log(`[${DateTime.utc().toFormat('HH:mm')}] info: Connected to Twitch`);

});

client.on('message', async (channel, user, message, self) => {

    try {

        if(self)return;
    
        if(message.toLowerCase() == '!rank'){
            const rankInfo = await rank(user.username);
            client.say(channel, rankInfo);

        }

        if(message.toLowerCase() == '!tonka'){
            client.say(channel, 'Tonka is a cool guy');

        }
        

    } catch (error) {
        console.error(`[${DateTime.utc().toFormat('HH:mm')}] info: Error: `+ error.message);
    }

});



