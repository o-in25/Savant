var db = require('mongodb').Db;
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    email: String
});

var User = mongoose.model('myUser', schema);






module.exports = {user: User};