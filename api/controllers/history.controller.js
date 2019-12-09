var History = require('../../models/history.model')

module.exports.list = async function(req, res) {
	histories = await History.find();
	res.send(histories);
};

module.exports.list2 = async function(req, res) {
	histories = await History.find();
	var data1 = 
	{
	  "draw": 1,
	  "recordsTotal": 57,
	  "recordsFiltered": 57,
	  "data": [
	    {
	      "first_name": "Airi",
	      "last_name": "Satou",
	      "position": "Accountant",
	      "office": "Tokyo",
	      "start_date": "28th Nov 08",
	      "salary": "$162,700"
	    },
	    {
	      "first_name": "Angelica",
	      "last_name": "Ramos",
	      "position": "Chief Executive Officer (CEO)",
	      "office": "London",
	      "start_date": "9th Oct 09",
	      "salary": "$1,200,000"
	    },
	    {
	      "first_name": "Ashton",
	      "last_name": "Cox",
	      "position": "Junior Technical Author",
	      "office": "San Francisco",
	      "start_date": "12th Jan 09",
	      "salary": "$86,000"
	    },
	    {
	      "first_name": "Bradley",
	      "last_name": "Greer",
	      "position": "Software Engineer",
	      "office": "London",
	      "start_date": "13th Oct 12",
	      "salary": "$132,000"
	    },
	    {
	      "first_name": "Brenden",
	      "last_name": "Wagner",
	      "position": "Software Engineer",
	      "office": "San Francisco",
	      "start_date": "7th Jun 11",
	      "salary": "$206,850"
	    },
	    {
	      "first_name": "Brielle",
	      "last_name": "Williamson",
	      "position": "Integration Specialist",
	      "office": "New York",
	      "start_date": "2nd Dec 12",
	      "salary": "$372,000"
	    },
	    {
	      "first_name": "Bruno",
	      "last_name": "Nash",
	      "position": "Software Engineer",
	      "office": "London",
	      "start_date": "3rd May 11",
	      "salary": "$163,500"
	    },
	    {
	      "first_name": "Caesar",
	      "last_name": "Vance",
	      "position": "Pre-Sales Support",
	      "office": "New York",
	      "start_date": "12th Dec 11",
	      "salary": "$106,450"
	    },
	    {
	      "first_name": "Cara",
	      "last_name": "Stevens",
	      "position": "Sales Assistant",
	      "office": "New York",
	      "start_date": "6th Dec 11",
	      "salary": "$145,600"
	    },
	    {
	      "first_name": "Cedric",
	      "last_name": "Kelly",
	      "position": "Senior Javascript Developer",
	      "office": "Edinburgh",
	      "start_date": "29th Mar 12",
	      "salary": "$433,060"
	    }
	  ]
	}
 
	res.json(data1);
};

module.exports.postList2 = async function(req, res) {
	histories = await History.find();
	var data1 = 
	{
	  "draw": 3,
	  "recordsTotal": 57,
	  "recordsFiltered": 57,
	  "data": [
	    {
	      "first_name": "Airi",
	      "last_name": "Satou",
	      "position": "Accountant",
	      "office": "Tokyo",
	      "start_date": "28th Nov 08",
	      "salary": "$162,700"
	    },
	    {
	      "first_name": "Angelica",
	      "last_name": "Ramos",
	      "position": "Chief Executive Officer (CEO)",
	      "office": "London",
	      "start_date": "9th Oct 09",
	      "salary": "$1,200,000"
	    },
	    {
	      "first_name": "Ashton",
	      "last_name": "Cox",
	      "position": "Junior Technical Author",
	      "office": "San Francisco",
	      "start_date": "12th Jan 09",
	      "salary": "$86,000"
	    },
	    {
	      "first_name": "Bradley",
	      "last_name": "Greer",
	      "position": "Software Engineer",
	      "office": "London",
	      "start_date": "13th Oct 12",
	      "salary": "$132,000"
	    },
	    {
	      "first_name": "Brenden",
	      "last_name": "Wagner",
	      "position": "Software Engineer",
	      "office": "San Francisco",
	      "start_date": "7th Jun 11",
	      "salary": "$206,850"
	    },
	    {
	      "first_name": "Brielle",
	      "last_name": "Williamson",
	      "position": "Integration Specialist",
	      "office": "New York",
	      "start_date": "2nd Dec 12",
	      "salary": "$372,000"
	    },
	    {
	      "first_name": "Bruno",
	      "last_name": "Nash",
	      "position": "Software Engineer",
	      "office": "London",
	      "start_date": "3rd May 11",
	      "salary": "$163,500"
	    },
	    {
	      "first_name": "Caesar",
	      "last_name": "Vance",
	      "position": "Pre-Sales Support",
	      "office": "New York",
	      "start_date": "12th Dec 11",
	      "salary": "$106,450"
	    },
	    {
	      "first_name": "Cara",
	      "last_name": "Stevens",
	      "position": "Sales Assistant",
	      "office": "New York",
	      "start_date": "6th Dec 11",
	      "salary": "$145,600"
	    },
	    {
	      "first_name": "Cedric",
	      "last_name": "Kelly",
	      "position": "Senior Javascript Developer",
	      "office": "Edinburgh",
	      "start_date": "29th Mar 12",
	      "salary": "$433,060"
	    }
	  ]
	}
 
	res.json(data1);
};

// module.exports.getAdd = function(req, res) {
// 	Station.find().then(function(stations){
// 		res.render('stations/add', {
// 			stations: stations
// 		});
// 	});
// };

// module.exports.postAdd = function(req, res) {
// 	console.log(req.body);
// 	// or, for inserting large batches of documents
// 	Station.insertMany(req.body, function(err) {
// 		if (err) return handleError(err);
// 	});
// 	res.redirect('/station');
// };

// module.exports.getEdit = function(req, res) {
// 	var id = req.params.id;
// 	Station.findById(id).then(function(station){
// 		res.render('stations/edit', {
// 			station: station
// 		});
// 	});
// };

// module.exports.postEdit = function(req, res) {
// 	var query = {"_id": req.params.id};
// 	var data = {
// 		"name" : req.body.name,
// 	    "description" : req.body.description,
// 	    "address" : req.body.address,
// 	    "information" : req.body.information,
// 	    "note" : req.body.note
// 	}
// 	console.log(query)
// 	Station.findOneAndUpdate(query, data, {'upsert':true}, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };

// module.exports.getDelete = function(req, res) {
// 	var id = req.params.id;
// 	Station.findByIdAndDelete(id, function(err, doc){
// 	    if (err) return res.send(500, { error: err });
// 	    res.redirect('/station');
// 	});

// };