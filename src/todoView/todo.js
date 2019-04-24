'use strict'

import angular from 'angular'
import route from 'angular-route'
import isLoggedIn from './../isLogged.js'
import template from './todo.html'
import './todo.styl'

export default angular.module('app.todoView', [route])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        template: template,
        controller: 'todoCtrl',
        resolve: {
            isLoggedIn: isLoggedIn
        }
    })
}])

.controller('todoCtrl', ['$scope', '$http', '$location', '$route',
    function ($scope, $http, $location, $route) {
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

    $scope.newTask = function (state) {
        $route.updateParams({
            state: state
        })
        $location.path('/task/create')
    }

    $scope.updateTask = function (task) {
        $route.updateParams({
            task: task
        })
        $location.path('task/update')
    }
}])
