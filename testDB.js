var mongoose = require('mongoose');

mongoose.connect('mongodb://124.158.10.133/taisun', {useNewUrlParser: true, useUnifiedTopology: true});
var alarmSchema = new mongoose.Schema({
	machine: Number,
	name: String,
	bit: Number,
	text: String,
	flag: Number,
	note: String
});
var Alarm = mongoose.model('Alarm', alarmSchema, 'alarm');//variable ,module table ,table 'alarm'

console.log(Alarm)
var TagName = "MAIN_01_VAR_ga_m_alarmhardfaultword{0}";

console.log("helllo");

Alarm.find({ name: TagName}, function (err, docs) {
	if(!err){
		console.log("Error");
	}
	console.log('data return: ',docs);
});


