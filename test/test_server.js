var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

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
    it('should add a single todo via POST at /api/todos');
    it('should delete a single todo via DELETE at /api/todos/:id');
    it('should update a single todo via PUT at /api/todos/:id');
});