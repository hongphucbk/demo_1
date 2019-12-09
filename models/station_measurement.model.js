var mongoose = require('mongoose');
var stationMeasurementSchema = new mongoose.Schema({
	station: String,
	measurement: String,
	unit: String,
	note: String,
});

var StationMeasurement = mongoose.model('StationMeasurement', stationMeasurementSchema, 'station_measurement');

module.exports = StationMeasurement;