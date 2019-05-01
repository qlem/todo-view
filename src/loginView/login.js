'use strict'

import angular from 'angular'
import route from 'angular-route'
import template from './login.html'
import './login.styl'

/**
 * Module that represents the login view.
 */
export default angular.module('app.loginView', [route])

/**
 * Configures the router service. Loads that view if the path corresponding to '/login'.
 */
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        template: template,
        controller: 'loginCtrl'
    })
}])

/**
 * Controller of the login view.
 */
.controller('loginCtrl', ['$scope', '$http', '$location', 'toaster', 'AuthService',
    function ($scope, $http, $location, toaster, AuthService) {
    $scope.username = ''
    $scope.password = ''

    /**
     * SignIn function. Proceeds to the user authentication. If the request succeeds, the API responds
     * by sending a valid token. Then, the token is stores into a cookie and sets in the header of
     * any next request through the AuthService.
     */
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

    /**
     * SignUp function. Allows to the user to create a new account. Once the new account is created,
     * the user can login.
     */
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
