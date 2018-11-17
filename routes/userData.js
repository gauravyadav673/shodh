var express = require('express');
var router = express.Router();

var attended = require('../models/userData').attended;
var organised = require('../models/userData').organised;
var patent = require('../models/userData').patent;

router.post('/organised', function(req, res){
	var name = req.body.name;
	var userName = req.body.userName;
	var sponsor = req.body.sponsor;
	var grant = req.body.grant;
	var venue = req.body.venue;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var duration = req.body.duration;
	if(name && userName && sponsor && grant && venue && startDate && endDate && duration){
		var newOrganised = new organised({
			userName:userName,
			eventName:name,
			sponsor:sponsor,
			grant:grant,
			venue:venue,
			startDate:startDate,
			endDate:endDate,
			duration:duration
		});
		newOrganised.save(function(err, organised){
			if(err){
				res.send({'code':1});
			}else{
				res.send({'code':0});
			}
		});
	}else{
		res.send({'code':2});
	}
});

router.post('/attended', function(req, res){
	var name = req.body.name;
	var userName = req.body.userName;
	var sponsor = req.body.sponsor;
	var venue = req.body.venue;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var duration = req.body.duration;
	if(name && userName && sponsor && venue && startDate && endDate && duration){
		var newAttended = new attended({
			userName:userName,
			eventName:name,
			sponsor:sponsor,
			venue:venue,
			startDate:startDate,
			endDate:endDate,
			duration:duration
		});
		newAttended.save(function(err, attended){
			if(err){
				res.send({'code':1});
			}else{
				res.send({'code':0});
			}
		});
	}else{
		res.send({'code':2});
	}
});

router.post('/patent', function(req, res){
	var userName = req.body.userName;
	var name = req.body.patentName;
	var patentNumber = req.body.patentNumber;
	var description = req.body.description;
	var date = req.body.date;
	console.log(userName, name, patentNumber, description, date);
	if(userName && name && patentNumber && description && date){
		var newPatent = new patent({
			username:userName,
			name:name,
			patentNumber:patentNumber,
			description:description,
			dateOfPatent:date
		});
		newPatent.save(function(err, patent){
			if(err){
				console.log(err);
				res.send({'code':1});
			}else{
				res.send({'code':0});
			}
		});
	}else{
		res.send({'code':2});
	}
});


module.exports = router;