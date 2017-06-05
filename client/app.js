var app = angular.module('todosApp', []);

app.controller('todosController', function($scope, $http) {
    $scope.todos = {};
    $scope.toEdit = {};
    $scope.newData = {};

    $http({
        method: 'GET',
        url: '/api/todos'
    }).then(function (success) {
        console.log('Angular GET success: ' + success.data);
        $scope.todos = success.data;
    }, function (error) {
        console.log('Angular GET error: ' + error.data);
    });

    $scope.createToDo = function() {
        $http({
            method: 'POST',
            url: '/api/todos',
            data: $scope.newData
        }).then(function (success) {
            console.log('Angular POST success: ' + success.data);
            $scope.newData = {};
            $scope.todos = success.data;
        }, function (error) {
            console.log('Angular POST error: ' + error.data);
        });
    };

    $scope.deleteToDo = function(_id) {
        $http({
            method: 'DELETE',
            url: '/api/todos/' + _id
        }).then(function (success) {
            console.log('Angular DELETE success: ' + success.data);
            $scope.todos = success.data;
        }, function (error) {
            console.log('Angular DELETE error: ' + error.data);
        });
    };

    $scope.setEditForTodo = function(_id, _todo) {
        $scope.toEdit[_id] = _todo;
    };

    $scope.resetEditForTodo = function(_id) {
        if($scope.toEdit.hasOwnProperty(_id))
            delete $scope.toEdit[_id];
    };

    $scope.checkIfTodoEdit = function(_id) {
        if($scope.toEdit.length > 0 && _id in $scope.toEdit)
            return "enabled";

        return "disabled";
    };

    $scope.saveTodo = function(_id) {
        $http({
            method: 'PUT',
            url: '/api/todos/' + _id,
            data: $scope.toEdit[_id]
        }).then(function (success) {
            console.log('Angular PUT success: ' + success.data);
            $scope.resetEditForTodo(_id);
            $scope.todos = success.data;
        }, function (error) {
            console.log('Angular PUT error: ' + error.data);
        });
    }
});