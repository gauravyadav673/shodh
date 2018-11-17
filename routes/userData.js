var express = require('express');
var router = express.Router();

var attended = require('../models/userData').attended;
var organised = require('../models/userData').organised;
var patent = require('../models/userData').patent;
var project = require('../models/userData').project;

router.post('/organised', ensureAuthenticated, function(req, res, next){
	var name = req.body.name;
	var userName = req.user.userName;
	var sponsor = req.body.sponsor;
	var grant = req.body.grant;
	var venue = req.body.venue;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var duration = req.body.duration;

/*    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('sponsor', 'Sponsor field is required').notEmpty();
    req.checkBody('grant', 'Grant field is required').notEmpty();
    req.checkBody('venue', 'Venue field is required').notEmpty();
    req.checkBody('startDate', 'Start Date is required').notEmpty();
    req.checkBody('endDate', 'End Date is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.redirect('/');
    }else{
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
			res.redirect('/');
		});
    }
*/
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
			res.redirect('/');
		});
	}else{
		res.redirect('/');
	}
});

router.post('/attended', ensureAuthenticated, function(req, res, next){
	var name = req.body.name;
	var userName = req.user.userName;
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
			res.redirect('/');
		});
	}else{
		res.redirect('/');
	}
});

router.post('/patent', ensureAuthenticated, function(req, res, next){
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
			res.redirect('/');
		});
	}else{
		res.redirect('/');
	}
});

router.post('/project', ensureAuthenticated, function(req, res, next){
	var username = req.user.username;
	var name = req.body.projectName;
	var sponsor = req.body.sponsor;
	var grant = req.body.grant;
	var description = req.body.description;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;

/*    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('sponsor', 'Sponsor field is required').notEmpty();
    req.checkBody('grant', 'Grant field is required').notEmpty();
    req.checkBody('description', 'Description field is required').notEmpty();
    req.checkBody('startDate', 'Start Date is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.redirect('/');
    }else{
		var newProject = new project({
			username:username,
			name:name,
			sponsor:sponsor,
			grant:grant,
			description:description,
			startDate:startDate,
			endDate:endDate
		});
    	newProject.save(function(err, project){
    		res.redirect('/');
		});
    }
*/
	if(username && name && sponsor && grant && description && startDate && endDate){
		var newProject = new project({
			username:username,
			name:name,
			sponsor:sponsor,
			grant:grant,
			description:description,
			startDate:startDate,
			endDate:endDate
		});
		newProject.save(function(err, project){
			res.redirect('/');
		});
	}else{
		res.redirect('/');
	}

});

function ensureAuthenticated(req, res, next) {
	// console.log(req.user);
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
