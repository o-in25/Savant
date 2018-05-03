// needs
var mqtt = require('mqtt');


var credentials = {
    "username": "hzkmxdat",
    "password": "nLs3hY5o4BcU",
    "url": "mqtt://m13.cloudmqtt.com:10766",
    "databaseUrl": "mongodb://ehalligan12:Texanol12@ds021943.mlab.com:21943/info"
};



// credentials
console.log('starting');
// connect to the mqtt broker
var client = mqtt.connect(credentials.url, {
    // cloudmqtt username and password
    username: credentials.username,
    password: credentials.password
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
        console.log(message.toString());
        // TODO INSERT INTO DATABASE
    } else {
        throw console.log('error');
    }
});