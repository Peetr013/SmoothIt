const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const schema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}

});

schema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
module.exports = mongoose.model("Users", schema);