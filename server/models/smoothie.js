const mongoose = require("mongoose");

const schema = mongoose.Schema({
    ingredients: {type: [String], required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model("Smoothie", schema);