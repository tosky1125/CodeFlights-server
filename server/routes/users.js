const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/user/index')

router.post('/signup', userControllers.signup)
router.post('/signin', userControllers.signin)
router.post('/logout', userControllers.logout)
router.post('/info', userControllers.info)
router.get('/info', userControllers.info)