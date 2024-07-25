const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxSequenceId: { type: Number },
});

module.exports = mongoose.model('Sequence', sequenceSchema);