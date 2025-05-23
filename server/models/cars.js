const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model("Car", schema);