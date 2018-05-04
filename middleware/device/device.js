//publishes to the device
const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
    io: new Raspi(),
    repl: false,
    debug: false
});
// pin
const PIN = 'GPIO4';
var mqtt = require('mqtt');

board.on('ready', function() {

    // create the client
    var client = mqtt.connect('mqtt://m13.cloudmqtt.com:10766', {
        // cloudmqtt username and password
        username: 'hzkmxdat',
        password: 'nLs3hY5o4BcU'
    });

    // on connect publlish
    client.on('connect', function () {
        // TODO PUBLISH DEVICE DATA
        board.digitalRead(PIN, function(val) {
            var date = new Date();
            var data = {
                day: '' + date.getDay(),
                month: '' + date.getMonth(),
                year: '' + date.getYear(),
                hour: '' + date.getHours(),
                minutes: '' + date.getMinutes(),
                seconds: '' + date.getSeconds(),
                milliseconds: '' + date.getMilliseconds()
            };
            client.publish('counter', JSON.stringify(data));
        })
    });
});