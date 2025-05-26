const mongoose = require("mongoose");

const schema = mongoose.Schema({
    ingredients: {type: [String], required: true},
    price: {type: Number, required: true},
    status: { type: String, enum: ['preparing', 'done', 'canceled'], default: 'preparing' }, // Nové pole status
});

module.exports = mongoose.model("Smoothie", schema);