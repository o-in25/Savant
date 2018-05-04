var express = require('express');
var db = require('mongodb').Db;
var util = require('./db.js');

// returns the counter_data collection
module.exports = {
    insertData: function (data) {
        util.connect(function () {
            // get the dbobj
            var dbobj = util.dbobj();
            // find the collection 'counter data'
            dbobj.db('info').collection('users').insertOne(data, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                }
            })
        });
    }
};

