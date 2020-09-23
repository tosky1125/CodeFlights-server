const express = require('express')
const router = express.Router();
const articleControllers = require('../controllers/articles/index')

router.post('/write', articleControllers.write.write)
router.get('/article/:id',articleControllers.browse.browse)

module.exports = router;