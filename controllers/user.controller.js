var User = require('../models/user.model')

// module.exports.index = function(req, res) {
// 	res.render('users/list')
// };

module.exports.list = async function(req, res) {
	let users = await User.find();
	res.render('users/list', {
			users: users
	});
};

module.exports.add = function(req, res) {
	User.find().then(function(users){
		res.render('users/add', {
			users: users
		});
	});
};

module.exports.postAdd = function(req, res) {
	req.body.created_at = new Date();
	req.body.updated_at = new Date();

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

module.exports.postEdit = function(req, res) {
	var query = {"_id": req.params.id};
	var data = {
		"name" : req.body.name,
    "phone" : req.body.phone,
    "email" : req.body.email,
    "password" : req.body.password,
    "role" : parseInt(req.body.role),
    "updated_at" : new Date()
	}

	//console.log(query)
	User.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/users/edit/' + req.params.id);
	});

};

module.exports.getDelete = function(req, res) {
	var id = req.params.id;
	User.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/users');
	});

};