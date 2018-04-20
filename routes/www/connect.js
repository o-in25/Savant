var express = require('express');

var ifl = require('./../mqtt/publish.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(ifl);
    res.render('connection', { message: ifl});
});




module.exports = router;
/**
 * Created by o_in25 on 4/11/18.
 */
