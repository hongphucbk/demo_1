var mongoose = require('mongoose');
var settingSchema = new mongoose.Schema({
	name: String,
	broker_id: String,
	code: String,
	topic: String,
	active: Number,
	note: String,
});

var InverterDevice = mongoose.model('InverterDevice', settingSchema, 'inverter_device');
module.exports = InverterDevice;