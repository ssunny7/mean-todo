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
        /* Set up response for expected request. This just uses a dummy JSON object. */
        httpBackend.when('GET', '/api/todos').respond(200, {'title':'Mock Todo G', 'description':'Todo G for mocking',  'completed': true});

        /* Get reference to the controller and scope. */
        var ctrl = controller('todosController', {$scope: scope});

        /* No function in the controller needs to be explicitly triggered since the GET call is 'global'. */
        httpBackend.flush();
        expect(scope.todos).toEqual({'title':'Mock Todo G', 'description':'Todo G for mocking',  'completed': true});
    });

    it('should add a new todo', function() {
        /* Declare the mock JSON object used for the POST call and for checking the return value. */
        var _newData = {'title': 'Mock Todo P', 'description': 'Todo P for mocking', 'completed': false};

        /* Second argument to when is the object to be created, the same is returned from it. */
        httpBackend.when('POST', '/api/todos', _newData).respond(200, _newData);

        var ctrl = controller('todosController', {$scope: scope});
        /* newData is used in the controller to make the POST request, so set that. */
        scope.newData = _newData;
        /* Call the controller function which makes the POST call. */
        scope.createToDo();
        httpBackend.flush();

        expect(scope.todos).toEqual(_newData);
    });
});