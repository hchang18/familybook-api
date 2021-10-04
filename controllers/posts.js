// all the handlers for the routes
// this is where all the logics reside

const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage.js');


// access to the real model
// each call back function has try and catch block 
// await only comes with async
const getPosts = async (req, res) => {

    const { page } = req.query; // we are passing page number as query from front end

    try {

        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await PostMessage.countDocuments({});

        // const posts = await PostMessage.find();
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        
        // send all of these data to the front end 
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getPost = async (req, res) => {

    const { id } = req.params;
    
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// query -> /posts?page=1 (page variable is 1) 
// params -> /posts/123 (id is 123)

const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;
    console.log(searchQuery, tags);
    
    try {
        const title = new RegExp(searchQuery, 'i'); // Test test TEST
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        // find me all the posts that match one of those criteria - title and tags
        // is one of the tags equal to tags
        res.json({ data: posts });
        console.log(posts.length);
        // make sure that action creator in front end match what res is sending

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        // https://www.resapitutorial.com/httpstatuscodes.html
        res.status(201).json(newPost); // successful creation
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    
    // /post/123 <- extract 123
    const { id: _id } = req.params; // extract id of the post from req.params and rename id to _id
    const post = req.body;          // it's going to be sent from front end

    // check if _id is mongoose id
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that ${id}`);

    // update the post in the database (id, post, new )
    // however, post only sends {title, message, creator, tags, ...}
    // we forgot to send id, so we need to include it
    // therefore, create new object, spread everything inside post and add _id {...post, _id}
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);

}

const deletePost = async (req, res) => {
    
    const { id } = req.params;

    // check if _id is mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });

}

const likePost = async (req, res) => {
    const { id } = req.params;

    // make sure that user is authenticated
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    // check if _id is mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that ${id}`);

    // find the post
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // like the post if your id haven't like it before
        post.likes.push(req.userId);
    } else {
        // remove his like if you had already liked it before
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    // no longer incrementing the likeCounts
    // instead we have likes (a list of ids that pushed like) => change schema
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);

}

const commentPost = async (req, res) => {
    
    const { id } = req.params;
    const { value } = req.body;
    
    // get the post from the database
    const post = await PostMessage.findById(id);
    // add comments to that post
    post.comments.push(value);
    // update the database so that new post contains the new comment
    // finally we are storing that updated post in updatedPost variable 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
    // wait a second! we have to update the model in the post 


}


module.exports = {
    getPosts,
    getPost, 
    getPostsBySearch,
    createPost,
    updatePost,
    deletePost,
    likePost,
    commentPost,
}
