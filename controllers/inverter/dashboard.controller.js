var InverterDevice = require('../../models/inverter/device.model');
var moment = require('moment');

module.exports.getIndex = async function(req, res) {
	let devices = await InverterDevice.find();
	//console.log(setting)
	
	res.render('inverter/dashboard', {
		settings: devices,
		moment: moment,
		// startdate: startdate,
		// enddate: enddate,
		// pages: pages,
		// current: page,
	})
};

module.exports.getAdd = function(req, res) {
	res.render('inverter/device/add', {
			
	});
};

module.exports.postAdd = function(req, res) {
	console.log(req.body);
	// or, for inserting large batches of documents
	InverterDevice.insertMany(req.body, function(err) {
		if (err) return handleError(err);
	});
	res.redirect('/inverter/device/');
};


module.exports.getEdit = function(req, res) {
	var id = req.params.id;
	InverterDevice.findById(id).then(function(setting){
		res.render('inverter/device/edit', {
			setting: setting
		});
	});
};

module.exports.postEdit = function(req, res) {
	var query = {"_id": req.params.id};
	var data = {
		"name" : req.body.name,
    "broker" : req.body.broker,
    "port" : req.body.port,
    // "password" : req.body.password,
    // "role" : parseInt(req.body.role),
    // "updated_at" : new Date()
	}
	//console.log(query)
	InverterDevice.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/inverter/device/edit/' + req.params.id);
	});

};

module.exports.getDelete = function(req, res) {
	var id = req.params.id;
	InverterDevice.findByIdAndDelete(id, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    res.redirect('/inverter/device');
	});

};


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


