'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './login.html'
import './login.styl'

export default angular.module('app.loginView', [route])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        template: template,
        controller: 'loginCtrl'
    })
}])

.controller('loginCtrl', ['$scope', '$http', '$location', '$cookies',
    function ($scope, $http, $location, $cookies) {
    $scope.username = ''
    $scope.password = ''
    $scope.signIn = function () {
        $http.post('http://localhost:3000/account/sign/in', {
            data: {
                name: $scope.username,
                password: $scope.password
            }
        }).then(response => {
            let date = new Date()
            date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000))
            $cookies.put('token', response.data.token, {
                path: '/',
                expires: date
            })
            $http.defaults.headers.common.token = response.data.token
            $location.path('/')
        }).catch(err => {
            console.error('Cannot proceed to sign in')
            console.error(err)
        })
    }
    $scope.signUp = function () {
        $http.post('http://localhost:3000/account/sign/up', {
            data: {
                name: $scope.username,
                password: $scope.password
            }
        }).then(response => {
            // TODO indicate to the user to proceed to login
        }).catch(err => {
            console.error('Cannot proceed to sign up')
            console.error(err)
        })
    }
}])
