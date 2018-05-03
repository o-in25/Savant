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
                     throw err;
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

