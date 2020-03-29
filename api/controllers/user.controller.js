var UserApi = require('../../models/user-api.model')

module.exports.postAdd = async function(req, res) {
	// req.body.created_at = new Date();
	// req.body.updated_at = new Date();
	console.log(req.body)
	await UserApi.insertMany(req.body, function(err) {
		if (err) return res.json({result: 0, message: err.message})
	});

	res.json({result: 1, message: "Server đã lưu thành công", data: req.body })
};




// module.exports.getAdd = function(req, res) {
// 	Station.find().then(function(stations){
// 		res.render('stations/add', {
// 			stations: stations
// 		});
// 	});
// };

// module.exports.postAdd = function(req, res) {
// 	console.log(req.body);
// 	// or, for inserting large batches of documents
// 	Station.insertMany(req.body, function(err) {
// 		if (err) return handleError(err);
// 	});
// 	res.redirect('/station');
// };

// module.exports.getEdit = function(req, res) {
// 	var id = req.params.id;
// 	Station.findById(id).then(function(station){
// 		res.render('stations/edit', {
// 			station: station
// 		});
// 	});
// };

// module.exports.postEdit = function(req, res) {
// 	var query = {"_id": req.params.id};
// 	var data = {
// 		"name" : req.body.name,
// 	    "description" : req.body.description,
// 	    "address" : req.body.address,
// 	    "information" : req.body.information,
// 	    "note" : req.body.note
// 	}
// 	console.log(query)
// 	Station.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };

// module.exports.getDelete = function(req, res) {
// 	var id = req.params.id;
// 	Station.findByIdAndDelete(id, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };