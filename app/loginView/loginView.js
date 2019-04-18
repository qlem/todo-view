'use strict'

angular.module('todoApp.loginView', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'loginView/loginView.html',
    controller: 'loginCtrl'
  })
}])

.controller('loginCtrl', ['$scope', function ($scope) {
    $scope.msg = 'login view'
}])
