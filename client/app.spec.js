describe('Default Test Suite - todos', function() {
    var $httpBackend, scope, controller;

    beforeEach(module('todosApp'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope');

        var $controller = $injector.get('$controller');
        controller = $controller('todosController', {$scope: scope});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an instance of the todos array', function() {
        expect(scope.todos).toBeDefined();
        expect(scope.toEdit).toBeDefined();
        expect(scope.newData).toBeDefined();
    });
});