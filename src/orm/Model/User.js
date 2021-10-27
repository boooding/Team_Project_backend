const UserSchema = require('../Schema/User');
const mongoose = require("mongoose");

module.exports = mongoose.model('User', UserSchema);
