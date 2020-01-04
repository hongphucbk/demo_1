var Power = require('../models/power.model');
var moment = require('moment');

module.exports.history = async function(req, res) {
	let startdate = new Date(req.body.startdate);
  let enddate = new Date(req.body.enddate);

  let perPage = 10;
  let page = req.query.page || 1;

  let powers = await Power.find().skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await Power.countDocuments({});

	let pages = Math.ceil(recordsTotal / perPage);
	
	res.render('power/history', {
		powers: powers,
		moment: moment,
		startdate: startdate,
		enddate: enddate,
		pages: pages,
		current: page,
	})
};

module.exports.getReal = function(req, res) {
	let startdate = new Date(req.body.startdate);
  let enddate = new Date(req.body.enddate);
		
	res.render('power/real', {
			moment: moment,
			startdate: startdate,
			enddate: enddate,
			pages: 1,
			current: 1,
	})
};

module.exports.getChart = function(req, res) {
	Station.find().then(function(stations){
		res.render('overview/maps', {
			stations: stations
		})
	})
};

// module.exports.getDetail = async function(req, res) {
// 	var id = req.params.id;
// 	//Old function
// 		// Station.findById(id).then(function(station){
// 		// 	StationMeasurement.find({station: station.name}).then(function(station_measurements){
// 		// 		res.render('overview/detail', {
// 		// 			station: station,
// 		// 			station_measurements: station_measurements,
// 		// 			helper: require('../helpers/helper'),
// 		// 			abc: abc,

// 		// 		});
// 		// 	});
// 		// });

// 	let station = await Station.findById(id);
// 	let station_measurements = await StationMeasurement.find({station: station.name});
// 	console.log((station_measurements));
// 	res.render('overview/detail', {
// 		station: station,
// 		station_measurements: station_measurements,
// 		helper: require('../helpers/helper'),
// 		readName: readName,

// 	});
// };

// module.exports.getChart = function(req, res) {
// 	let id = req.params.id;
// 	Station.findById(id).then(function(station){
// 		res.render('overview/chart', {
// 			station: station
// 		});
// 	});
// };

// // module.exports.postAdd = function(req, res) {
// // 	console.log(req.body);
// // 	// or, for inserting large batches of documents
// // 	Station.insertMany(req.body, function(err) {
// // 		if (err) return handleError(err);
// // 	});
// // 	res.redirect('/station');
// // };

// function abc(measureName){
// 	getMeasureDesc(measureName).then(function(a){
// 		console.log("a = " + a.description)
// 		return a.description;
// 	})
// }

// async function getMeasureDesc(measureName) {
//     let temp = await readName(measureName);
//     console.log("Temp2 = " + temp)
//     return temp;
// };

// let readName = async(measureName) => {
// 	let temp = await Measurement.findOne({name: measureName});
// 	console.log(temp.description)
// 	return "a";
// };

// let readName = async(measureName){
// 	return new Promise(function(resolve, reject){
// 		Measurement.findOne({name: measureName},function(err, measurement){
// 			console.log("Temp1 = " + measurement)
//     		if (err) {
//     			reject(err);
//     		} else {
//     			resolve(measurement);
//     		}
//     	});
// 	});	
// };


