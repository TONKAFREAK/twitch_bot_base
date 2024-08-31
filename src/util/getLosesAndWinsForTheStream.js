const getMatches = require('./getMatches');
const getStreamStartTime = require('./getStreamStartTime');

async function getLosesAndWinsForTheStream() {
    const data = await getMatches();
    console.log(data);
    const targetDate = await getStreamStartTime('extremeey');
    console.log(targetDate);
    const targetTimestamp = new Date(targetDate).getTime() / 1000 - 10 * 60;

    let wins = 0;
    let losses = 0;

    data.forEach(match => {
        if (match.date_raw > targetTimestamp) {
            if (match.mmr_change_to_last_game > 0) {
                wins += 1;
            } else {
                losses += 1;
            }
        }
    });

    console.log(`Wins: ${wins}, Losses: ${losses}`);
    return {wins, losses};
}

module.exports = getLosesAndWinsForTheStream;

