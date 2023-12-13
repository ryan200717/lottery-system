const config = require('config');
const dotenv = require('dotenv');

const configObj = process.env.NODE_ENV
    ? { path: `.env.${process.env.NODE_ENV}` }
    : {};

dotenv.config(configObj);

const mongoDbStr = `${config.get('mongoDb.protocolPrefix')}://${
    process.env.MONGODB_USERNAME
}:${process.env.MONGODB_PASSWORD}@${process.env.NODE_ENV === 'development-atlas' ? process.env.MONGODB_DOMAIN : config.get('mongoDb.domain')}/${config.get(
    'mongoDb.db',
)}?authSource=${config.get('mongoDb.authSource')}`;

module.exports = {
    mongoDbStr,
};
