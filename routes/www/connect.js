var express = require('express');
var router = express.Router();
var util = require('../../models/service/count.js');
var inc = require('../../models/service/increment.js');

router.get('/', function(req, res, next) {
    console.log('HERE!!!!!!!!!!!');
    var recent = require('../../models/service/recent');
    var calc = require('../../helpers/logic/calculate');
    recent.recent().then(function(result) {
            if(calc.solve(result, 1000)) {
                inc.updateCounterCollection().then(console.log('updated'));
            }
        }).catch(console.log('error'));
    // get the count
    util.getCounterDataCollection().then(function(data){
        // the route
        res.render('connection', {message: data});
    }, function(err) {
        throw err;
    });
    res.render('connection', {message: data});

});
module.exports = router;

