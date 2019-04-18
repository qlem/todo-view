const app = angular.module('todoApp', [])

app.controller('myCtrl', ($scope) => {
    $scope.msg = "hello world!"
})
