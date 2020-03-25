var TempHum = require('../../models/temphum.model')

module.exports.getData = async function(req, res) {
	TempHum.findOne(function (err, data) {
		if (err) {
			res.json({result: 0, err: err.message})
		} else {

			let dt = {
				T1: data.T1,
				T2: data.T2,
				T3: data.T3,
				T4: data.T4,
				H1: data.B1,
				H2: data.B2,
				updated_at: data.timestamp
			}
			res.json({result: 1, data: dt})
		}
	});	
};




module.exports.postData = async function(req, res) {
	TempHum.findOne(function (err, data) {
		if (err) {
			res.json({result: 0, err: err.message})
		} else {

			let dt = {
				T1: data.T1,
				T2: data.T2,
				T3: data.T3,
				T4: data.T4,
				H1: data.B1,
				H2: data.B2,
				updated_at: data.timestamp
			}
			res.json({result: 1, data: dt})
		}
	});	
};


module.exports.getDataRandom = async function(req, res) {
	TempHum.findOne(function (err, data) {
		if (err) {
			res.json({result: 0, err: err.message})
		} else {

			let dt = {
				T1: parseInt(data.T1) + Math.random().toFixed(2),
				T2: parseInt(data.T2) + Math.random().toFixed(2),
				T3: parseInt(data.T3) + Math.random().toFixed(2),
				T4: parseInt(data.T4) + Math.random().toFixed(2),
				H1: parseInt(data.H1) + Math.random().toFixed(2),
				H2: parseInt(data.H2) + Math.random().toFixed(2),
				updated_at: data.timestamp
			}
			res.json({result: 1, data: dt})
		}
	});	
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