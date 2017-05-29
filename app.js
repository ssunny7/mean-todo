var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');

var todoRestVar = require('./backend/todo_rest');
app.set('views', path.join(__dirname, 'client/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/todos', todoRestVar);

app.get('/', function(req, res) {
   res.render('dummy.html');
});

module.exports = app;
