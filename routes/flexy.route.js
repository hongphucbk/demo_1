var express = require('express');
var router = express.Router();

// router.use(express.static(__dirname + './public'));

var controller = require('../controllers/flexy.controller');
//var validate = require('../validate/station.validate');

router.get('/', controller.getIndex);
router.post('/', controller.postIndex);

// router.get('/excel', controller.listExcel);
// router.get('/chart', controller.getChart);
// //router.post('/chart', controller.postChart);

// router.post('/apigetdata', controller.apiGetData);
// router.post('/edit/:id', controller.postEdit);

// router.get('/delete/:id', controller.getDelete);


// router.get('/', function(req, res) {
// 	res.render('users/list');
// });

// router.get('/add', function(req, res) {
// 	res.render('users/list');
// });


module.exports = router;
