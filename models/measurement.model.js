var mongoose = require('mongoose');
var measurementSchema = new mongoose.Schema({
	name: String,
	description: String,
	unit: String,
	group: String,
	active: Number,
	information: String,
	note: String,
});

var Measurement = mongoose.model('Measurement', measurementSchema, 'measurements');

module.exports = Measurement;