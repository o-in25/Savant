var express = require('express');
var router = express.Router();
var getCounterService = require('../../models/service/get.js');

getCounterService.get('/', function(req, res, next) {
    // get the count
    util.getCounterDataCollection().then(function(data){
        res.render('connection', {message: data});
    }, function(err){
        throw err;
    });
});
module.exports = router;

