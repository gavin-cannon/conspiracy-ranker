const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxConspiracyId: { type: Number },
});

module.exports = mongoose.model('Sequence', sequenceSchema);