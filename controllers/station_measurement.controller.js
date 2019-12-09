var StationMeasurement = require('../models/station_measurement.model')
var Station = require('../models/station.model')
var Measurement = require('../models/measurement.model')

module.exports.list = function(req, res) {
	StationMeasurement.find().then(function(station_measurements){
		//console.log(station_measurements)
		res.render('station_measurement/list', {
			station_measurements: station_measurements
		});
	});
};

module.exports.getAdd = function(req, res) {
	Promise.all(
		[
			Station.find(),
			Measurement.find()
		]).then(function(values){
			//console.log("values " + values)
			const [stations, measurements] = values;
			// console.log("stations " + stations)
			// console.log("measurements " + measurements)
			res.render('station_measurement/add', {
				stations, measurements
			});
		});

	// Station.find().then(function (stations) {
	// 	//console.log(stations)
	// 	Measurement.find().then(function(measurements){
	// 		res.render('station_measurement/add', {
	// 			//station_measurements: station_measurements,
	// 			stations: stations,
	// 			measurements: measurements
	// 		});
	// 	});
	// });	
};

module.exports.postAdd = function(req, res) {
	console.log(req.body);
	// or, for inserting large batches of documents
	StationMeasurement.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/station_measurement');
};

module.exports.getEdit = function(req, res) {
	var id = req.params.id;
	StationMeasurement.findById(id).then(function(station_measurement){
		Station.find().then(function (stations) {
		//console.log(stations)
			Measurement.find().then(function(measurements){
				res.render('station_measurement/edit', {
					station_measurement: station_measurement,
					stations: stations,
					measurements: measurements
				});
			});
		});	
	});
};

module.exports.postEdit = function(req, res) {
	var query = {"_id": req.params.id};
	var data = {
		"station" : req.body.station,
	    "measurement" : req.body.measurement,
	    "unit" : req.body.unit,
	    "note" : req.body.note
	}
	console.log(query)
	StationMeasurement.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/station_measurement');
	});

};

// module.exports.getDelete = function(req, res) {
// 	var id = req.params.id;
// 	Measurement.findByIdAndDelete(id, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };