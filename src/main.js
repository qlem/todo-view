'use strict'

import angular from 'angular'
import route from 'angular-route'
import cookies from 'angular-cookies'
import mainView from './todoView/todo.js'
import loginView from './loginView/login.js'
import newTaskView from './newTaskView/newTask.js'
import updateTaskView from './updateTaskView/updateTask.js'
import './main.styl'

const app = angular.module('app', [
    route,
    cookies,
    mainView.name,
    loginView.name,
    newTaskView.name,
    updateTaskView.name
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
