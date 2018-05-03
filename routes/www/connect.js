var express = require('express');
var router = express.Router();
var util = require('../../models/service/count.js');
var inc = require('../../models/service/increment.js');

router.get('/', function(req, res, next) {

    var recent = require('../../models/service/recent');
    var calc = require('../../helpers/logic/calculate');

    var incremented = function() {
        recent.recent().then(function(result) {
            return calc.solve(result, 500);
        });
    };
    var resi = incremented();
    if(resi == true) {
        inc.updateCounterCollection().then(console.log('updated'));
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

