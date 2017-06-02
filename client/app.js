var app = angular.module('todosApp', []);

app.controller('todosController', function($scope, $http) {
//function todosController($scope, $http) {
    console.log('in app.js');
    $scope.todos = {};

    $http({
        method: 'GET',
        url: '/api/todos'
    }).then(function (success) {
        console.log(success.data);
        $scope.todos = success.data;
    }, function (error) {
        console.log('Angular GET error: ' + error.data);
    });
//}
});