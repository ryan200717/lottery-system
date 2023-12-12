const moment = require('moment');
const { updateResult, getAllActiveLockTicket } = require('../../../data/tickets');
const { getRandomNumber } = require('../../../utils/commonFunction');

const drawPrice = async () => {
    try {
        console.log('\n----------------------------------------------------------------');
        console.log(`${moment().format('yyyy-MM-DD HH:mm:ss')} Start Drawing price`);
        const activeTicketList = await getAllActiveLockTicket();
        if (activeTicketList.length === 0) {
            console.log('No Lock tickets');
            return;
        }
        console.log(`Total ${activeTicketList.length} join the lottery-system`);

        const winnerTicket = getRandomNumber(0, activeTicketList.length - 1);
        console.log(`Winner: ${activeTicketList[winnerTicket]._id}, Round: ${activeTicketList[winnerTicket].round}`);
        await updateResult(activeTicketList[winnerTicket]._id, activeTicketList[winnerTicket].round);
    } catch (e) {
        console.log(e);
        throw new Error(`Could not draw Ticket. Reason: ${e.message}`);
    }
};

module.exports = drawPrice;
