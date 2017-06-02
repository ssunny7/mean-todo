var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');
var db = require('./db');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : 'true'}));

require('./backend/todo_rest')(app);

module.exports = app;
