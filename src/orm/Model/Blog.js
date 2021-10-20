const BlogSchema = require('../Schema/Blog');
const mongoose = require("mongoose");

module.exports = mongoose.model('Blog', BlogSchema)
