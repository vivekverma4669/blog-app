const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title :{type: String , required : true},
    content :{type: String , required : true},
    auth_email :{type: String , required : true},
});

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports= BlogModel;
