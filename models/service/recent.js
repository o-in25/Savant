var express = require('express');
var db = require('mongodb').Db;
var util = require('./db.js');

// returns the value (count)
// of the counter data collection
module.exports = {
    // get the collection counter_table
    recent: function() {
        // create tge promise
        return new Promise(function(resolve, reject) {
            util.connect(function() {
                // get the dbobj
                var dbobj = util.dbobj();


                // db.getCollection('COLLECTION_NAME').find().skip(db.getCollection('COLLECTION_NAME').count()-N)

                // find the collection 'counter data'
                // only document in the collection
                dbobj.db('info').collection('users').find().sort({ $natural: -1 }).limit(5).toArray(function(err, res) {
                    if(err) {
                        console.log('The collection could not be found...');
                        // failed
                        reject();
                    } else {
                        // success
                        console.log('success');
                        resolve(res);
                    }
                });
            });
        }).then(function(collection) {
            // get the specific value
            return new Promise(function(resolve, reject) {
                if(typeof collection != 'undefined') {
                    // return the value 'counter'
                    resolve(collection);
                } else {
                    reject();
                }
            });
        });
    },
};

