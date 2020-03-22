var InverterSetting = require('../../models/inverter/setting.model');
var moment = require('moment');

module.exports.getIndex = async function(req, res) {	
	res.render('developer/temp-hum/index', {
		moment: moment,
	})
};

// module.exports.getAdd = function(req, res) {
// 	res.render('inverter/setting/add', {
			
// 	});
// };

// module.exports.postAdd = function(req, res) {
// 	console.log(req.body);
// 	// or, for inserting large batches of documents
// 	InverterSetting.insertMany(req.body, function(err) {
// 		if (err) return handleError(err);
// 	});
// 	res.redirect('/inverter/setting/');
// };


// module.exports.getEdit = function(req, res) {
// 	var id = req.params.id;
// 	InverterSetting.findById(id).then(function(setting){
// 		res.render('inverter/setting/edit', {
// 			setting: setting
// 		});
// 	});
// };

// module.exports.postEdit = function(req, res) {
// 	var query = {"_id": req.params.id};
// 	var data = {
// 		"name" : req.body.name,
//     "broker" : req.body.broker,
//     "port" : req.body.port,
//     // "password" : req.body.password,
//     // "role" : parseInt(req.body.role),
//     // "updated_at" : new Date()
// 	}
// 	//console.log(query)
// 	InverterSetting.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/inverter/setting/edit/' + req.params.id);
// 	});

// };

// module.exports.getDelete = function(req, res) {
// 	var id = req.params.id;
// 	InverterSetting.findByIdAndDelete(id, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/inverter/setting');
// 	});

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


