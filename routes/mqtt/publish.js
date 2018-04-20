

// will get the value of the publication
(function() {
    // needs
    var mqtt = require('mqtt');
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
        console.log("MQTT connection succesfull...");
        // the topic
        client.subscribe('web');
        client.publish('web', 'hey im the device')
    });

    // recieve the message from the topic
    // and place the message into the database
    client.on('message', function (topic, message) {
        // if the topic received is the
        // the topic desired
        if (topic === 'web') {
            // message
        } else {
            throw console.log('error');
        }
    });


})();
