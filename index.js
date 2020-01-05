require('dotenv').config();
var bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = 3000

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use((req, res, next) => {
  res.locals.user = "";
  next()
})

//Khai bao api route
var apiHistoryRouter = require('./api/routes/history.route');
//==================
//--use api route
app.use('/api/history', apiHistoryRouter);


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const cookieParser = require('cookie-parser')
app.use(cookieParser()) // use to read format cookie

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static('public'));  
//app.use(express.static(path.join(__dirname, 'public'))); 
app.set('views', './views');

//app.use(express.static(path.join(__dirname, 'public')));

// Khai báo Router --------------------------------------------------
var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');

var emailRouter = require('./routes/email.route');

var historyRouter = require('./routes/history.route');
var realRouter = require('./routes/real.route');
var powerRouter = require('./routes/power.route');

//-------------------------------------------------------------------

var mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true});
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true});

var middleware = require('./middlewares/auth.middleware');

app.get('/', middleware.requireAuth, function(req, res) {
	res.render('real/list2');
}) 

// Router -----------------------------------------------------------
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/email', emailRouter);

app.use('/history', historyRouter);
app.use('/real', realRouter);
app.use('/power', powerRouter);

//-------------------------------------------------------------------

app.listen(port, function(){
	console.log(`Server listening on port ${port}!`)
});

// Add server MQTT
var mosca = require('mosca');
// var settings = {
// 		port:1883
// 		}

// //var server = new mosca.Server(settings);
// var server = new mosca.Server({
//   http: {
//     port: 3005,
//     bundle: true,
//     static: './'
//   }
// });

var settings = {
  http:{
    port: 3002  //MQTT for Web
  },
  port:3003,    //MQTT for PLC
  }

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
   //console.log('client connected', client.id);
});
server.on('ready', function(){
	console.log("Server Mosca MQTT ready port " + settings.port);
});


var History = require('./models/history.model')
var Power = require('./models/power.model')

//find when a message .is received
let indexCount = 0;
let indexCountPower = 0;
server.on('published',function getdata(packet,client) {
	if(packet.topic =='monitor/svr_room') 
	{
		// console.log('data: ', packet.topic);
		let data = packet.payload.toString();
		
		let jsondata = JSON.parse(data);
		jsondata.timestamp = new Date();
		jsondata.PR = 20;
		jsondata.status = 'COOLING'
		console.log(jsondata);
		//var saveData = { "val" : jsondata }

		History.insertMany(jsondata, function(err) {
			if (err) return handleError(err);
		});
	}

	//Gateway A Nguyen (Aucontech)
	if(packet.topic =='GateWay/Data') 
	{
		// console.log('data: ', packet.topic);
		let data = packet.payload.toString();
		
		let jsondata = JSON.parse(data);
		// jsondata.timestamp = new Date();
		// jsondata.PR = 20;
		// jsondata.status = 'COOLING'
		console.log(jsondata);
		//var saveData = { "val" : jsondata }
		
		io.emit('Gateway', jsondata);

		// History.insertMany(jsondata, function(err) {
		// 	if (err) return handleError(err);
		// });
	}

	//Data Nha may Trong
	if(packet.topic =='PLC/Data') 
	{
		indexCount ++;
		//console.log("index count = " + indexCount)
		let data = packet.payload.toString();
		let data_json = JSON.parse(data)
		let T1 = data_json.Temp_J
		let T2 = data_json.Temp_G;
		let T3 = data_json.Temp_Q;
		let T4 = data_json.Temp_Aver;

		let B1 = data_json.Humi_J;
		let B2 = data_json.Humi_G;

		let saveData = {
			T1: T1,
			T2: T2,
			T3: T3,
			T4: T4,
			B1: B1,
			B2: B2,
			timestamp: new Date()
		};

		if (indexCount > 300 ) {
			indexCount = 0;

			History.insertMany(saveData, function(err) {
				if (err) return handleError(err);
			});
		}
		
		//console.log("Data: " +  saveData)
		io.emit('dataReal', saveData);
	}

	//Data Nha may Trong Power
	let sampleIndex = 1000;
	if(packet.topic =='PLC/Power') 
	{
		//console.log("index count = " + indexCount)
		indexCountPower++;

		let data = packet.payload.toString();
		let data_json = JSON.parse(data)

		if (data_json.area1) {
			if (indexCountPower > sampleIndex ) {
				let savePower1 = {
					ull: data_json.area1.U_LL,
					uln: data_json.area1.U_LN,
					i: data_json.area1.I,
					w: data_json.area1.KWH,
					area: data_json.area1.Area,
					timestamp: new Date()
				};
				let savePower2 = {
					ull: data_json.area2.U_LL,
					uln: data_json.area2.U_LN,
					i: data_json.area2.I,
					w: data_json.area2.KWH,
					area: data_json.area2.Area,
					timestamp: new Date()
				};

				let savePower3 = {
					ull: data_json.area3.U_LL,
					uln: data_json.area3.U_LN,
					i: data_json.area3.I,
					w: data_json.area3.KWH,
					area: data_json.area3.Area,
					timestamp: new Date()
				};

				let arr = [savePower1,savePower2, savePower3];

				
				Power.insertMany(arr, function(err) {
					if (err) return handleError(err);
				});
			}
		}

		if (data_json.area4) {
			if (indexCountPower > sampleIndex ) {
				let savePower4 = {
					ull: data_json.area4.U_LL,
					uln: data_json.area4.U_LN,
					i: data_json.area4.I,
					w: data_json.area4.KWH,
					area: data_json.area4.Area,
					timestamp: new Date()
				};
				let savePower5 = {
					ull: data_json.area5.U_LL,
					uln: data_json.area5.U_LN,
					i: data_json.area5.I,
					w: data_json.area5.KWH,
					area: data_json.area5.Area,
					timestamp: new Date()
				};

				let savePower6 = {
					ull: data_json.area6.U_LL,
					uln: data_json.area6.U_LN,
					i: data_json.area6.I,
					w: data_json.area6.KWH,
					area: data_json.area6.Area,
					timestamp: new Date()
				};

				let arr = [savePower4,savePower5, savePower6];

				Power.insertMany(arr, function(err) {
					if (err) return handleError(err);
				});
			}
		}

		if (data_json.area7) {
			if (indexCountPower > sampleIndex ) {
				let savePower7 = {
					ull: data_json.area7.U_LL,
					uln: data_json.area7.U_LN,
					i: data_json.area7.I,
					w: data_json.area7.KWH,
					area: data_json.area7.Area,
					timestamp: new Date()
				};
				let savePower8 = {
					ull: data_json.area8.U_LL,
					uln: data_json.area8.U_LN,
					i: data_json.area8.I,
					w: data_json.area8.KWH,
					area: data_json.area8.Area,
					timestamp: new Date()
				};

				let savePower9 = {
					ull: data_json.area9.U_LL,
					uln: data_json.area9.U_LN,
					i: data_json.area9.I,
					w: data_json.area9.KWH,
					area: data_json.area9.Area,
					timestamp: new Date()
				};

				let arr = [savePower7,savePower8, savePower9];

				Power.insertMany(arr, function(err) {
					if (err) return handleError(err);
				});
			}
		}

		if (data_json.area10) {
			if (indexCountPower > sampleIndex ) {
				let savePower10 = {
					ull: data_json.area10.U_LL,
					uln: data_json.area10.U_LN,
					i: data_json.area10.I,
					w: data_json.area10.KWH,
					area: data_json.area10.Area,
					timestamp: new Date()
				};
				let savePower11 = {
					ull: data_json.area11.U_LL,
					uln: data_json.area11.U_LN,
					i: data_json.area11.I,
					w: data_json.area11.KWH,
					area: data_json.area11.Area,
					timestamp: new Date()
				};

				let savePower12 = {
					ull: data_json.area12.U_LL,
					uln: data_json.area12.U_LN,
					i: data_json.area12.I,
					w: data_json.area12.KWH,
					area: data_json.area12.Area,
					timestamp: new Date()
				};

				indexCountPower = 0;

				let arr = [savePower10,savePower11, savePower12];

				Power.insertMany(arr, function(err) {
					if (err) return handleError(err);
				});
			}
		}
		
		io.emit('dataPower', data_json);
	}
});

//-------------------------------------------------------------------
//Socket IO
http.listen(3001, function(){
  console.log('Socket io listening on *:3001');
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('data', "Hello user " + socket.id);

  socket.on('AlarmText', function(msg){
    console.log('Socket Data AlarmText = : ' + msg);
    let array = msg.split(',');
    console.log(array)
    io.emit('AlarmText', array);
  });

  socket.on('Alarm', function(msg){
    console.log('Socket Data AlarmText = : ' + msg);
    let text = msg.id + " - " + msg.text;
    console.log(text)
    io.emit('AlarmText', msg);
  });

  socket.on('Product', function(msg){
    console.log('Socket Data Product = : ' + msg);
    let JsonData = JSON.parse(msg)
    //let text = msg.id + " - " + msg.text;
    console.log(JsonData)
    io.emit('ProductText', JsonData);
  });


  // socket.on('Product', function(msg){
  //   console.log('Socket Data Product = : ' + msg);
  // });

});

//-------------------------------------------------------------------
// Import Excel 
if (false) {
	var Alarm = require('./models/alarm.model')
	var mongoXlsx = require('mongo-xlsx');
	var model = null;
	var xlsx  = './public/file.xlsx';
	mongoXlsx.xlsx2MongoData(xlsx, model, function(err, data) {
	  console.log(data);
	  /*
	  [{ Name: 'Eddie', Email: 'edward@mail' }, { Name: 'Nico', Email: 'nicolas@mail' }]  
	  */
	  Alarm.insertMany(data, function(err, docs) {
	  	if (err) {
	  		console.log("False" + err) 
	  	}
	  }); 

	});
}

