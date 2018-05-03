var express = require('express');
var router = express.Router();
var User = require('../../models/model/user.js');

router.get('/login', function(req, res, next) {
    res.render('login', {});
});

// register user
router.post('/register', function(req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    req.checkBody('username', 'Username required').notEmpty();
    req.checkBody('password', 'Password required').notEmpty();
    req.checkBody('email', 'Email required').isEmail();
    var errs = req.validationErrors();
    if(errs) {
        res.render('register', {errors: errs});
    } else {
        console.log('success');
    }

});
module.exports = router;
