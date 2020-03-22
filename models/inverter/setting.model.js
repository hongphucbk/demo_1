var mongoose = require('mongoose');
var settingSchema = new mongoose.Schema({
	name: String,
	broker: String,
	port: Number,
	active: Number,
	note: String,
});

var InverterSetting = mongoose.model('InverterSetting', settingSchema, 'inverter_setting');
module.exports = InverterSetting;