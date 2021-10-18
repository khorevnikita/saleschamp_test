//import createError from 'http-errors';
var createError = require('http-errors');
import express from 'express';
//var express = require('express');
import path from 'path'
//var path = require('path');
//import cookieParser from 'cookie-parser';
var cookieParser = require('cookie-parser');
//import logger from 'morgan';
var logger = require('morgan');
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from "body-parser";
//require('dotenv').config()
//var http = require('http');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//const MongoClient    = require('mongodb').MongoClient;
//const bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

//app.use('/', require('./routes/index'));
//app.use('/users', require('./routes/users'));
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
