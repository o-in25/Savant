
// will get the value of the publication
(function() {
    // needs
    var mqtt = require('mqtt');
    var credentials = require('.././credentials.json');
    // credentials

    console.log('starting');
    // connect to the mqtt broker
    var client = mqtt.connect(credentials.data.url, {
        // cloudmqtt username and password
        username: credentials.username,
        password: credentials.password
    });

    // set the topic and then
    // publish a message to the topic
    client.on('connect', function () {
        console.log("Published topic counter...");
        // TODO PUBLISH DEVICE DATA
        client.publish('web', null)
    });

})();
