var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  // req.user.admin = true;
 	res.redirect('/users/login');
});

router.get('/addData', ensureAuthenticated, (req, res, next) => {
   //req.user.admin = true;
	console.log(req.user.username);
	res.render('addData', {title: 'Add Data', name: req.user.username});
});

/*router.get('/profile', ensureAuthenticated, (req, res, next) => {
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
});*/

router.get('/admin', ensureAuthenticated, (req, res, next) => {
  // req.user.admin = true;
  res.render('admin', {'title': 'Admin Zone'});
});

router.get('/yearwise', ensureAuthenticated, (req, res, next) => {
  // req.user.admin = true;
  res.render('yearwiseResults', {'title': 'Search By Year'});
});

function ensureAuthenticated(req, res, next) {
	//console.log(req.user);
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
