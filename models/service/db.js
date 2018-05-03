    // the database and the url
    var express = require('express');
    const MongoClient = require('mongodb').MongoClient;
    var credenitals = require('./../credentials.json');
    var db = require('mongodb').Db;
    const url = credenitals.databaseUrl;

    // database object
    var _dbobj;
    module.exports = {
        connect: function(callback) {
             MongoClient.connect(url, function (err, dbobj) {
                 if (err) {
                  // connection failed
                  console.log('Error, connection failed...');
                } else {
                  // connected to the database
                  // find the collection and insert
                  // the message in it
                  _dbobj = dbobj;
                  callback();
                }
            });
        }, dbobj: function() {
                return _dbobj;
        }
    };

    /**


     // connect to the database
     // do what command when connected to the db
     function delegate(str, collection, data) {
        if(str == 'insert') { // INSERT NEW DATA
            // TODO INSERT INTO DATABASE

        } else if(str == 'find') { // GET THE COUNTER DATA
            // finds the value of the counter
            collection.find({}).toArray(function(err, res) {
                if(err) {
                    // could not find
                    throw err;
                } else {
                    // TODO RETRIEVE THE CURRENT COUNT
                    // var count = res
                    console.log("Data found...");
                    console.log(res);
                }
            });
        } else if(str == 'update') { // INCREMENT THE COUNTER
            // increments the value
            collection.update({}, {$inc: {counter: data}}, function(err, res) {
                if(err) {
                    throw err;
                } else {
                    console.log("Data updated...");
                }
            });
        }
    }

     var connectionPromise = new Promise(function(res, err) {
        var collection;
        MongoClient.connect(url, function(err, dbobj) {
            if(err) {
                // connection failed
                console.log('ERROR!');
            } else {
                // connected to the database
                // find the collection and insert
                // the message in it
                console.log('HERE');
                var temp = dbobj.db('info').collection('counter_data');
                // TODO DELEGATE THE FUNCTION
                // var count = res
                dbobj.close();
                collection = temp;
            }
        });
        if(collection) {
            res(collection);
        } else {
            err();
        }
    });
     // accept

     connectionPromise.then(function(collection) {
        collection.find({}).toArray(function(err, res) {
            if(err) {
                // could not find
                throw err;
            } else {
                // TODO RETRIEVE THE CURRENT COUNT
                // var count = res
                console.log("Data found...");
                console.log(res);
            }
        });
    }).catch(function() {
        console.log('error');
    });







     **/