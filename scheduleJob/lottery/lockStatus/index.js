const moment = require('moment');
const { lockTicketStatus, getLatestRound } = require('../../../data/tickets');

const lockStatus = async () => {
    try {
        console.log('\n----------------------------------------------------------------');
        console.log(`${moment().format('yyyy-MM-DD HH:mm:ss')} Locked status`);
        const latestRoundSearch = await getLatestRound();
        const result = await lockTicketStatus(latestRoundSearch.round);
        if (result === 0) {
            console.log('No active tickets');
        } else {
            console.log(`Total ${result} Locked!`);
        }
    } catch (e) {
        console.log(e);
        throw new Error(`Could lock the Ticket status. Reason: ${e.message}`);
    }
};

module.exports = lockStatus;
