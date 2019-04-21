'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './updateTask.html'
import './updateTask.styl'

export default angular.module('app.updateTaskView', [route])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/task/update', {
        template: template,
        controller: 'updateTaskCtrl',
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

.controller('updateTaskCtrl', ['$scope', '$http', '$location', '$route', '$routeParams',
    function ($scope, $http, $location, $route, $routeParams) {
    $scope.task = $routeParams.task

    $scope.deleteTask = function () {
        $http.delete('http://localhost:3000/todo/', {
            params: {
                id: $scope.task._id
            }
        }).then(response => {
            // TODO inform the user
            $scope.goBack()
        }).catch(err => {
            console.error('Cannot delete task')
            console.error(err)
        })
    }

    $scope.updateTask = function() {
        $http.put('http://localhost:3000/todo/', {
            data: {
                _id: $scope.task._id,
                state: $scope.task.state,
                priority: $scope.task.priority
            }
        }).then(response => {
            // TODO inform the user
            $scope.goBack()
        }).catch(err => {
            console.error('Cannot update task')
            console.error(err)
        })
    }

    $scope.goBack = function () {
        $location.search({})
        $location.path('/')
    }
}])
