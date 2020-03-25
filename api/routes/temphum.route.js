var express = require('express');
var router = express.Router();

// router.use(express.static(__dirname + './public'));

var controller = require('../controllers/temphum.controller');
//var validate = require('../validate/station.validate');

router.get('/real', controller.getData);
router.post('/real', controller.postData);

router.get('/real/rd', controller.getDataRandom);

// router.get('/v2', controller.list2);
// router.post('/l2', controller.postList2);

// router.get('/edit/:id', controller.getEdit);
// router.post('/edit/:id', controller.postEdit);

// router.get('/delete/:id', controller.getDelete);


// router.get('/', function(req, res) {
// 	res.render('users/list');
// });

// router.get('/add', function(req, res) {
// 	res.render('users/list');
// });


module.exports = router;
