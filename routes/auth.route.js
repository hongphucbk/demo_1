var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller');
// var validate = require('../validate/auth.validate');

router.get('/login', controller.login);
// router.get('/add', controller.add);
router.post('/login', controller.postLogin);
router.post('/apiPostLogin', controller.apiPostLogin);

router.get('/logout', controller.logout);

module.exports = router;
