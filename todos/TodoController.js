var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var todo = require('./todo_schema');

router.post('/', function(req, res) {
   TodoSchema.create({
       title: req.body.title,
       description: req.body.description,
       completed: req.body.completed
   },
   function(err, todo) {
       if(err)
           return res.status(500).send("The todo could not be added to the database!");
       return res.status(200).send(todo);
   });
});

router.get('/', function(req, res) {
   TodoSchema.find({}, function(err, todos) {
       if(err)
           return res.status(500).send("The todos could not be retrieved from the database!");
       return res.status(200).send(todos);
   });
});

module.exports = router;
