var express = require('express');
var router = express.Router();


var proj = require('../models/userData').proj;
var attended = require('../models/userData').attended;
var organised = require('../models/userData').organised;
var patent = require('../models/userData').patent;
var citation = require('../models/userData').citation;

router.post('/organised', ensureAuthenticated, function(req, res, next){
	var name = req.body.name;
	var userName = req.body.userName;
	var sponsor = req.body.sponsor;
	var grant = req.body.grant;
	var venue = req.body.venue;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var duration = req.body.duration;

	if(name && userName && sponsor && grant && venue && startDate && endDate){
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
			res.redirect('/addData');
		});
	}else{
		res.redirect('/addData');
	}
});

router.post('/attended', ensureAuthenticated, function(req, res, next){
	var name = req.body.name;
	var userName = req.body.userName;
	var sponsor = req.body.sponsor;
	var venue = req.body.venue;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var duration = req.body.duration;
	if(name && userName && sponsor && venue && startDate && endDate){
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
			res.redirect('/addData');
		});
	}else{
		res.redirect('/addData');
	}
});

router.post('/project', ensureAuthenticated, function(req, res, next){
	var username = req.body.userName;
	var name = req.body.projectName;
	var sponsor = req.body.sponsor;
	var grant = req.body.grant;
	var description = req.body.description;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	console.log(username, name, sponsor, grant, description, startDate, endDate);
	if(username && name && sponsor && grant && description && startDate && endDate){
		var newProject = new proj({
			username:username,
			name:name,
			sponsor:sponsor,
			grant:grant,
			description:description,
			startDate:startDate,
			endDate:endDate
		});
		newProject.save(function(err, project){
			if(err)
				console.log(err);
			res.redirect('/addData');
		});
	}else{
		res.redirect('/addData');
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
			if(err)
				console.log(err);
			res.redirect('/addData');
		});
	}else{
		res.redirect('/addData');
	}
});


////////***** Getters Start*****/////////

router.get('/getData', ensureAuthenticated, function(req, res, next){
		var username = req.user.username;
		var patents, projects, eventsOrganised, eventsAttended, citations;
		proj.find({username:username}, function(err, project){
			if(!err){
				projects = project;
			}
			attended.find({username:username}, function(err, attend){
				if(!err){
					eventsAttended = attend;
				}
				patent.find({username:username}, function(err, pat){
					if(!err){
						patents = pat;
					}
					citation.find({username:username}, function(err, cit){
						if(!err){
							citations = cit;
						}
						organised.find({username:username}, function(err, organise){
							if(!err){
								eventsOrganised = organise;
							}
						console.log(patents, projects, eventsOrganised, eventsAttended, citations);
						res.render('profile', {citations: citations, patents:patents, attended:eventsAttended, organised:eventsOrganised, projects:projects});
						})

					});	
				});			

			});

		});
});


router.get('/dataByYear', ensureAuthenticated, function(req, res, next){
	if(req.user.admin){
		var year = req.params.year;
		var patents, projects, eventsOrganised, eventsAttended, citations;
		proj.find({username:username}, function(err, project){
			if(!err){
				projects = project;
			}
			attended.find({username:username}, function(err, attend){
				if(!err){
					eventsAttended = attend;
				}
				patent.find({username:username}, function(err, pat){
					if(!err){
						patents = pat;
					}
					citation.find({username:username}, function(err, cit){
						if(!err){
							citations = cit;
						}
						organised.find({username:username}, function(err, organise){
							if(!err){
								eventsOrganised = organise;
							}
						console.log(patents, projects, eventsOrganised, eventsAttended, citations);
						res.render('profile', {citations: citations, patents:patents, attended:eventsAttended, organised:eventsOrganised, projects:projects});
						})

					});	
				});			

			});

		});
	}else{
		res.redirect('/addData');
	}
});


router.get('/dataByName', ensureAuthenticated, function(req, res, next){
	if(req.user.admin){
		var username = req.params.user;
		var patents, projects, eventsOrganised, eventsAttended, citations;
		proj.find({username:username}, function(err, project){
			if(!err){
				projects = project;
			}
			attended.find({username:username}, function(err, attend){
				if(!err){
					eventsAttended = attend;
				}
				patent.find({username:username}, function(err, pat){
					if(!err){
						patents = pat;
					}
					citation.find({username:username}, function(err, cit){
						if(!err){
							citations = cit;
						}
						organised.find({username:username}, function(err, organise){
							if(!err){
								eventsOrganised = organise;
							}
						console.log(patents, projects, eventsOrganised, eventsAttended, citations);
						res.render('profile', {citations: citations, patents:patents, attended:eventsAttended, organised:eventsOrganised, projects:projects});
						})

					});	
				});			

			});

		});
	}else{
		res.redirect('/addData');
	}
});

////////***** Getters End******////////


function ensureAuthenticated(req, res, next) {

    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
