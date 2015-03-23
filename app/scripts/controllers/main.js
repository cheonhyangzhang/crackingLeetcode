'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('MainCtrl', function ($scope) {

    gapi.client.crackingleetcode.solution.list({'account':$scope.user.email}).execute(function(resp) {
      console.log("resp");
      $scope.solutions = resp.solutions;
      $scope.$apply();
    });


  });
