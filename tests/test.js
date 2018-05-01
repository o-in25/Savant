var collection = require('../models/service/get.js');
collection.getCounterDataCollection().then(function(data){
    console.log(data)
}, function(err){
    throw err;
}) ;