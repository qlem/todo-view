'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './login.html'
import './login.styl'

export default angular.module('app.loginView', [route])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        template: template,
        controller: 'loginCtrl',
        resolve: function (AuthService) {
            return new Promise((resolve, reject) => {
                if (AuthService.isLoggedIn()) {
                    reject()
                } else {
                    resolve()
                }
            })
        }
    })
}])

.controller('loginCtrl', ['$scope', '$http', '$location', 'toaster', 'AuthService',
    function ($scope, $http, $location, toaster, AuthService) {
    $scope.username = ''
    $scope.password = ''

    $scope.signIn = function () {
        $http.post('http://localhost:3000/account/sign/in', {
            data: {
                name: $scope.username,
                password: $scope.password
            }
        }).then(response => {
            AuthService.login(response.data.token)
            $location.path('/')
        }).catch(err => {
            console.error('Cannot proceed to sign in')
            if (err.data && err.status) {
                console.error('Http error status: ' + err.status)
                console.error('Http error data: ' + err.data)
                toaster.pop({
                    type: 'error',
                    title: 'Cannot logged in',
                    body: err.data,
                    timeout: 3000
                })
            } else {
                console.error(err)
            }
        })
    }

    $scope.signUp = function () {
        $http.post('http://localhost:3000/account/sign/up', {
            data: {
                name: $scope.username,
                password: $scope.password
            }
        }).then(() => {
            toaster.pop({
                type: 'success',
                title: 'Account created',
                body: 'You can now proceed to logged in',
                timeout: 3000
            })
        }).catch(err => {
            console.error('Cannot proceed to sign up')
            if (err.data && err.status) {
                console.error('Http error status: ' + err.status)
                console.error('Http error data: ' + err.data)
                toaster.pop({
                    type: 'error',
                    title: 'Cannot create account',
                    body: err.data,
                    timeout: 3000
                })
            } else {
                console.error(err)
            }
        })
    }
}])
