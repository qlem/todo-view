'use strict'

import angular from 'angular'
import route from 'angular-route'
import datePicker from 'angularjs-datepicker/index'
import 'angularjs-datepicker/dist/angular-datepicker.min.css'
import isLoggedIn from './../isLogged.js'
import moment from 'moment'
import template from './newTask.html'
import './newTask.styl'

export default angular.module('app.newTaskView', [route, datePicker])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/task/create', {
        template: template,
        controller: 'newTaskCtrl',
        resolve: {
            isLoggedIn: isLoggedIn
        }
    })
}])

.controller('newTaskCtrl', ['$scope', '$http', '$location', '$routeParams', 'toaster',
    function ($scope, $http, $location, $routeParams, toaster) {
    $scope.task = {
        priority: 'medium',
        state: $routeParams.state
    }
    $scope.users = []
    $scope.date = moment()
    $scope.today = moment()

    $http.get('http://localhost:3000/account/')
        .then(response => $scope.users = response.data)
        .catch(err => {
            console.error('Cannot get users names')
            console.error(err)
        })

    $scope.addTask = function () {
        $scope.task.deadline = moment($scope.date, "DD/MM/YYYY")
        $http.post('http://localhost:3000/todo/', {
            data: $scope.task
        }).then(() => {
            toaster.pop({
                type: 'success',
                title: 'New task added',
                body: 'New task successfully added',
                timeout: 3000
            })
            $scope.goBack()
        }).catch(err => {
            console.error('Cannot create a new task')
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
