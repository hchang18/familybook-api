const express = require('express');

const router = express.Router();
const func = require('../controllers/posts.js')

// call back function that activates when someone visits '/'
router.get('/', func.getPosts);
router.post('/', func.createPost);
router.patch('/:id', func.updatePost); // update existing document, :id means it's dynamic
router.delete('/:id', func.deletePost);
router.patch('/:id/likePost', func.likePost);

module.exports = router;