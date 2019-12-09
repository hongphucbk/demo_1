var User = require('../models/user.model')
var Alarm = require('../models/alarm.model')

module.exports.list = async function(req, res) {
	let alarms = await Alarm.find();
	res.render('alarm/list', {
		alarms: alarms
	});
};

module.exports.getAdd = function(req, res) {
		res.render('alarm/add', {
		});
};

module.exports.postAdd = function(req, res) {
	console.log(req.body);
	// or, for inserting large batches of documents
	Alarm.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/alarm/add');
};

module.exports.getEdit = function(req, res) {
	var id = req.params.id;
	Alarm.findById(id).then(function(alarm){
		res.render('alarm/edit', {
			alarm: alarm
		});
	});
};

module.exports.postEdit = function(req, res) {
	var query = {"_id": req.params.id};
	var data = {
		"name" : req.body.name,
    "bit" : parseInt(req.body.bit),
    "text" : req.body.text,
    "flag" : req.body.flag,
    "note" : (req.body.note)
	}

	//console.log(query)
	Alarm.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/alarm/edit/' + req.params.id);
	});

};

module.exports.getDelete = function(req, res) {
	var id = req.params.id;
	Alarm.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/alarm');
	});

};