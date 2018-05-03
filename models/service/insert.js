var express = require('express');
var db = require('mongodb').Db;
var util = require('./db.js');

// returns the counter_data collection
module.exports = {
    // get the collection counter_table
    getCounterDataCollection: function() {
        // create tge promise
        return new Promise(function(resolve, reject) {
            util.connect(function() {
                // get the dbobj
                var dbobj = util.dbobj();
                // find the collection 'counter data'
                dbobj.db('info').collection('counter_data').find({}).toArray(function(err, res) {
                    if(err) {
                        console.log('The collection could not be found...');
                        // failed
                        reject();
                    } else {
                        // success
                        resolve(res);
                    }
                });
            })
        }).then(function(collection) {
            return new Promise(function(resolve, reject) {
                if(typeof collection != 'undefined') {
                    // return the value 'counter'
                    resolve(collection[0].counter);
                } else {
                    reject();
                }
            });
        });
    }
};
