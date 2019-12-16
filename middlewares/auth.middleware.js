var User = require('../models/user.model')

module.exports.requireAuth = function(req, res, next){
	if (!req.cookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	User.findById(req.cookies.userId).then(function(user){
		if (!user) {
			res.render('auth/login');
			return;
		};
	});

	//res.locals.user = "A";
	next();
};