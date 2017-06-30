const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
//for log in purposes ---------------- 👁
const session      = require('express-session');
const passport     = require('passport');
//----------------------------------------

//Run all the code inside "config/passport-config.js"
require('./config/passport-config.js');

mongoose.connect('mongodb://localhost/express-users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Express - USERS';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(layouts);
//------------------------
app.use(session({
  // the value of 'secret' doesn't matter except it has to be different for every app.js
  secret: 'jflkajdlkfjasldjsjfa',
  resave: true,
  saveUninitialized: true,
}));

//PASSPORT MIDDLEWARES 🚨🚨🚨🚨🚨🚨
//these need to come after "app.use(session(...))"🚨🚨🚨
app.use(passport.initialize());
app.use(passport.session());
//---------------------------------


//------ROUTES HERE 👇👇👇 ----------------------------

const index = require('./routes/index');
app.use('/', index);

const myAuthRoutes = require('./routes/auth-routes.js');
app.use('/', myAuthRoutes);

//------ROUTES HERE 👆👆👆 ----------------------------



// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
