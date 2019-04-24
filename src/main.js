'use strict'

import angular from 'angular'
import route from 'angular-route'
import cookies from 'angular-cookies'
import animate from 'angular-animate'
import toaster from 'angularjs-toaster'
import todoView from './todoView/todo.js'
import loginView from './loginView/login.js'
import newTaskView from './newTaskView/newTask.js'
import updateTaskView from './updateTaskView/updateTask.js'
import 'angularjs-toaster/toaster.min.css'
import './main.styl'
import moment from 'moment'

/**
 * The main module. Loads dependencies and other modules that represent the different views of the app.
 * @type {angular.Module}
 */
const app = angular.module('app', [
    route,
    cookies,
    animate,
    toaster,
    todoView.name,
    loginView.name,
    newTaskView.name,
    updateTaskView.name
])

/**
 * Configures the router service to redirect to '/' for any unmapped paths. Also configures
 * the http service to intercept any unauthorized 401 error from the API. If a 401 error
 * is catch, redirect to '/login'.
 */
app.config(function ($routeProvider, $httpProvider) {
    $routeProvider.otherwise({redirectTo: '/'})
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            'responseError': function (error) {
                if (error.status === 401) {
                    $location.path('/login')
                }
                return $q.reject(error)
            }
        }
    })
})

/**
 * Creates the AuthService as singleton. When the user login, sets the token provided by
 * the API in the header for any next request and stores the token into a cookie. When the user logout,
 * removes the token from the cookie and the default request header.
 */
app.factory('AuthService', ['$http', '$location', '$cookies', function ($http, $location, $cookies) {
    let isLoggedIn = false
    const token = $cookies.get('token')
    if (token) {
        isLoggedIn = true
        $http.defaults.headers.common.token = token
    }
    return {
        login: function (token) {
            const date = moment().add(10, 'days')
            $cookies.put('token', token, {
                path: '/',
                expires: date.toISOString()
            })
            $http.defaults.headers.common.token = token
            isLoggedIn = true
        },
        logout: function () {
            delete $http.defaults.headers.common.token
            $cookies.remove('token')
            $location.search({})
            $location.path('/login')
            isLoggedIn = false
        },
        isLoggedIn: function () {
            return isLoggedIn
        }
    }
}])

/**
 * Controller used for the logout button. Only appears if the user is authenticated.
 * Allows to logout.
 */
app.controller('logoutCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.logout = function () {
        AuthService.logout()
    }
    $scope.$watch(AuthService.isLoggedIn, function (isLoggedIn) {
        $scope.isLoggedIn = isLoggedIn
    })
}])
