var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var credenitals = require('.././credentials.json');


MongoClient.connect(url, function(err, dbobj) {
    if(err) {
        // connection failed
        console.log('ERROR!');
    } else {
        // connected to the database
        // find the collection and insert
        // the message in it
        var collection = dbobj.db('info').collection('counter_data');
        collection.update({}, {$inc: {counter: 1}}, function(err, res) {
            if(err) {
                throw err;
            } else {
                console.log("Data updated...");
                var promise = new Promise(function(resolve, reject) {
                    var done = false;
                    if(!done) {
                        resolve();
                    } else {
                        reject();
                    }
                });

                promise.then(function(val) {

                });

            }
        });
        // var count = res
        dbobj.close();
    }
});


module.exports = router;
/**
 * Created by o_in25 on 4/11/18.
 */
