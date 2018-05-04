var express = require('express');
var db = require('mongodb').Db;
var util = require('./db.js');

module.exports = {
    updateCounterCollection: function() {
        return new Promise(function(resolve, reject) {
            util.connect(function() {
                util.dbobj().db('info').collection('counter_data').update({}, {$inc: {counter: 1}}, function(err, res) {
                    if(err) {
                        // reject
                        reject();
                    } else {
                        console.log("Data updated...");
                        // success
                        resolve(res);
                    }
                });
            }).then(function(collection) {
                return new Promise(function(resolve, reject) {
                    if(typeof collection != 'undefined') {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        });
    }
};