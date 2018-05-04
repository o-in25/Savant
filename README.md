# Savant
Savant is an IoT tool used for your home. Savant tracks the people entering and exiting, estimates how many people are in your home, and use that information to adjust lighting, music, temperature, and much more.

helpers - contain help functions

middleware - the pi device code

models
~/mqtt - contains mqtt info
~/service - contains db info  
routes 
~/ www - html routers
~/index.js
 tests - tests 
 views  
 ~/ stylesheets - scss/css
 ~/html files
 
 
 # Blog Post#
 ### Introduction ##
 Savant is an IoT tool used for your home. Savant tracks the people entering and exiting, estimates how many people are in your home, and use that information to adjust lighting, music, temperature, and much more. 
 
 Since moving to our campus house this past August, I, for the first time in my life, had to bear the cost of electrical utilities. As such, my roommates and I have always regard the topic of reducing energy consumption as a daily conversation. To help combat this problem our house has many sensor-activated lights, which go off when there is no presence, but turn on when the opposite is the case. However, one must then always choose the dichotomy of having the lights on or off. Perhaps it could be better if there was a way to detect the amount of people in the room, and dimming the lights accordingly. This is what Savant encompasses; Savant is a device – a laser IR sensor – that detecs the amount of people in the room, but in a much more intuitive way. 
 
 Rather than simply employing a counter, and when the counter reaches a sufficient point, the Savant then dims the light incrementally or decrementally, the Savant technology factors in the time, date, and perhaps even occasion, and dim the lights accordingly by some factor. Additionally – besides solving our problems of choosing between too much and too little light, up to the will of the sensors – Savant could change the color of the lighting, as well as being able to change the music being played to fit an occasion. (for example, a few people on a week day night may employ a different style of lighting and music than say a social gathering on Saturday night).
 
 Savant is connected to the internet and publishes a MQTT response. The Savant API, recognizes this MQTT request, stores it in a NoSQL database, and implements Express/Handlebars to display the data.
 
 ### Building Savant ##
 You will need...
 ****1.**** Raspberry Pi 3 B/B+ ($35)
 ****2.**** NodeMCU/Arduino Microcontroller ($10)
 ****3.**** IR Sensor ($15)
 ****3.**** 2 Breadboards ($5 x 2)
 ****4.**** 2 Micro-USB chargers
 ****5.**** 2 Female-to-Female GPIO pins
 ****6.**** 2 Male-to-Male GPIO pins
 ****7.**** 3 Breadboard connectors
 ****8.**** > 8 GB Micro-SD card ($10)
 ****8.**** Patience
 
 
 For the right side of the sensor, exclusively for light, the the IR light sensor is placed in the NodeMCU. There, the 2 male-to-male pins connect into the NodeMCU as well as the Micro-USB. On the other side, for the actual sensor, the power, ground, and GPIO pins are connected via the breadboard connectors. From there, the female-to-femail pins connect it to the Rasberry Pi, as well as the Micro-USB and Mini-SD

 ### Code ###
 First, connect the Raspberry Pi to the internet via SSH. There are many great tuitorials out there to do so, but I recommend this one: https://www.losant.com/blog/getting-started-with-the-raspberry-pi-zero-w-without-a-monitor
 
 Savant uses Node.js is used, with Express and Handlebars. NPM uses the Johny-Five GPIO for the Raspberry Pi; documentation can be found here: http://johnny-five.io/examples/raspi-io/. To publish the data from the PI, MQTT is used - I recommend CloudMQTT https://www.cloudmqtt.com - and MongoDB to store the information in a database. 
   
### Building Savant ###
## 1. Connect The Connectors ##
First, add the breadboard connectors to the IR sensors. Add 1 to the power and ground on the NodeMCU side, and 2 on the Raspberry Pi side: one for power/ground, one for GPIO
![image tooltip here](/docs/imgs/p1.png)

## 2. Put Them In Their Place ##
Since breadboards distribute power laterally, place the NodeMCU side IR on either (29,a) and (28,b) or (29, i) and (28, j).
![image tooltip here](/docs/imgs/p2a.png)

Next, connect the male-to-male pins on any pins DIRECTLY paralell to where you place them pior. Refer to this diagram is confusion arrises.
![image tooltip here](/docs/imgs/p2b.png)

Finally, connect the other end into the NodeMCU slots "VIM" and "GND" which will be on (1, j) and (2,j) for 5V (Recommended). If you choose to opt with 3V, place them in the exact same way, but on the other side of the NodeMCU. For this tuitorial, 5V will be choosen.
![image tooltip here](/docs/imgs/p2c.png)

We are done with the NodeMCU side (for now). Now, onto the Rasoberry Pi.

Similarly to the NodeMCU, place the power/ground pins to either (29,a) and (28,b) or (29, i) and (28, j).
![image tooltip here](/docs/imgs/p2d.png)

Then, place the ground/power pins DIRECTLY paralell, just as before.
![image tooltip here](/docs/imgs/p2e.png)

Then, pick any other pin not in the row of 28 or 29, and place the GPIO connector. For our purposes, we will choose the one directly 1 down.
![image tooltip here](/docs/imgs/p2f.png)

Just as before, hook the wires up to achieve the following:
![image tooltip here](/docs/imgs/p2g.png)

Finally, connect the pins into your Raspberry Pi GPIO slots via a pinout model. If you elected to use a Raspberry Pi 3 B, here it is for you.
![image tooltip here](/docs/imgs/p2g.png)

Consult the diagram and place the pins. The final result should go as follows.
![image tooltip here](/docs/imgs/p2g.png)

Great! We are now ready to get started.

## 2. Above The Clouds ##
Now it is time to install some software on the device. First, get signed up with a CloudMQTT (recommended) account. Here's a link for convenience: https://customer.cloudmqtt.com/login

Once created, open up a new Node.js/Express app, and add the dependency.
```
npm install mqtt
```
Then, create a file called subscribe.js. Here, this is where the publish requests will be subscribed to. The Raspberry Pi will publish the requests, and here is where they are recieved. If you are using Express, export your functions in an object. You will set the topic later on, so enter it here now. You can name it any valid string - though it would behoove you to choose something meaningful
```
// needs
var mqtt = require('mqtt');
var db = require('../service/insert.js');

module.exports = {
    subcribe: function() {
        // credentials
        // connect to the mqtt broker
        var client = mqtt.connect(/* YOUR URL */, {
            // cloudmqtt username and password
            // username: YOUR USERNAME
            // password: YOUR PASSWORD
        });
           // set your topic and then
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
                // 
                // TOPIC REIEVED!
                //

            } else {
                    throw console.log('error');
            }
        });
    }
};
```
Next, create a file called device.js. This file will live on your Raspberry Pi, and will be executed when the device powers on. First, install the dependencies: Raspi-IO, which is a Node.js library for the Raspberry Pi and Johnny-Five, an IOT library loaded with useful features.
```
npm install raspi-io
npm insall johnny-five
```

When the IR sensor has data, a stream of 1 and 0 is outputted. When there is no binary stream, that signifies the beam as been broken - hopefully due to someone walking by and not a hardware malfuction from the GPIO wires being frayed (hence the use of the connectors). Therefore, we need to get the exact the each 1 or 0 comes in. Then, when the next 0 or 1 comes in, if the time it comes in is much larger than the one previously - the wire has been tripped. To do this, wait for the board to be ready. When it is ready, create an MQTT client with the exact same credentials as before. Then, when the client has connected to CloudMQTT, wait for the board to change state. When it has, get the date information of that state change (i.e. a new 1 or 0). That is outlined here:
```
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
    var client = mqtt.connect(/* YOUR URL */, {
        // cloudmqtt username and password
        username: // YOUR USERNAME
        password: // YOUR PASSWORD
    });

    // on connect publish
    client.on('connect', function () {
        // TODO PUBLISH DEVICE DATA
        board.digitalRead(PIN, function(val) {
            var date = new Date();
            var data = {
            
                 // Prevent type coersion by using 
                 // '' + ...
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
```

Now, the device is ready to send a JSON object which has the the date information of every new incomming 1 or 0. On the other machine, we can now accept these new JSON files, having the time and date of every valid 1 or 0, and, more importantly, the time of the gap between them.  Next, we need to make a database to put each one of these newly added JSON arrays in to pull from later.

## 3. It's NoSQL - It's The Original ##
Sign up for MongoDB/MLab account if you do not have an account. Here is a link for MLab: https://mlab.com/login/ Once in, go to the dashboard and create a new collection and document. Here is where we will be placing the newly constructed JSON arrays in.
![image tooltip here](/docs/imgs/p3a.png)

Important! Make sure you keep track of your MLab driver URI
```
mongodb://<dbuser>:<dbpassword>@ds021943.mlab.com:21943/info
```

We will be working with your newly created collection via it's Database Object (henceforth know as dbobj). To reuse the same dbobj for convenince, using the MLab driver URI, export the dbobj so it can be reused via a module export. First, create a file called db.js - which will represent the dbobj. Then, add the dependency
```
npm install mongodb
```
Then, create the client via an object.
```
    const MongoClient = require('mongodb').MongoClient;
    var db = require('mongodb').Db;

    // database object
    var _dbobj;
    module.exports = {
        connect: function(callback) {
             MongoClient.connect(/* YOUR DRIVER URI */, function (err, dbobj) {
                 if (err) {
                  // connection failed
                  console.log('Error, connection failed...');
                     throw err;
                } else {
                  // connected to the database
                  // find the collection and insert
                  // the message in it
                     console.log('Success');
                  _dbobj = dbobj;
                  callback();
                }
            });
        }, dbobj: function() {
                console.log(_dbobj);
                return _dbobj;
        }
    };
```
Next, we will create an ``` insertData()``` function that will take the JSON file we created and place it in the MLab database. We wTo accomplish this via an export in Express, do the following:
```
var db = require('mongodb').Db;
var util = require('./db.js');

// returns the counter_data collection
module.exports = {
    insertData: function (data) {
        util.connect(function () {
            // get the dbobj
            var dbobj = util.dbobj();
            // find the collection 'counter data'
            dbobj.db('info').collection('users').insertOne(data, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                      console.log(res);
                }
            })
        });
    }
};
```
Now that you have the ``` insertData() ``` function, call the fuction every time subscribe.js recieves its publication from device.js via MQTT. Add this to your ```client.on()``` function. 
```
 if (topic === 'counter') {
    db.insertData(JSON.parse(message.toString()));

 }
```

Now you have a list of each bit output time! This can be very useful data as the gap between *any consecutive* entries will tell you if the beam as been triped. If any two consecutive entires have a large time gap, then the beam has been triped.  It is up to you on the implementation of parsing the database, but we will include one final step for doing so. 


### 4.Time *for* A Change ###

In this last step, we will show you how Savant can be used to parse the database for useful information. We need to variables in order to make the data useful an *n* value and a *k* value. The *n* value is how many records back you would like to examen for changes. Since subscribe.js will publish to the database every time a stream is open, which is around a few times a second, the *n* value is how far back you would like to search. Since device.js and subscribe.js are always running, new data is coming in every second; therefore, the hire the *n* value, the more far back we will look for large disparities between any two consecutive entries. For our purposes, an *n* value of 500 is choosen. We now need to get the last *n* entires in the MLab database. To do this, create a file called recent.js - which will, appropriately, choose the most recent (*n*) updates. To do this, grab the dbobj (glad we kept it -aren't you) and create a new *Promise*. A promise is Node.js's way to call functions synchronously. Since this will all be done via the db.js connection we made, we need to *promise* that the value returned by it will reach other parts of the code. To do this, module export a ```recent()``` function that will create a new promise and query the database for *n* results. Here's how to do it; make sure to require the dbobj.
```
var db = require('mongodb').Db;

// returns the value (count)
// of the counter data collection
module.exports = {
    // get the collection counter_table
    recent: function() {
        // create tge promise
        return new Promise(function(resolve, reject) {
            util.connect(function() {
                // get the dbobj
                var dbobj = util.dbobj();

                // find the collection 'counter data'
                // only document in the collection
                dbobj.db(/* YOUR DB NAME */).collection(/* YOUR COLLECTION NAME */).find().sort({ $natural: -1 }).limit(/* YOUR N VALUE */).toArray(function(err, res) {
                    if(err) {
                        console.log('The collection could not be found...');
                        // failed
                        reject();
                    } else {
                        // success
                        console.log('success');
                        resolve(res);
                    }
                });
            });
        }).then(function(collection) {
            // get the specific value
            return new Promise(function(resolve, reject) {
            // make sure it's valid
                if(typeof collection != 'undefined') {
                    // return the value 'counter'
                    resolve(collection);
                } else {
                    reject();
                }
            });
        });
    },
};

```
Finally, get these *n* database entires and compare them. If, in your call of ```recent``` push them all into an array (highly recommended) this next part becomes easier. For each *n* entries, if the *nth* item is popped off and compared to the *nth - 1* entry, if that value is above a certain threshold, then the laser was tripped. This threshold is the *k* value, and it is up to you as to decide how big/small it is. Since the JSON entry is published ~3 times/second, we recommended a *k* value of around 1000 - so an entire second. To do this, pop the first item off and subtracted it to the last item. If their difference is greater *k* then the wire has been tripped! Here's how to do it. Create a file called calculate.js and create a function called ```solve()``` to solve *n* entries for *k* threshold. Remember! This is an array of *n* entries bounded by *k*. If you are using express, module export it.

```module.exports = {
    solve: function(entry, k) {
    for(var i = 0; i < entry.length; i++) {
        console.log(entry[i]);
        if(Math.abs(entry.pop().milliseconds - entry[0].milliseconds) > k == true) {
            console.log(entry[0].milliseconds);
            console.log(entry.pop().milliseconds);
            // THERE WAS A GAP > K!
            return true;
        }
    }
    return false;
}
};
```
Finally, we need a way to call our new calculate.js file to render the information. If you are using Express, this is painless - almost automatic. Do to this, place your code in a ```router.get()``` function and call the ```solve() ``` function within
```
router.get('/', function(req, res, next) {

    recent.recent().then(function(result) {
            if(calc.solve(result, 1000)) {
            var data = data + 1;
         }
        res.render('connection', {message: data});
        }).catch(console.log('error'));
    res.render('connection', {message: data});
});
module.exports = router;

```
Then, create a file called results.hbs, like follows:
```
<h1 class="headings">Total count</h1>
<h2 class="headings">{{data}}</h2>
```
And that's it!

### Conclusion ###
Phew! We have just done a lot of heavy lifting to get Savant to work! As you can see, not only does Savant provide so much utility, like turning on/off lights and changing music, but it also has so much versatility: set your own *n* and *k* values, choose arrays versus blobs and objects, and even choose how to display that information! All within one device. 

We hope that this information has been useful to you! Now for the next question: what will you do next?

Eoin Halligan & The Savant Team
