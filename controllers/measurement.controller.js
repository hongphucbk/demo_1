var Measurement = require('../models/measurement.model')

module.exports.list = function(req, res) {
	Measurement.find().then(function(measurements){
		res.render('measurements/list', {
			measurements: measurements
		});
	});
};

module.exports.getAdd = function(req, res) {
	Measurement.find().then(function(measurements){
		res.render('measurements/add', {
			measurements: measurements
		});
	});
};

module.exports.postAdd = function(req, res) {
	console.log(req.body);
	// or, for inserting large batches of documents
	Measurement.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/measurement');
};

module.exports.getEdit = function(req, res) {
	var id = req.params.id;
	Measurement.findById(id).then(function(measurement){
		res.render('measurements/edit', {
			measurement: measurement
		});
	});
};

module.exports.postEdit = function(req, res) {
	var query = {"_id": req.params.id};
	var data = {
		"name" : req.body.name,
	    "description" : req.body.description,
	    "group" : req.body.group,
	    "information" : req.body.information,
	    "note" : req.body.note
	}
	console.log(query)
	Measurement.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/measurement');
	});

};

// module.exports.getDelete = function(req, res) {
// 	var id = req.params.id;
// 	Measurement.findByIdAndDelete(id, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };