process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var mongoose = require('mongoose');
var todoSchema = require('../backend/todo_schema');
var should = chai.should();
var chaiThings = require('chai-things');

chai.use(chaiHttp);
chai.use(chaiThings);

describe('todos', function() {
    todoSchema.collection.drop();

    beforeEach(function(done) {
        var newTodo = new todoSchema({
            'title': 'Todo 0',
            'description': 'Test todo 0',
            'completed': 'false'
        });

        newTodo.save(function(err) {
            done();
        });
    });

    afterEach(function(done) {
        todoSchema.collection.drop();
        done();
    });

    it('should list all todos via GET at /api/todos', function(done) {
        chai.request(server)
            .get('/api/todos')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('description');
                res.body[0].should.have.property('completed');
                res.body[0].title.should.equal('Todo 0');
                res.body[0].description.should.equal('Test todo 0');
                res.body[0].completed.should.equal(false);
                done();
            });
    });

    it('should list a single todo via GET at /api/todos/:id');

    /*it('should add a single todo via POST at /api/todos', function(done) {
        var curTodoNum = Math.floor(Math.random() * 1000) + 1;

        chai.request(server)
            .post('/api/todos')
            .send({'title':'Test ' + curTodoNum,'description':'Test todo ' + curTodoNum,'completed':'false'})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.contain.an.item.with.property('title', 'Test ' + curTodoNum);
                res.body.should.contain.an.item.with.property('description', 'Test todo ' + curTodoNum);
                res.body.should.contain.an.item.with.property('completed', false);
                done();
            });
    });*/

    it('should delete a single todo via DELETE at /api/todos/:id');
    it('should update a single todo via PUT at /api/todos/:id');
});