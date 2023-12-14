const data = require('../../models/tickets');
const { lotteryStatus, lotteryResult } = require('../../constant');

const insertTicket = async (insertObj) => {
    try {
        const result = await data.insertMany([insertObj]);
        if (result.length === 0) throw new Error('Something Wrong With Inserting data');
    } catch (e) {
        console.log(e);
        throw new Error(`Error inserting tickets. Reason: ${e.message}`);
    }
};

const getResult = async (name, ticketId) => {
    try {
        return await data.findOne({ owner_name: name, id: ticketId });
    } catch (e) {
        console.log(e);
        throw new Error(`Error inserting tickets. Reason: ${e.message}`);
    }
};

const getLatestRound = async () => {
    try {
        const result = await data.aggregate([{
            $sort: { round: -1 },
        }, {
            $limit: 1,
        }]);
        if (result.length === 0) return null;

        return result[0];
    } catch (e) {
        console.log(e);
        throw new Error(`Error getting latest round of tickets. Reason: ${e.message}`);
    }
};

const getAllActiveLockTicket = async () => {
    try {
        return await data.find({ status: lotteryStatus.locked });
    } catch (e) {
        console.log(e);
        throw new Error(`Error getting all active tickets. Reason: ${e.message}`);
    }
};

const updateResult = async (_id, round) => {
    try {
        await data.updateOne({ _id, status: lotteryStatus.locked }, { $set: { result: lotteryResult.win, status: lotteryStatus.discard } });
        await data.updateMany({ status: lotteryStatus.locked, round }, { $set: { result: lotteryResult.lose, status: lotteryStatus.discard } });
    } catch (e) {
        console.log(e);
        throw new Error(`Error update ticket result. Reason: ${e.message}`);
    }
};

const lockTicketStatus = async (round) => {
    try {
        const result = await data.updateMany({ status: lotteryStatus.active, round }, { $set: { status: lotteryStatus.locked } });
        return result.modifiedCount;
    } catch (e) {
        console.log(e);
        throw new Error(`${e.message}`);
    }
};

const getTestTicket = async () => {
    try {
        return await data.findOne({ });
    } catch (e) {
        console.log(e);
        throw new Error(`Error getting tickets. Reason: ${e.message}`);
    }
};

module.exports = {
    insertTicket,
    getLatestRound,
    getAllActiveLockTicket,
    updateResult,
    lockTicketStatus,
    getResult,
    getTestTicket,
};
