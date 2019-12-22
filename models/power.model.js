var mongoose = require('mongoose');
var powerSchema = new mongoose.Schema({
	area: String,
	ull: Number,
	uln: Number,
	i: Number,
	w: Number,
	timestamp: Date,
	note: String,
});

var Power = mongoose.model('Power', powerSchema, 'power');
module.exports = Power;