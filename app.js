var express = require('express');
var app = express();
var db = require('./db');

var TodoController = require('./todos/TodoController');
app.use('/todos', TodoController);

module.exports = app;
