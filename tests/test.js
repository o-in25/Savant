var recent = require('../models/service/recent');
var calc = require('../helpers/logic/calculate');

var res = function() {
    recent.recent().then(function(result) {
        console.log(result);
        console.log(calc.solve(result, 500))
    });
};

