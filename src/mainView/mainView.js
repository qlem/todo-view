'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './mainView.html'
import './mainView.styl'

export default angular.module('app.mainView', [route])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        // templateUrl: 'mainView/mainView.html',
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

.controller('mainCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.tasks = []
    $http.get('http://localhost:3000/todo/')
        .then(response => $scope.tasks = response.data)
        .catch(err => {
            console.error('Cannot get tasks')
            console.error(err)
        })
    $scope.newTask = function () {
        $location.path('/task/create')
    }
}])
