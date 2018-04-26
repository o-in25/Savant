const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({io: new Raspi()});
const PIN = 'GPIO4';

'use strict';

board.on('ready', function() {
    this.digitalRead(PIN, function(val) {
        console.log(val);
        // TODO GET DEVICE DATA
    });
});