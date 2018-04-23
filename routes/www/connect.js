var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var credenitals = require('../service/credentials.json');
var db = require('mongodb').Db;
const url = credenitals.databaseUrl;


MongoClient.connect(url, function(err, dbobj) {
    if(err) {
        // connection failed
        console.log('ERROR!');
    } else {
        // connected to the database
        // find the collection and insert
        // the message in it
        var collection = dbobj.db('info').collection('counter_data');
        collection.find({}).toArray(function(err, data) {
            if(err) {
                // could not find
                throw err;
            } else {
                /* GET home page. */
                router.get('/', function(req, res, next) {
                    console.log(data);
                    res.render('connection', { message: data[0].counter});
                });
            }
        });
        collection.update({}, {$inc: {counter: 1}}, function(err, res) {
            if(err) {
                throw err;
            } else {
                console.log("Data updated...");
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
