const express = require('express');
const { checkoutTicket, resultCheck, availableCheck } = require('../../controller/tickets');

const ticketsRouter = express.Router();

ticketsRouter.post('/', (req, res, next) => checkoutTicket(req, res, next));
ticketsRouter.get('/result', (req, res, next) => resultCheck(req, res, next));
ticketsRouter.get('/available', (req, res, next) => availableCheck(req, res, next));

module.exports = ticketsRouter;
