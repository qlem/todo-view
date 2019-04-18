'use strict'

angular.module('todoApp.mainView', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'mainView/mainView.html',
    controller: 'mainCtrl'
  })
}])

.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.msg = 'main view'
}])
