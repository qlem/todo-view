'use strict'

const app = angular.module('todoApp', [
    'ngRoute',
    'ngCookies',
    'todoApp.mainView',
    'todoApp.loginView'
])

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider.otherwise({redirectTo: '/'})
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            'responseError': function (error) {
                $location.path('/login')
                return $q.reject(error)
            }
        }
    })
})
