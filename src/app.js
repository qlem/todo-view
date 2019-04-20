'use strict'

import angular from 'angular'
import route from 'angular-route'
import cookies from 'angular-cookies'
// import datePicker from 'angularjs-datepicker'
import mainView from './mainView/mainView.js'
import loginView from './loginView/loginView.js'
import newTaskView from './newTaskView/newTaskView.js'

const app = angular.module('app', [
    route,
    cookies,
    // datePicker,
    mainView.name,
    loginView.name,
    newTaskView.name
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
