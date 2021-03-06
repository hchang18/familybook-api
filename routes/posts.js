const express = require('express');

const router = express.Router();
const func = require('../controllers/posts.js')

const auth = require('../middleware/auth');

// call back function that activates when someone visits '/'
router.get('/search', func.getPostsBySearch);
router.get('/', func.getPosts);
router.get('/:id', func.getPost);

router.post('/', auth, func.createPost);
router.patch('/:id', auth, func.updatePost); // update existing document, :id means it's dynamic
router.delete('/:id', auth, func.deletePost);
router.patch('/:id/likePost', auth, func.likePost);
// populate the request and then you have access to the request right into the action you have next
router.post('/:id/commentPost', auth, func.commentPost);

module.exports = router;