var express = require('express');
var router = express.Router();

var util = require('../../models/service/db.js');

router.get('/', function(req, res, next) {
    util.connect(function() {
        // get the dbobj
        console.log('called');
        var dbobj = util.dbobj();
        // find the collection 'counter data'
        dbobj.db('info').collection('counter_data').update({}, {$inc: {counter: 1}}, function (err, resu) {
            if (err) {
                throw err;
            } else {
                console.log("Data updated... " + resu);
                res.render('update', {});
            }
        });
    });

});
module.exports = router;

