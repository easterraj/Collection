var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var config = require('./config/database');
var jwt = require('jsonwebtoken')

var index = require('./routes/index');
var user = require('./routes/user');
var admin = require('./routes/admin');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
mongoose.Promise = global.Promise;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 
mongoose.connect(config.database)
.then(()=>console.log('Connection Succesful'))
.catch((err)=>console.log(err));

app.use(passport.initialize());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user',function (req, res, next) {
  auth = req.headers['authorization'];
  auth =auth.toString();
  auth = auth.slice(4).trim();
  console.log("auth:",auth);
  if(auth != null)
  {
    try {
     var jwtData = jwt.verify(auth,config.secret);
    } catch(err) {
      console.log("err",err);
    }
  }
  
  req.jwtData = jwtData;
  console.log("auth:",jwtData);
  next()
})

app.use('/', index);
app.use('/user', user);
app.use('/login', login);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
