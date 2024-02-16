const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.URL; 
const connection = mongoose.connect('mongodb+srv://viveksonitech:8564910720@cluster0.z7gof.mongodb.net/blog'); 
module.exports = { connection };


