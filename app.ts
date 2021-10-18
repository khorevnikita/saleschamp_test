import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var app = express();

// view engine setup
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

/* DEFINE RUTES */
app.use('/addresses', require('./routes/addresses'))

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
