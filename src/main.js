'use strict'

import angular from 'angular'
import route from 'angular-route'
import cookies from 'angular-cookies'
import animate from 'angular-animate'
import toaster from 'angularjs-toaster'
import mainView from './todoView/todo.js'
import loginView from './loginView/login.js'
import newTaskView from './newTaskView/newTask.js'
import updateTaskView from './updateTaskView/updateTask.js'
import 'angularjs-toaster/toaster.min.css'
import './main.styl'

const app = angular.module('app', [
    route,
    cookies,
    animate,
    toaster,
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
