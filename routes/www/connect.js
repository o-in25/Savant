var express = require('express');
var router = express.Router();
var util = require('../../models/service/get.js');

router.get('/', function(req, res, next) {
    // get the count
    util.getCounterDataCollection().then(function(data){
        // the route
        res.render('connection', {message: data});
    }, function(err) {
        throw err;
    });
});
module.exports = router;

