var mongoose = require('mongoose');
var alarmSchema = new mongoose.Schema({
	machine: Number,
	name: String,
	bit: Number,
	text: String,
	flag: Number,
	note: String,
});

var Alarm = mongoose.model('Alarm', alarmSchema, 'alarm');
module.exports = Alarm;