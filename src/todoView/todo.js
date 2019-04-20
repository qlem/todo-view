'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './todo.html'
import './todo.styl'

export default angular.module('app.mainView', [route])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        template: template,
        controller: 'mainCtrl',
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

.controller('mainCtrl', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {
    $scope.pending = []
    $scope.inProgress = []
    $scope.finished = []

    $http.get('http://localhost:3000/todo/')
        .then(response => {
            const data = response.data
            data.forEach(elem =>{
                switch (elem._id) {
                    case 'pending':
                        $scope.pending = elem.tasks
                        break
                    case 'inProgress':
                        $scope.inProgress = elem.tasks
                        break
                    case 'finished':
                        $scope.finished = elem.tasks
                        break
                }
            })
        })
        .catch(err => {
            console.error('Cannot get tasks')
            console.error(err)
        })

    $scope.getPriorityClass = function (priority) {
        switch (priority) {
            case 'low':
                return 'task-priority-low'
            case 'medium':
                return 'task-priority-medium'
            case 'high':
                return 'task-priority-high'
            case 'critical':
                return 'task-priority-critical'
        }
    }

    $scope.newTask = function () {
        $location.path('/task/create')
    }
}])
