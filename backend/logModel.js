const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    log: {
        type: String
    }
})

const logs = mongoose.model("logs", logSchema);

module.exports = logs;