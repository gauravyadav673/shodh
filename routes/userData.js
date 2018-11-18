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
	var year = new Date(startDate).getYear();
	var duration = req.body.duration;
	if(name && userName && sponsor && grant && venue && startDate && endDate){
		var newOrganised = new organised({
			username:userName,
			eventName:name,
			sponsor:sponsor,
			grant:grant,
			venue:venue,
			startDate:startDate,
			endDate:endDate,
			duration:duration,
			year:year
		});
		newOrganised.save(function(err, organised){
			if(err){
				console.log(err)
				req.flash('failure', 'Try Later');
			}else{
				req.flash('success', 'Saved Successfully');
			}
			res.redirect('/addData');
		});
	}else{
		req.flash('failure', 'InComplete Data');
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
	var year = new Date(startDate).getYear();
	if(name && userName && sponsor && venue && startDate && endDate){
		var newAttended = new attended({
			username:userName,
			eventName:name,
			sponsor:sponsor,
			venue:venue,
			startDate:startDate,
			endDate:endDate,
			duration:duration,
			year:year
		});
		newAttended.save(function(err, attended){
			if(err){
				console.log(err)
				req.flash('failure', 'Try Later');
			}else{
				req.flash('success', 'Saved Successfully');
			}
			res.redirect('/addData');
		});
	}else{
		req.flash('failure', 'InComplete Data');
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
	var year = new Date(startDate).getYear();
	console.log(username, name, sponsor, grant, description, startDate, endDate);
	if(username && name && sponsor && grant && description && startDate && endDate){
		var newProject = new proj({
			username:username,
			name:name,
			sponsor:sponsor,
			grant:grant,
			description:description,
			startDate:startDate,
			endDate:endDate,
			year:year
		});
		newProject.save(function(err, project){
			if(err){
				console.log(err)
				req.flash('failure', 'Try Later');
			}else{
				req.flash('success', 'Saved Successfully');
			}
			res.redirect('/addData');
		});
	}else{
		req.flash('failure', 'InComplete Data');
		res.redirect('/addData');
	}

});

router.post('/patent', ensureAuthenticated, function(req, res, next){

	var userName = req.body.userName;
	var name = req.body.patentName;
	var patentNumber = req.body.patentNumber;
	var description = req.body.description;
	var date = req.body.date;
	var year = new Date(date).getYear();
	console.log(userName, name, patentNumber, description, date);
	if(userName && name && patentNumber && description && date){
		var newPatent = new patent({
			username:userName,
			name:name,
			patentNumber:patentNumber,
			description:description,
			dateOfPatent:date,
			year:year
		});
		newPatent.save(function(err, patent){
			if(err){
				console.log(err)
				req.flash('failure', 'Try Later');
			}else{
				req.flash('success', 'Saved Successfully');
			}
			res.redirect('/addData');
		});
	}else{
		req.flash('failure', 'InComplete Data');
		res.redirect('/addData');
	}
});


////////***** Getters Start*****/////////

router.get('/profile', ensureAuthenticated, function(req, res, next){
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

///// next one not completed yet

router.post('/dataByYear', ensureAuthenticated, function(req, res, next){
	if(req.user.admin){
		var year = req.body.year - 1900;
		var patents, projects, eventsOrganised, eventsAttended, citations;
		proj.find({year:year}, function(err, project){
			if(!err){
				projects = project;
			}
			attended.find({year:year}, function(err, attend){
				if(!err){
					eventsAttended = attend;
				}
				patent.find({year:year}, function(err, pat){
					if(!err){
						patents = pat;
					}
					citation.find({year:year}, function(err, cit){
						if(!err){
							citations = cit;
						}
						organised.find({year:year}, function(err, organise){
							if(!err){
								eventsOrganised = organise;
							}
						console.log(patents, projects, eventsOrganised, eventsAttended, citations);
						res.render('yearRes', {citations: citations, patents:patents, attended:eventsAttended, organised:eventsOrganised, projects:projects});
						})

					});
				});

			});

		});
	}else{
		res.redirect('/addData');
	}
});


router.post('/dataByName', ensureAuthenticated, function(req, res, next){
	if(req.user.admin){
		var username = req.body.username;
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
		res.redirect('/data/addData');
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
