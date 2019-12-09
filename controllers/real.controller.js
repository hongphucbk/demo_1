var History = require('../models/history.model')
var moment = require('moment');

module.exports.list = async function(req, res) {
	var perPage = 10
  var page = req.query.page || 1

	let histories = await History.find().skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await History.countDocuments({});

	let pages = Math.ceil(recordsTotal / perPage);

	console.log(page, pages, recordsTotal)
	res.render('real/list', {
		histories: histories,
		current: page,
		pages: pages,
		moment: moment,
	});
};

module.exports.list2 = async function(req, res) {
	var perPage = 10
  var page = req.query.page || 1

	let histories = await History.find().skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await History.countDocuments({});

	let pages = Math.ceil(recordsTotal / perPage);

	console.log(page, pages, recordsTotal)
	res.render('real/list2', {
		histories: histories,
		current: page,
		pages: pages,
		moment: moment,
	});
};

// module.exports.getAdd = function(req, res) {
// 	History.find().then(function (stations) {
// 		res.render('device/add', {
// 				//station_measurements: station_measurements,
// 				stations: stations,
				
// 			});
// 	});	
// };

// module.exports.postAdd = function(req, res) {
// 	console.log(req.body);
// 	// or, for inserting large batches of documents
// 	History.insertMany(req.body, function(err) {
// 		if (err) return handleError(err);
// 	});
// 	res.redirect('/device');
// };

// module.exports.getEdit = function(req, res) {
// 	var id = req.params.id;
// 	History.findById(id).then(function(device){
// 		History.find().then(function (stations) {
// 			res.render('device/edit', {
// 				device: device,
// 				stations: stations,
// 			});
// 		});	
// 	});
// };

// module.exports.postEdit = function(req, res) {
// 	var query = {"_id": req.params.id};
// 	var data = {
// 		"station" : req.body.station,
// 		"name" : req.body.name,
// 	    "description" : req.body.description,
// 	    "active" : req.body.active,
// 	    "information" : req.body.information,
// 	    "note" : req.body.note
// 	}
// 	console.log(query)
// 	History.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/device');
// 	});

// };

// module.exports.getDelete = function(req, res) {
// 	var id = req.params.id;
// 	Measurement.findByIdAndDelete(id, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };