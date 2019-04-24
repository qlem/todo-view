'use strict'

import angular from 'angular'
import route from 'angular-route'
import isLoggedIn from '../isLogged'
import template from './todo.html'
import './todo.styl'

/**
 * Module that represents the making list view.
 */
export default angular.module('app.todoView', [route])

/**
 * Configures the router service. Loads that view if the path corresponding to '/'.
 * Checks if the user is logged in. If the user is not logged in, redirect to '/login'.
 */
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        template: template,
        controller: 'todoCtrl',
        resolve: {
            isLoggedIn: isLoggedIn
        }
    })
}])

/**
 * Controller of the making list view.
 */
.controller('todoCtrl', ['$scope', '$http', '$location', '$route',
    function ($scope, $http, $location, $route) {
    $scope.pending = []
    $scope.inProgress = []
    $scope.finished = []

    /**
     * HTTP request that fetch all available tasks from the API.
     */
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
            if (err.data && err.status) {
                console.error('Http error status: ' + err.status)
                console.error('Http error data: ' + err.data)
            } else {
                console.error(err)
            }
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

    /**
     * Function that change the current view to the new task view.
     * @param state
     */
    $scope.newTask = function (state) {
        $route.updateParams({
            state: state
        })
        $location.path('/task/create')
    }

    /**
     * Function that change the current view to the update task view.
     * @param task
     */
    $scope.updateTask = function (task) {
        $route.updateParams({
            task: task
        })
        $location.path('task/update')
    }
}])
