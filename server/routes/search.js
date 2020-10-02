const express = require('express')
const router = express.Router();
const searchControllers = require('../controllers/search/index')

// router.post('/', searchControllers.searchDate.post);
router.post('/result', searchControllers.searchNation.post);
router.post('/result/destination', searchControllers.searchFlight.post);

module.exports = router;
