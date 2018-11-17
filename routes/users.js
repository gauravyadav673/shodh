var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var User = require('../models/user')

const rp = require('request-promise');
const cheerio = require('cheerio')
var citation = require('../models/userData').citation;
/* GET users listing. */


function retrieveCitations(scholarID, username){
    var url = 'https://scholar.google.co.in/citations?user=' + scholarID;
    console.log(scholarID, username);
    rp(url)
      .then(function(html){
        var $ = cheerio.load(html);
        //console.log(html);
        var data = {};
        var contDiv = $('#gsc_rsb_st');
        var x=contDiv.children();
        var y = x[1].children;
        for(var i=0; i<y.length; i++){
            data[y[i].children[0].children[0].children[0].data] = y[i].children[1].children[0].data;
        }
        //console.log(data);

        var newCitation =  new citation({
            username:username,
            citaionCount:data["Citations"],
            hIndex:data["h-index"],
            iTenIndex:data["i10-index"]
        });
        newCitation.save(function(err, cit){
            if(err){
                console.log(err);
                return 1;                
            }
            return 0;

        });

      })
      .catch(function(err){
        console.log(err);
        return 1;
      });
}

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var scholarID = req.body.scholar_id;
    var password = req.body.password;
    if(req.file){
        var profileimage = req.file.filename;
    }else{
        var profileimage = 'noimage.jpg';
    }
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('scholar_id', 'Scholar ID is required').notEmpty();    
    req.checkBody('email', 'Email not correct').isEmail();
    req.checkBody('username', 'Userame field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Password not matching').equals(req.body.password);

    var errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors:errors
        });
    }else{
        console.log(name, email, username, scholarID, password);
        User.getUserByUsername(username, function(err, user){
            if(!user){
                var newUser = new User({
                   name: name,
                   email: email,
                   username: username,
                   scholarID:scholarID,
                   password: password,
                   profileimage: profileimage,
                   admin:false
                });
                User.createUser(newUser, function (err, user) {
                    if(err) throw err;
                    console.log(user);
                    //retrieve citations and indexes
                    retrieveCitations(scholarID, username);
                    req.flash('success', 'You are registered and can now login');
                    res.redirect('/users/login');
                });                
            }else{
                console.log(user);
                res.render('register');
            }
        });

    }
});

router.get('/login', function(req, res, next) {
    if(req.user)
        res.redirect('/addData');
    res.render('login', { title: 'Login' });
});

router.post('/login',
    passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: 'Invalid credentials'}),
    function(req, res) {
    req.flash('success', 'You are now logged in');

    res.redirect('/addData');
});

passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    })
});

passport.use(new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'Unknown User'});
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if(err) return done(err);
            if(isMatch){
                return done(null, user);
            }else{
                return done(null, false, {message:'Invalid Password'});
            }
        })
    })
}));

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/users/login');
});

module.exports = router;
