describe('Default Test Suite - todos', function() {
    var $controller;

    beforeEach(function() {
        module('todosApp');
        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('should have an instance of the todos array', function() {
        var $scope = {};

        var controller = $controller('todosController', {$scope: $scope});
        expect($scope.todos).toBeDefined();
        expect($scope.toEdit).toBeDefined();
        expect($scope.newData).toBeDefined();
    });
});