const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String, // name of the person who's logged in
    creator: String,
    tags: [String],
    selectedFile: String,
    // likeCount: {
    //     type: Number,
    //     default: 0
    // },
    likes: {
        type: [String],
        default: [],
    },
    comments: {type: [String], default: []},
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;