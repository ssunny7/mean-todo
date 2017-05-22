var express = require('express');
var app = express();
var db = require('./db');

var todoRestVar = require('./backend/todo_rest');
app.use('/todos', todoRestVar);

module.exports = app;
