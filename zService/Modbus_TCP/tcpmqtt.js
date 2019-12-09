const node_modbus = require('node-modbus')
var mqtt = require('mqtt')
//var mqttclient  = mqtt.connect('mqtt://124.158.10.133:3003')
//var mqttclient  = mqtt.connect('mqtt://127.0.0.1:3003')
var mqttclient  = mqtt.connect('mqtt://127.0.0.1:3003')

var topic="Water/Level";
mqttclient.on("connect",function(){	
	console.log("mqtt connected");
})
const client = node_modbus.client.tcp.complete({
    'host': '192.168.0.100', /* IP or name of server host */
    'port': 502, /* well known Modbus port */
    'unitId': 1, 
    'timeout': 2000, /* 2 sec */
    'autoReconnect': true, /* reconnect on connection is lost */
    'reconnectTimeout': 15000, /* wait 15 sec if auto reconnect fails to often */
    'logLabel' : 'Modbus TCP Client', /* label to identify in log files */
    'logLevel': 'debug', /* for less log use: info, warn or error */
    'logEnabled': true
})
const time_interval = 5000  //10*60*1000
client.connect()
client.on('connect', function() {
  setInterval( function() {
    client.readHoldingRegisters(7001, 2).then(function (resp) {
                // resp will look like { fc: 3, byteCount: 20, register: [ values 0 - 10 ], payload: <Buffer> }
               // console.log(resp);
               // resp.register.forEach(function (value, i) {
                    // var fulladdress = (address + i).toString();
                    // ValueMap[rootname + fulladdress] = {
                        // v: new opcua.Variant({ dataType: opcua.DataType.Int32, value: value }),
                        // q: "good"
                    //console.log(resp.payload[1]);

					console.log('register = ',resp);
					//};
				//);
				var jsondata ='';
				resp.register.forEach(function(value,i){
					//.log('register');
					
					jsondata=jsondata+'"Level'+i+'"'+':'+value+',';
					
					//console.log('"register',i,'"',":",value);
				}
				
				);
				jsondata = jsondata.substring(0,jsondata.length-1);
				jsondata ='"Area":1,'+jsondata;
				var datasend = '{'+jsondata+'}';
				//var datasend= JSON.stringify(values);
				
				mqttclient.publish(topic, datasend);//pulish to mqtt broker 
				
				console.log('datasend: ',datasend)
  
  
	 });
  
  }, time_interval) /* reading coils every second */
})