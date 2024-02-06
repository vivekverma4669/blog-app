const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    auth_email: { type: String, required: true },
    user_id: { type: String, required: true },
    type: { type: String, enum: ['tech', 'news', 'food', 'health', 'other'] },
    imageUrl: { type: String }
});

const BlogModel = mongoose.model('Blog', BlogSchema);
module.exports = BlogModel;
