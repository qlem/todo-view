'use strict'

const app = angular.module('todoApp', ['ngRoute', 'todoApp.mainView', 'todoApp.loginView'])

app.config(function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'})
})
