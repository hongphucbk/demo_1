var modbus = require('i6-driver-modbus');
var _ = require('lodash');

// Berisi tags / address list
var tags = require('./tags.js');

// Berisi konfigurasi device
var devices = require('./devices');

devices.PLC1.tags = tags;
// devices.PLC2.tags = tags;

var PLC1 = new modbus(devices.PLC1);
// var PLC2 = new modbus(devices.PLC2);



PLC1.on(PLC1.events.valueUpdate, (payload)=>{
    _.each(payload.tags, function(tag){
        console.log(tag.name +  ' : ' + tag.value);
    });
});
