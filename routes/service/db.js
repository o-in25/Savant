// the database and the url
const MongoClient = require('mongodb').MongoClient;
var credentials = require('./credentials.js');
var db = require('mongodb').Db;
const url = credentials.data.databaseUrl;
// connect to the database


// do what command when connected to the db
function delegate(str, collection, data) {
     if(str == 'insert') { // INSERT NEW DATA
         // if info is needed to be inserted
     } else if(str == 'find') { // GET THE COUNTER DATA
         // finds the value of the counter
         collection.find({}).toArray(function(err, res) {
             if(err) {
                 // could not find
                 throw err;
             } else {
                 // we found the result
                 // do something with the result
                 // var count = res
                 console.log(res);
             }
         });
    } else if(str == 'update') { // INCREMENT THE COUNTER
         // increments the value
         collection.update({}, {$inc: {counter: 1 }}, function(err, res) {
             if(err) {
                 throw err;
             } else {
                 console.log("inserted");
             }
         });
     }
}



MongoClient.connect(url, function(err, dbobj) {
    if(err) {
        // connection failed
        console.log('ERROR!');
    } else {
        // connected to the database
        // find the collection and insert
        // the message in it
        var collection = dbobj.db('info').collection('counter_data');
        // now that the table counter_data is found
        // get the elements from it
        collection.find({}).toArray(function(err, res) {
            if(err) {
                // could not find
                throw err;
            } else {
                delegate('find', collection, 1);
                delegate('update', collection, 1);
                delegate('find', collection, 1);
                // var count = res
                dbobj.close();
            }
        });
    }
});

