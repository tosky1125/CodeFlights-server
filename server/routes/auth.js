const express = require('express')
const router = express.Router();
const oAuthControllers = require('../controllers/oauth/index')
router.post('/google', oAuthControllers.google.post)
module.exports = router;