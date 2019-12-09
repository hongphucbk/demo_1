var mongoose = require('mongoose');
var historySchema = new mongoose.Schema({
	T1: Number,
	T2: Number,
	T3: Number,
	T4: Number,
	T5: Number,
	T6: Number,
	T7: Number,
	T8: Number,
	T9: Number,
	T10: Number,
	T11: Number,
	B1: Number,
	B2: Number,
	PR: Number,
	status: String,
	timestamp: Date,
	note: String,
});

var History = mongoose.model('History', historySchema, 'history');

module.exports = History;