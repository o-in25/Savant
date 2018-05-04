var express = require('express');
var router = express.Router();
var util = require('../../models/service/count.js');
var inc = require('../../models/service/increment.js');
var toggle = false;

router.get('/', function(req, res, next) {
    var recent = require('../../models/service/recent');
    var calc = require('../../helpers/logic/calculate');

    /**
     recent.recent().then(function(result) {
            if(calc.solve(result, 1000)) {
                inc.updateCounterCollection().then(console.log('updated'));
            }
        }).catch(console.log('!'));
     **/

    if(toggle == false) {
        inc.updateCounterCollection().then(console.log('updated'));
        toggle = true;

    } else {
        toggle = false;
    }
    // get the count
    util.getCounterDataCollection().then(function(data){
        // the route

        res.render('connection', {message: data});

    }, function(err) {
        throw err;
    });

});
module.exports = router;

