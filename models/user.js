var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/shodh');
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    scholarID:{
        type:String
    },
    profileimage:{
        type:String
    },
    admin:{
        type:Boolean
    }
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function (loginPassword, hash, callback) {
    bcrypt.compare(loginPassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
