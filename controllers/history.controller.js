var Alarm = require('../models/alarm.model')
var History = require('../models/history.model')
var moment = require('moment');
const excel = require('node-excel-export');

module.exports.list = function(req, res) {
	History.find().then(function(histories){
		//console.log(station_measurements)
		res.render('history/list', {
			histories: histories
		});
	});
};

module.exports.getHistory = async function(req, res) {
  var perPage = 10
  var page = req.query.page || 1;
  let startdate = new Date(req.body.startdate);
  let enddate = new Date(req.body.enddate);

	let histories = await History.find().skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await History.countDocuments({});

	let pages = Math.ceil(recordsTotal / perPage);

	console.log(page, pages, recordsTotal)
	res.render('history/list', {
		histories: histories,
		current: page,
		pages: pages,
		moment: moment,
		startdate: startdate,
		enddate: enddate
	});
};

module.exports.postHistory = async function(req, res) {
  
  let startdate = new Date(req.body.startdate);
  let enddate = new Date(req.body.enddate);

  console.log(req.body);
  var perPage = 10
  var page = req.query.page || 1

	let histories = await History.find({ timestamp: { $gte: startdate, $lte: enddate }}).skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await History.countDocuments({ timestamp: { $gte: startdate, $lte: enddate }});

	let pages = Math.ceil(recordsTotal / perPage);

	console.log(page, pages, recordsTotal)
	res.render('history/list', {
		histories: histories,
		current: page,
		pages: pages,
		moment: moment,
		startdate: startdate,
		enddate: enddate
	});
};

module.exports.listExcel = async function(req, res) {
	let histories = await History.find().sort('-timestamp').limit(2000);
	let data = []
	let temp1;
	let temp2;

	histories.forEach(function(history) {
		temp2 = "";
		// if (water.data > 80) {
		// 	temp2 = "Hight"
		// }
		// if (water.data < 20) {
		// 	temp2 = "Low"
		// }

		temp1 = {time: history.timestamp, T1: history.T1, T2: history.T2 }  // moment().format('MMMM Do YYYY, h:mm:ss a');
		data.push(temp1)
	})
	// You can define styles as json object
	const styles = {
	  headerDark: {
	    fill: {
	      fgColor: {
	        rgb: 'FF000000'
	      }
	    },
	    font: {
	      color: {
	        rgb: 'FFFFFFFF'
	      },
	      sz: 12,
	      bold: true,
	      underline: false
	    }
	  },
	  headerBlue: {
	    fill: {
	      fgColor: {
	        rgb: '00c8fa'
	      }
	    },
	    font: {
	      color: {
	        rgb: 'FFFFFFFF'
	      },
	      sz: 14,
	      bold: true,
	      underline: false
	    }
	  },
	  cellPink: {
	    fill: {
	      fgColor: {
	        rgb: 'FFFFCCFF'
	      }
	    }
	  },
	  cellGreen: {
	    fill: {
	      fgColor: {
	        rgb: 'FF00FF00'
	      }
	    }
	  },
	  cellRed: {
	    fill: {
	      fgColor: {
	        rgb: 'f5938c'
	      }
	    }
	  },
	  cellYellow: {
	    fill: {
	      fgColor: {
	        rgb: 'eff59d'
	      }
	    }
	  },
	  cellWhite: {
	    fill: {
	      fgColor: {
	        rgb: 'ffffff'
	      }
	    }
	  }
	};
	 
	//Array of objects representing heading rows (very top)
	const heading = [
	  [ {value: 'REPORT', style: styles.headerBlue}, 
	    // {value: 'b1', style: styles.headerDark}, 
	    // {value: 'c1', style: styles.headerDark} ],
	    ]
	  //['a2', 'b2', 'c2'] // <-- It can be only values
	];
	 
	//Here you specify the export structure
	const specification = {
	  time: { // <- the key should match the actual data key
	    displayName: 'Time', // <- Here you specify the column header
	    headerStyle: styles.headerDark, // <- Header style
	    
	    width: 100 // <- width in pixels
	  },
	  T1: {
	    displayName: 'T1 [DEG.C]',
	    headerStyle: styles.headerDark,
	    // cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
	    //   return (value == 1) ? 'Active' : 'Inactive';
	    // },
	    width: 50 // <- width in chars (when the number is passed as string)
	  },
	  T2: {
	    displayName: 'T2 [DEG.C]',
	    headerStyle: styles.headerDark,
	    //cellStyle: styles.cellPink, // <- Cell style
	    // cellStyle: function(value, row) { // <- style renderer function
	    //   // if the status is 1 then color in green else color in red
	    //   // Notice how we use another cell value to style the current one
	    //   return (row.value <= 80 & row.value >= 20) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
	    // },
	    width: 50 // <- width in pixels
	  },
	  // T3: {
	  //   displayName: 'CẢNH BÁO',
	  //   headerStyle: styles.headerDark,
	  //   //cellStyle: styles.cellPink, // <- Cell style
	  //   cellStyle: function(value, row) { // <- style renderer function
	  //     // if the status is 1 then color in green else color in red
	  //     // Notice how we use another cell value to style the current one
	  //     if (row.value > 80) {
	  //     	return styles.cellRed
	  //     }
	  //     if (row.value < 20) {
	  //     	return styles.cellYellow
	  //     }
	  //     return styles.cellWhite

	  //   },
	  //   width: 100 // <- width in pixels
	  // },
	  // time: {
	  //   displayName: 'THỜI GIAN',
	  //   headerStyle: styles.headerDark,
	  //   //cellStyle: styles.cellPink, // <- Cell style
	  //   width: 200 // <- width in pixels
	  // }
	}
	 
	// The data set should have the following shape (Array of Objects)
	// The order of the keys is irrelevant, it is also irrelevant if the
	// dataset contains more fields as the report is build based on the
	// specification provided above. But you should have all the fields
	// that are listed in the report specification
	// const dataset = [
	//   {station: '1', status_id: 1, note: 'some note', misc: 'not shown'},
	//   {station: '1', status_id: 0, note: 'some note'},
	//   {station: '1', status_id: 0, note: 'some note', misc: 'not shown'}
	// ]

	const dataset = data;
	 
	// Define an array of merges. 1-1 = A:1
	// The merges are independent of the data.
	// A merge will overwrite all data _not_ in the top-left cell.
	const merges = [
	  { start: { row: 1, column: 1 }, end: { row: 1, column: 5 } },
	  // { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
	  // { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
	]
	 
	// Create the excel report.
	// This function will return Buffer
	const report = excel.buildExport(
	  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
	    {
	      name: 'Report', // <- Specify sheet name (optional)
	      heading: heading, // <- Raw heading array (optional)
	      merges: merges, // <- Merge cell ranges
	      specification: specification, // <- Report specification
	      data: dataset // <-- Report data
	    }
	  ]
	);
	 
	// You can then return this straight
	res.attachment('Report.xlsx'); // This is sails.js specific (in general you need to set headers)
	return res.send(report);
	 
	// OR you can save this buffer to the disk by creating a file.
};

module.exports.getChart = async function(req, res) {
	var perPage = 10
  var page = req.query.page || 1

	let histories = await History.find().skip((perPage * page) - perPage).limit(perPage);
	let recordsTotal  = await History.countDocuments({});

	let pages = Math.ceil(recordsTotal / perPage);

	//console.log(page, pages, recordsTotal)

	let startdate = new Date();

	res.render('history/chart', {
		histories: histories,
		current: page,
		pages: pages,
		moment: moment,
		startdate: startdate,
	});
};




module.exports.apiGetData = async function(req, res) {
	currentDay = new Date();

	strStartDate = req.body.startDate ? req.body.startDate: currentDay;
	let dtStartDate = new Date(strStartDate);
  let strYear = dtStartDate.getFullYear();
  let strMonth = dtStartDate.getMonth()+1;
  let strDate = dtStartDate.getDate();
  

	console.log(strYear + " " + strMonth + " " + strDate)

	var data1 = [];

	for (let i = 0; i < 24; i++) {
		let start_date = new Date(strYear + "-" + strMonth +"-" +strDate  + " " + i +":00:00")
		let end_date = new Date(strYear + "-" + strMonth +"-" +strDate +" " + i + ":59:59") 
		
		histories = await History.find({timestamp: { $gte: start_date , $lte: end_date}});
		let a = ""; let b
		let count = 0, sum = 0, avg = 0;
		let tempData = 
		await histories.forEach(function(data){
			a = a + " " +  data.T1
			b = data.timestamp;
			
			count++;
			sum += data.T1
			avg = count == 0 ? 0 : Math.round( sum*100/count)/100;
		});
		
		let temp_data = 
		{
		  timestamp: start_date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
		  value: avg
		}

		data1.push(temp_data)
 		
 		//await console.log("-------------------------------------")
 		//await console.log('Count = ' + count + ", Sum = " + sum + ", avg = " + avg)
 		//await console.log(b + " " + a)
	}
	
	res.json(data1);
};

// //
// module.exports.postAdd = function(req, res) {
// 	console.log(req.body);
// 	// or, for inserting large batches of documents
// 	History.insertMany(req.body, function(err) {
// 		if (err) return handleError(err);
// 	});
// 	res.redirect('/device');
// };

// module.exports.getEdit = function(req, res) {
// 	var id = req.params.id;
// 	History.findById(id).then(function(device){
// 		History.find().then(function (stations) {
// 			res.render('device/edit', {
// 				device: device,
// 				stations: stations,
// 			});
// 		});	
// 	});
// };



// module.exports.postEdit = function(req, res) {
// 	var query = {"_id": req.params.id};
// 	var data = {
// 		"station" : req.body.station,
// 		"name" : req.body.name,
// 	    "description" : req.body.description,
// 	    "active" : req.body.active,
// 	    "information" : req.body.information,
// 	    "note" : req.body.note
// 	}
// 	console.log(query)
// 	History.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/device');
// 	});

// };

// module.exports.getDelete = function(req, res) {
// 	var id = req.params.id;
// 	Measurement.findByIdAndDelete(id, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };