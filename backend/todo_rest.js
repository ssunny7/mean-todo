var TodoSchema = require('./todo_schema');
var path = require('path');

module.exports = function(_app) {
    _app.post('/api/todos', function(req, res) {
        TodoSchema.create({
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed
            },
            function(err, todo) {
                console.log('API POST; data: ' + todo);
                if(err)
                    return res.status(500).send("The todo could not be added to the database!");
                return res.json(todo);
            });
    });

    _app.get('/api/todos', function(req, res) {
        TodoSchema.find({}, function(err, todos) {
            console.log('API GET; data: ' + todos);
            if(err)
                return res.status(500).send("The todos could not be retrieved from the database!");
            return res.json(todos);
        });
    });

    _app.get('/api/todos/:id', function(req, res) {
        TodoSchema.findById(req.params.id, function(err, todo) {
            console.log('API GET id; length: ' + todo.length + ', data: ' + todo);
            if(err)
                return res.status(500).send("The requested todo was not found in the database!");
            return res.json(todo);
        });
    });

    _app.delete('/api/todos/:id', function(req, res) {
        TodoSchema.findByIdAndRemove(req.params.id, function(err, todo) {
            console.log('API DELETE; data: ' + todo);
            if(err)
                return res.status(500).send("The requested todo could not be deleted from the database!");

            TodoSchema.find({}, function(err, todos) {
                console.log('API GET after DELETE; data: ' + todos);
                if(err)
                    return res.status(500).send("The todos after deletion could not be retrieved from the database!");
                return res.json(todos);
            });
        });
    });

    _app.put('/api/todos/:id', function(req, res) {
        TodoSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, todo) {
            console.log('API PUT; data: ' + todo);
            if(err)
                return res.status(500).send("The requested todo could not be updated!");
            return res.json(todo);
        });
    });

    _app.get('*', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
    });
};
