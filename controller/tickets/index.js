const { v4: uuidV4 } = require('uuid');
const moment = require('moment');
const { getNormalResponseParams } = require('../../utils/response');
const {
    insertTicket, getLatestRound, getResult,
} = require('../../data/tickets');
const { lotteryStatus, lotteryResult } = require('../../constant');
const { errorCodeMessage } = require('../../constant/errorMessage');

const checkoutTicket = async (req, res, next) => {
    try {
        const { user_name: userName } = req.body;
        if (userName == null || userName.length === 0) {
            throw { errorCode: '0001' };
        }
        const ticketId = uuidV4();
        const createTime = moment().format('yyyy-MM-DD HH:mm:ss');
        const latestRoundSearch = await getLatestRound();
        let latestRound = 1;
        if (latestRoundSearch !== null) {
            if (latestRound.status === lotteryStatus.locked) {
                throw { errorCode: '0003' };
            }
            latestRound = latestRoundSearch.status === lotteryStatus.active ? latestRoundSearch.round : latestRoundSearch.round + 1;
        }
        const body = {
            ticket_id: ticketId,
            owner_name: userName,
            round: latestRound,
            create_time: createTime,
        };

        await insertTicket({
            id: ticketId,
            status: lotteryStatus.active,
            result: lotteryResult.waiting,
            round: latestRound,
            create_time: moment().unix(),
            owner_name: userName,
        });
        res.json(getNormalResponseParams({ data: body }));
    } catch (e) {
        console.log(e);
        next(e);
    }
};

const resultCheck = async (req, res, next) => {
    try {
        const { user_name: userName, ticket_id: ticketId } = req.query;
        if (userName == null || userName.length === 0) {
            throw { errorCode: '0001' };
        }

        if (ticketId == null || ticketId.length === 0) {
            throw { errorCode: '0002' };
        }

        const result = await getResult(userName, ticketId);
        if (!result) {
            throw { errorCode: '0004' };
        }

        const body = {
            result: result.result,
            round: result.round,
            owner_name: result.owner_name,
            ticket_id: result.id,
        };

        res.json(getNormalResponseParams({ data: body }));
    } catch (e) {
        console.log(e);
        next(e);
    }
};

const availableCheck = async (req, res, next) => {
    try {
        const result = await getLatestRound();
        const body = {
            available: true,
        };
        if (result.status === lotteryStatus.locked) {
            body.available = false;
            body.message = errorCodeMessage['0004'].message;
        }
        res.json(getNormalResponseParams({ data: body }));
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = {
    checkoutTicket,
    resultCheck,
    availableCheck,
};
