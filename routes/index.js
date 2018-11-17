var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
 	res.render('index', { title: 'Members' });
});

router.get('/addData', ensureAuthenticated, (req, res, next) => {
	console.log(req.user.username);
	res.render('addData', {'title': 'Add Data'});
});

router.get('/profile', ensureAuthenticated, (req, res, next) => {
	console.log(req.user.username);
  res.render('profile', {'title': 'Profile'});
});

function ensureAuthenticated(req, res, next) {
	//console.log(req.user);
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
