const mongoose = require('mongoose');

const conspiracySchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number },
    description: { type: String },
    imageUrl: { type: String },
    id: { type: String, required: true },
});

module.exports = mongoose.model('Conspiracy', conspiracySchema);