var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var chaiThings = require('chai-things');

chai.use(chaiHttp);
chai.use(chaiThings);

describe('todos', function() {
    it('should list all todos via GET at /api/todos', function(done) {
        chai.request(server)
            .get('/api/todos')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should list a single todo via GET at /api/todos/:id');

    it('should add a single todo via POST at /api/todos', function(done) {
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
    });

    it('should delete a single todo via DELETE at /api/todos/:id');
    it('should update a single todo via PUT at /api/todos/:id');
});