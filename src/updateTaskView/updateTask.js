'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './updateTask.html'
import './updateTask.styl'
import isLoggedIn from "../isLogged"

export default angular.module('app.updateTaskView', [route])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/task/update', {
        template: template,
        controller: 'updateTaskCtrl',
        resolve: {
            isLoggedIn: isLoggedIn
        }
    })
}])

.controller('updateTaskCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'toaster',
    function ($scope, $http, $location, $route, $routeParams, toaster) {
    $scope.task = $routeParams.task

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

    $scope.goBack = function () {
        $location.search({})
        $location.path('/')
    }
}])
