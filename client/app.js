var app = angular.module('todosApp', []);

app.controller('todosController', function($scope, $http) {
    $scope.todos = {};
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
});