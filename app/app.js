'use strict'

const app = angular.module('todoApp', [
    'ngRoute',
    'ngCookies',
    '720kb.datepicker',
    'todoApp.mainView',
    'todoApp.loginView',
    'todoApp.newTaskView'
])

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
