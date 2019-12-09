var User = require('../models/user.model')

module.exports.login = function(req, res) {
	res.render('auth/login')
};

module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	console.log(email)
	User.findOne({email: email}).then(function(user){
		console.log('user: ' + user)
		if (!user) {
			res.render('auth/login',{
				errors: [
					'User does not exist.'
				]
			});
			return;
		}

		if (user.password !==  password) {
			res.render('auth/login',{
				errors: [
					'Wrong password.'
				]
			});
			return;
		
		}

		res.cookie('userId', user.id);
		res.redirect('/users');

	});

	

	// var query = {"_id": req.params.id};
	// var data = {
	// 	"name" : req.body.name,
	//     "phone" : req.body.phone,
	//     "email" : req.body.email,
	//     "password" : req.body.password,
	//     "role" : parseInt(req.body.role)
	// }

	// console.log(query)
	// User.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
	//     if (err) return res.send(500, { error: err });
	//     res.redirect('/users');
	// });

};





module.exports.add = function(req, res) {
	User.find().then(function(users){
		res.render('users/add', {
			users: users
		});
	});
};

module.exports.postAdd = function(req, res) {
	console.log(req.body);
	// or, for inserting large batches of documents
	User.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/users');
};

module.exports.getEdit = function(req, res) {
	var id = req.params.id;
	User.findById(id).then(function(user){
		res.render('users/edit', {
			user: user
		});
	});
};



module.exports.getDelete = function(req, res) {
	var id = req.params.id;
	User.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/users');
	});

};