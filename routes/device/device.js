var gpio = require('pi-gpio');
const PIN = 7;

gpio.open(PIN, 'input', function(err) {
    if(err) {
        throw err;
    } else {
        this.read(PIN, function(err, val) {
            if(err) {
                throw err;
            } else {
                console.log(val);
            }
        });
    }
});