const express = require('express');
const oAuthControllers = require('../controllers/oauth');

const router = express.Router();
router.post('/google', oAuthControllers.google.post);

module.exports = router;
