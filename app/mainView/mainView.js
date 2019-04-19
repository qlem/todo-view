'use strict'

angular.module('todoApp.mainView', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'mainView/mainView.html',
        controller: 'mainCtrl',
        resolve: {
            'isLogged': function ($cookies, $location, $http) {
                const token = $cookies.get('token')
                if (token) {
                    $http.defaults.headers.common.token = token
                } else {
                    $location.path('/login')
                }
            }
        }
    })
}])

.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.tasks = []
    $http.get('http://localhost:3000/todo/')
        .then(response => $scope.tasks = response.data)
        .catch(err => {
            console.error('Cannot get tasks')
            console.error(err)
        })
}])
