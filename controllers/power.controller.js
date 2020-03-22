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

module.exports.postHistory = async function(req, res) {
  let startdate = new Date(req.body.startdate);
  let enddate = new Date(req.body.enddate);
  let area = req.body.area;

  //console.log(req.body);
  var perPage = 10
  var page = req.query.page || 1

	let powers = await Power.find({ timestamp: { $gte: startdate, $lte: enddate }, area: area }).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await Power.countDocuments({ timestamp: { $gte: startdate, $lte: enddate }, area: area});

	let pages = Math.ceil(recordsTotal / perPage);

	res.render('power/history', {
		powers: powers,
		current: page,
		pages: pages,
		moment: moment,
		startdate: startdate,
		enddate: enddate
	});
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
	let dtToday = new Date();
  let strYear = dtToday.getFullYear();
  let strMonth = dtToday.getMonth()+1;

	res.render('power/chart', {
		moment: moment,
		year: strYear,
		month: strMonth,
	})
};


module.exports.apiGetData = async function(req, res) {
	currentDay = new Date();

	let area = req.body.area ? req.body.area : 1;
	let year = req.body.year;
	let month = req.body.month;

	//console.log(year + " " + month)
	
	// let dtStartDate = new Date();
 //  let strYear = dtStartDate.getFullYear();
 //  let strMonth = dtStartDate.getMonth();
  let strYear = year;
  let strMonth = month -1;

  let firstDate = new Date(strYear, strMonth, 1);
  let lastDate = new Date(strYear, strMonth + 1, 0);

	var data1 = []; var b = "";

	for (let i = 1; i <= lastDate.getDate(); i++) {
		let beginDay = new Date(strYear + "-" + (strMonth + 1)  +"-" + i  +" 00:00:01")
	  let endDay = new Date(strYear + "-" + (strMonth + 1) +"-" + i  + " 23:59:59") 
		
		console.log("=====================")
		console.log("Begin day = " + beginDay)
		console.log("End day = " + endDay)
		
		//let powerFirst = await Power.findOne({timestamp: { $gte: beginDay , $lte: endDay}, area : area}).sort({ _id: 1 })
		//let powerLast = await Power.findOne({timestamp: { $gte: beginDay , $lte: endDay}, area : area}).sort({ _id: -1 });
		
		let powers = await Power.find({timestamp: { $gte: beginDay , $lte: endDay}, area : area}).sort({ _id: 1 })
		let powerFirst = powers[0];
		let powerLast = powers.reverse()[0];

		console.log(powerFirst, powerLast)

		let valueFirst = powerFirst ? powerFirst.w : 0;
		let valueLast = powerLast ? powerLast.w : 0;
		
		console.log(valueFirst + " -- " + valueLast + " use: " + (valueLast - valueFirst))
		
		let temp_data = 
		{
		  date: i,
		  value: Math.abs((valueLast - valueFirst)).toFixed(1)
		}

		data1.push(temp_data)
	}
	res.json(data1);
};

module.exports.getAllChart = function(req, res) {
	let dtToday = new Date();
	let strYear = dtToday.getFullYear();
  let strMonth = dtToday.getMonth()+1;

	res.render('power/allchart', {
		moment: moment,
		year: strYear,
		month: strMonth,
	})
};

module.exports.apiGetAllData = async function(req, res) {
	let year = req.body.year;
	let month = req.body.month;

	let strYear = year;
  let strMonth = month -1;

	// strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	// let dtStartDate = new Date(strStartDate);
 //  let strYear = dtStartDate.getFullYear();
 //  let strMonth = dtStartDate.getMonth();
 //  let strDate = dtStartDate.getDate();
  
  let firstDate = new Date(strYear, strMonth, 1);
  let lastDate = new Date(strYear, strMonth + 1, 0);

	var b = ""; var data2 = [];
	for (let j = 1; j <= 5; j++) {
		let data1 = [];
		for (let i = 1; i <= lastDate.getDate(); i++) {
			let beginDay = new Date(strYear + "-" + (strMonth + 1)  +"-" + i  +" 00:00:01")
		  let endDay = new Date(strYear + "-" + (strMonth + 1) +"-" + i  + " 23:59:59") 
			
			//console.log(endDay)
			//console.log("=====================")
			//let powerFirst = await Power.findOne({timestamp: { $gte: beginDay , $lte: endDay}, area : j}).sort({ _id: 1 })
			//let powerLast = await Power.findOne({timestamp: { $gte: beginDay , $lte: endDay}, area : j}).sort({ _id: -1 });
			let powers = await Power.find({timestamp: { $gte: beginDay , $lte: endDay}, area : j}).sort({ _id: 1 })
			let powerFirst = powers[0];
			let powerLast = powers.reverse()[0];

			let valueFirst = powerFirst ? powerFirst.w : 0;
			let valueLast = powerLast ? powerLast.w : 0;
			
			//console.log(valueFirst + " -- " + valueLast + " use: " + (valueLast - valueFirst))
			

			let temp_data = 
			{
			  date: i,
			  value: Math.abs((valueLast - valueFirst)).toFixed(1)
			}
			data1.push(temp_data)
		}

		let temp_full_data = {
			area : j,
			data : data1,
		}
		data2.push(temp_full_data)
	}
	res.json(data2);
};
// module.exports.getDetail = async function(req, res) {
// 		// Station.findById(id).then(function(stati
// 	var id = req.params.id;
// 	//Old functionon){
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


