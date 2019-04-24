'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './updateTask.html'
import './updateTask.styl'
import isLoggedIn from '../isLogged'

/**
 * Module that represents the update task view.
 */
export default angular.module('app.updateTaskView', [route])

/**
 * Configures the router service. Loads that view if the path corresponding to '/task/update'.
 * Checks if the user is logged in. If the user is not logged in, redirect to '/login'.
 */
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/task/update', {
        template: template,
        controller: 'updateTaskCtrl',
        resolve: {
            isLoggedIn: isLoggedIn
        }
    })
}])

/**
 * Controller of the update task view.
 */
.controller('updateTaskCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'toaster',
    function ($scope, $http, $location, $route, $routeParams, toaster) {
    $scope.task = $routeParams.task

    /**
     * HTTP request for delete the selected task. If succeed, a toast is displayed.
     */
    $scope.deleteTask = function () {
        $http.delete('http://localhost:3000/todo/', {
            params: {
                id: $scope.task._id
            }
        }).then(() => {
            toaster.pop({
                type: 'success',
                title: 'Task deleted',
                body: 'Task successfully deleted',
                timeout: 3000
            })
            $scope.goBack()
        }).catch(err => {
            console.error('Cannot delete task')
            if (err.data && err.status) {
                console.error('Http error status: ' + err.status)
                console.error('Http error data: ' + err.data)
            } else {
                console.error(err)
            }
        })
    }

    /**
     * HTTP request for update the selected task. If succeed, a toast is displayed.
     */
    $scope.updateTask = function() {
        $http.put('http://localhost:3000/todo/', {
            data: {
                _id: $scope.task._id,
                state: $scope.task.state,
                priority: $scope.task.priority
            }
        }).then(() => {
            toaster.pop({
                type: 'success',
                title: 'Task updated',
                body: 'Task successfully updated',
                timeout: 3000
            })
            $scope.goBack()
        }).catch(err => {
            console.error('Cannot update task')
            if (err.data && err.status) {
                console.error('Http error status: ' + err.status)
                console.error('Http error data: ' + err.data)
            } else {
                console.error(err)
            }
        })
    }

    /**
     * Function to go back.
     */
    $scope.goBack = function () {
        $location.search({})
        $location.path('/')
    }
}])
