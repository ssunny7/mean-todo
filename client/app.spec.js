describe('Default Test Suite - todos', function() {
    var httpBackend, scope, controller;

    beforeEach(module('todosApp'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope').$new();
        controller = $injector.get('$controller');
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an instance of the todos array', function() {
        var ctrl = controller('todosController', {$scope: scope});

        expect(scope.todos).toBeDefined();
        expect(scope.toEdit).toBeDefined();
        expect(scope.newData).toBeDefined();
    });

    it('should fetch todos', function() {
        httpBackend.when('GET', '/api/todos').respond(200, {'title':'Mock Todo 1', 'description':'Todo 1 for mocking',  'completed': true});
        var ctrl = controller('todosController', {$scope: scope});
        httpBackend.flush();
        expect(scope.todos).toEqual({'title':'Mock Todo 1', 'description':'Todo 1 for mocking',  'completed': true});
    });
});