var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var count = require('./routes/www/connect');
var update = require('./routes/www/update');
var hello = require('./routes/www/hello');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var sub = require('./models/mqtt/subscribe.js');
sub.sub();

var app = express();
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', indexRouter);
app.use('/connection', count);
app.use('/update', update);
app.use('/hello', hello);


// express validator
app.use(expressValidator({
  errorFormatter: function(param, mes, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;
    while(namespace.length) {
      formParam = '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: mes,
      value: value
    };
  }
}));

// flash
app.use(flash());




app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.success_msg = req.flash('error_msg');
  res.locals.success_msg = req.flash('error');
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
