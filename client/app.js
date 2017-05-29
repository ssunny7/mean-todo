var app = angular.module('todosApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'todoController',
        tenplateUrl: 'views/todos.html'
    })
        .otherwise({redirectTo: '/'});
}]);