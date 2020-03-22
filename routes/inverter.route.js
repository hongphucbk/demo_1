var express = require('express');
var router = express.Router();

// router.use(express.static(__dirname + './public'));

var controller = require('../controllers/inverter/setting.controller');
var controller2 = require('../controllers/inverter/device.controller');
var controller3 = require('../controllers/inverter/dashboard.controller');

//var validate = require('../validate/station.validate');

router.get('/setting', controller.setting);
router.get('/setting/add', controller.getAdd);
router.post('/setting/add', controller.postAdd);

router.get('/setting/edit/:id', controller.getEdit);
router.post('/setting/edit/:id', controller.postEdit);

router.get('/setting/delete/:id', controller.getDelete);


router.get('/device', controller2.getList);
router.get('/device/add', controller2.getAdd);
router.post('/device/add', controller2.postAdd);

router.get('/device/edit/:id', controller2.getEdit);
router.post('/device/edit/:id', controller2.postEdit);

router.get('/device/delete/:id', controller2.getDelete);

router.get('/dashboard', controller3.getIndex);

module.exports = router;
