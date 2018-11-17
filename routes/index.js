var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	console.log(req);
  res.render('index', { title: 'Members' });
});

function ensureAuthenticated(req, res, next) {
	console.log(req.user);
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
