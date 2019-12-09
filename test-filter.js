var mongoose = require('mongoose');
const io = require('socket.io-client');
var integer =require ("bitwise/integer");//module requrite npm install bitwise
var urlsocket = 'http://172.16.0.18:3001';
const socket = io.connect(urlsocket);
socket.on('connect', function() {
    console.log('Connected to server');
   
});
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
var historySchema = new mongoose.Schema({
	alarm_id: String,
	value: Number,
	timestamp: Date,
	machine: Number,
	note: String,
});

var History = mongoose.model('History', historySchema, 'history');
//console.log(Alarm)
var TagName = "MAIN_01_VAR_ga_m_alarmestopword{10}";
var Value  =22;
console.log("helllo");

Alarm.find({ name: TagName}, function (err, docs) {
	if(err){
		console.log("Error");
	}
	
	else 
	{
		if(docs.length > 1 )
		{
			//case alarm txt 
			//socket.emit('data','hellllo');
			//console.log('da send data ');
			//call funtion map retur bit 
			var mess = GetBit(245);//return bit
			var alarmtext =[];
			var insertData = [];
			console.log(mess);
			mess.forEach(function(element)
			{
				//query 
				docs.filter(function(doc)
				{
					if (doc.bit == element)
					{
						console.log(doc)
						alarmtext.push(doc.text);
						let temp1 = {
							alarm_id :doc.id,
							value : 1,
							timestamp : new Date,
							machine: 1
							
						}
						insertData.push(temp1);
					}//return alarm text input bit value 
					
				}
				)
			})
			console.log(insertData)
			var arr = insertData;
			History.insertMany(arr, function(err, docs) {
				if (err) {
					console.log('Err')
				}
			});

			//execute dulicate .
			//function insert 
			
		
			
		}
		else 
		{
			//case product realtime 
			//pulish socket io  {TagName : ,Value : }
			//insert db 
		}
		
	}
});
function GetBit(dataIn)
{
	var jsontext =[];

	for (var index =0 ;index<16;index++)
	{
		var bit_ = integer.getBit(dataIn,index)//get bit 
		if (bit_)
		{
			jsontext.push(index);

		}
	}
	return jsontext;
}