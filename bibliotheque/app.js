var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// connection base de donnée

mongoose.connect('mongodb://localhost:27017/bibliotheque', {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("connection réussi!");
  var livreSchema = new mongoose.Schema({
    titre: String,
    date_de_parution: Date,
  })
  
  var Livre = mongoose.model('Livre', livreSchema);
  var livre1 = new Livre({
    titre: 'roméo & juliette',
    date_de_parution: '05.07.1595',
  })
  console.log(livre1);
  livre1.save(function(err, livre1){
    if (err) return console.error(err);
    console.log('livre ajouté à la base!')
  }
  )
});



// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;