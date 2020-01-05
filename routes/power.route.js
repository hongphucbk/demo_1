var express = require('express');
var router = express.Router();

// router.use(express.static(__dirname + './public'));

var controller = require('../controllers/power.controller');
//var validate = require('../validate/station.validate');

router.get('/', controller.history);
router.get('/history', controller.history);
router.post('/history', controller.postHistory);


router.get('/chart', controller.getChart);

router.post('/apigetdata', controller.apiGetData);

router.get('/allchart', controller.getAllChart);
router.post('/apigetalldata', controller.apiGetAllData);

//router.get('/maps', controller.maps);


//router.get('/detail/:id', controller.getDetail);
//router.get('/chart/:id', controller.getChart);
//router.post('/add', validate.postAdd, controller.postAdd);

router.get('/real', controller.getReal);
// router.post('/edit/:id', controller.postEdit);

// router.get('/delete/:id', controller.getDelete);


// router.get('/', function(req, res) {
// 	res.render('users/list');
// });

// router.get('/add', function(req, res) {
// 	res.render('users/list');
// });


module.exports = router;
