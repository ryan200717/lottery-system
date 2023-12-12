const express = require('express');
const { getHealthCheckMsg } = require('../../controller/healthCheck');

const router = express.Router();

router.get('/', (req, res, next) => getHealthCheckMsg(req, res, next));

module.exports = router;
