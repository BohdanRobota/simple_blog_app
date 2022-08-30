const router = require('express').Router();
const mainPageController = require('../controllers/mainPageController.js');


router.get('/',mainPageController.getMainPage);


module.exports = router;