
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { connectToDatabase } = require('./services/mongo');
const errorHandler = require('./middlewares/errorHandler');
/** Router * */
const ticketsRouter = require('./routers/tickets');
const heathCheckRouter = require('./routers/healthCheck');
const drawPrice = require('./scheduleJob/lottery/drawPrice');
const lockStatus = require('./scheduleJob/lottery/lockStatus');

const port = config.get('api.port');
const apiVersions = config.get('api.versions');

const app = express();
connectToDatabase().then(() => console.log('Database Connection Successful!'));
// Schedule the cron job
cron.schedule('0 * * * * *', drawPrice);
cron.schedule('40 * * * * *', lockStatus);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/api/${apiVersions.v1}/ticket`, ticketsRouter);
app.use(`/api/${apiVersions.v1}/heathCheck`, heathCheckRouter);

app.use((err, req, res, next) => errorHandler(err, req, res, next));

app.listen(port, () => {
    console.log(`NODE_ENV = ${process.env.NODE_ENV ?? 'DefaultDev'} Listening on port ${port}`);
});

module.exports = app;
