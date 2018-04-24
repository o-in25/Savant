var gpio = require('pi-gpio');
const PIN = 7;

gpio.close(PIN, function() {
    console.log("closed");
});
gpio.open(PIN, 'input', function(err) {
    if(err) {
        throw err;
    } else {
        gpio.read(PIN, function(err, val) {
            if(err) {
                throw err;
            } else {
                console.log(val);
            }
        });
    }
    gpio.close(PIN, function() {
        console.log("closed");
    });
});