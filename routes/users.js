const express = require('express');

const router = express.Router();
const func = require('../controllers/user.js')

// call back function that activates when someone visits '/'
router.post('/signin', func.signin);
router.post('/signup', func.signup);

module.exports = router;