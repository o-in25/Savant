(function() {
    // needs
    var mqtt = require('mqtt');
    var credentials = require('.././credentials.js');
    // credentials
    console.log('starting');
    // connect to the mqtt broker
    var client = mqtt.connect(credentials.data.url, {
        // cloudmqtt username and password
        username: credentials.data.username,
        password: credentials.data.password
    });
    // set the topic and then
    // publish a message to the topic
    client.on('connect', function () {
        // it was succesfull
        // subscribe to the counter
        client.subscribe('counter');
        console.log("Subscribed to counter...");
    });
    // recieve the message from the topic
    // and place the message into the database
    client.on('message', function (topic, message) {
        // if the topic received is the
        // the topic desired
        if (topic === 'counter') {
            // TODO INSERT INTO DATABASE
        } else {
            throw console.log('error');
        }
    });
});