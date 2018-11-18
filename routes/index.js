var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  req.user.admin = true;
 	res.render('profile', { title: 'Profile' });
});

router.get('/addData', ensureAuthenticated, (req, res, next) => {
  req.user.admin = true;
	console.log(req.user.username);
	res.render('addData', {'title': 'Add Data', 'name': req.user.username});
});

router.get('/profile', ensureAuthenticated, (req, res, next) => {
	console.log(req.user.username);
  req.user.admin = true;
  res.render('profile', {'title': 'Profile'});
});

router.get('/admin', ensureAuthenticated, (req, res, next) => {
  req.user.admin = true;
  res.render('admin', {'title': 'Admin Zone'});
});

router.get('/yearwise', ensureAuthenticated, (req, res, next) => {
  req.user.admin = true;
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
