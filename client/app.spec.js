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

    it('should delete a todo', function() {
        /* The comments for each statement remain the same as for the above tests. However, here's a brief overview of the flow.
         * The when statement says what happens when a request with the given type and URL comes in. Once the controller reference is obtained and the
         * method in the controller is called, the HTTP request within that method is made (the ID passed here to the method is same as the one used in the URL
         * when clause and is used to make the HTTP request from the controller). The request is executed once flush is called.
         * The actions after this happen based on what is defined in the success/error methods of the request handler in the controller and this is checked here at the end. */
        httpBackend.when('DELETE', '/api/todos/asdf').respond(200, []);

        var ctrl = controller('todosController', {$scope: scope});
        scope.deleteToDo('asdf');
        httpBackend.flush();

        expect(scope.todos.length).toEqual(0);
    });

    it('should update a todo', function() {
        /* This test is intended to mimic the user editing a todo. Clicking 'Edit' for a todo sets its value in the toEdit variable, after which it is saved. On completion,
         * toEdit should thus be empty and the todos variable should have the saved todo. */
        var _dummyTodo = {'title': 'Mock Todo U', 'description': 'Todo U for mocking', 'completed': true};

        httpBackend.when('PUT', '/api/todos/asdf', _dummyTodo).respond(200, _dummyTodo);

        var ctrl = controller('todosController', {$scope: scope});

        /* Initially, toEdit must be empty. */
        expect(Object.keys(scope.toEdit).length).toEqual(0);
        scope.setEditForTodo('asdf', _dummyTodo);
        /* After clicking 'Edit', toEdit must have one entry containing the dummy todo. */
        expect(Object.keys(scope.toEdit).length).toEqual(1);
        expect(scope.toEdit['asdf']).toEqual(_dummyTodo);

        scope.saveTodo('asdf');
        httpBackend.flush();

        /* After the todo is saved, toEdit must be empty and todos should contain the saved todo. */
        expect(scope.todos).toEqual(_dummyTodo);
        expect(Object.keys(scope.toEdit).length).toEqual(0);
    });
});