var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var todo = require('./todo_schema');

router.post('/', function(req, res) {
   todo.create({
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
   todo.find({}, function(err, todos) {
       if(err)
           return res.status(500).send("The todos could not be retrieved from the database!");
       return res.status(200).send(todos);
   });
});

router.get('/:id', function(req, res) {
   todo.findById(req.params.id, function(err, todo) {
       if(err)
           return res.status(500).send("The requested todo was not found in the database!");
       return res.status(200).send(todo);
   });
});

router.delete('/:id', function(req, res) {
   todo.findByIdAndRemove(req.params.id, function(err, todo) {
       if(err)
           return res.status(500).send("The requested todo could not be deleted from the database!");
       return res.status(200).send("The todo titled " + todo.title + " was deleted!");
   });
});

router.put('/:id', function(req, res) {
   todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, todo) {
       if(err)
           return res.status(500).send("The requested todo could not be updated!");
       return res.status(200).send(todo);
   });
});

module.exports = router;
