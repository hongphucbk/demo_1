var express = require('express');
var router = express.Router();

// router.use(express.static(__dirname + './public'));

var controller = require('../controllers/real.controller');
//var validate = require('../validate/station.validate');
var middleware = require('../middlewares/auth.middleware');

router.get('/', controller.list); 
router.get('/l2', middleware.requireAuth, controller.list2); 

//router.get('/add', controller.getAdd);

//router.get('/edit/:id', controller.getEdit);
//router.post('/edit/:id', controller.postEdit);

//router.get('/delete/:id', controller.getDelete);


// router.get('/', function(req, res) {
// 	res.render('users/list');
// });

// router.get('/add', function(req, res) {
// 	res.render('users/list');
// });


module.exports = router;
