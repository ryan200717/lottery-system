const mongoose = require('mongoose');
const { mongoDbStr } = require('../../utils/servicesUrl');

const connectToDatabase = async () => {
    try {
        const MONGODB_URI = mongoDbStr;
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    connectToDatabase,
};
