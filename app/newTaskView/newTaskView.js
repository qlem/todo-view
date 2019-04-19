'use strict'

angular.module('todoApp.newTaskView', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/task/create', {
        templateUrl: 'newTaskView/newTaskView.html',
        controller: 'newTaskCtrl',
        resolve: {
            'isLogged': function ($cookies, $location, $http) {
                return new Promise((resolve, reject) => {
                    const token = $cookies.get('token')
                    if (token) {
                        $http.defaults.headers.common.token = token
                        resolve()
                    } else {
                        $location.path('/login')
                        reject()
                    }
                })
            }
        }
    })
}])

.controller('newTaskCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.task = {
        priority: 'medium'
    }
    $scope.users = []

    $http.get('http://localhost:3000/account/')
        .then(response => $scope.users = response.data)
        .catch(err => {
            console.error('Cannot get users names')
            console.error(err)
        })

    $scope.addTask = function () {
        console.log($scope.task)
        $http.post('http://localhost:3000/todo/', {
            data: $scope.task
        }).then(response => {
            // TODO indicate to the user that the new task is successfully added
        }).catch(err => {
            console.error('Cannot create a new task')
            console.error(err)
        })
    }

    $scope.goBack = function () {
        $location.path('/')
    }
}])
