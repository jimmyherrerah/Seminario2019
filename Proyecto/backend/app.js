var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var session = require('express-session');
var MongoSessionStore = require('connect-mongodb-session')(session);


function appInit(db) {

var sessionStore = new MongoSessionStore(
    {
      uri : 'mongodb://localhost:27017/temstoresession',
      databaseName: 'temstoresession',
      collection: 'sessions'
    },
    function(err){
      if(err){
          console.log(err);
      }else{
        console.log("Session Storage Started");
      }
    }
);

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret:'elRespetoAlDerechoAjenoEsLaPaz',
  cookie:{
    maxAge: (1000 * 60 * 60 * 24), 
  },
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api', apiRouter(db));

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

  return app;
} // appInit
module.exports = appInit;
