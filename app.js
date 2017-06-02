/* Get reference to express module */
var express = require('express'); // Get express module
var app = express(); // This treats express as a function -- it is both a module and a function

/* Get reference to path for use later */
var path = require('path');

/* morgan enables logging of messages about requests */
var morgan = require('morgan');

/* Get reference to the database module */
var db = require('./db');

/* This should be set to enable serving of static content (like for an SPA). Should contain the bower_components, app.js and html files */
app.use(express.static(__dirname + '/client'));

/* Other required statements */
var bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : 'true'}));

/* Set router for the backend */
require('./backend/todo_rest')(app);

module.exports = app;
