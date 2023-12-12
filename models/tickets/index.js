const mongoose = require('mongoose');

const ticketsScheme = new mongoose.Schema({
    id: { type: String, required: true },
    status: { type: String, required: true },
    create_time: { type: Number, required: true },
    result: { type: String, required: true },
    round: { type: Number, required: true },
    owner_name: { type: String, required: true },

}, {
    collection: 'tickets',
});

module.exports = mongoose.model('tickets', ticketsScheme);
