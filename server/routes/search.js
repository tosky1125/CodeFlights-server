const { RuleTester } = require('eslint');
const express = require('express')
const router = express.Router();
const searchControllers = require('../controllers/search/index')

router.get('/', searchControllers.searchDate.get);
router.get('/result', searchControllers.searchNation.get);
router.get('/result/city', searchControllers.searchFlight.get);

module.exports = router;