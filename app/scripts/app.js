'use strict';

/**
 * @ngdoc overview
 * @name crackingLeetcodeApp
 * @description
 * # crackingLeetcodeApp
 *
 * Main module of the application.
 */
angular
  .module('crackingLeetcodeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'monospaced.elastic',
    'nya.bootstrap.select',
    'ngTagsInput',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile/ranking', {
        templateUrl: 'views/profileRanking.html',
        controller: 'ProfileRankingCtrl'
      })
      .when('/profile/:useremail', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/:useremail/:type/solutions', {
        templateUrl: 'views/solutions.html',
        controller: 'SolutionsCtrl'
      })// will be deprecated
      .when('/:useremail/:type/solution/:no', {
        templateUrl: 'views/solution.html',
        controller: 'SolutionCtrl'
      })
      .when('/admin/problem/new', {
        templateUrl: 'views/adminProblemNew.html',
        controller: 'AdminProblemNewCtrl'
      })
      .when('/admin/:type/problems', {
        templateUrl: 'views/adminProblems.html',
        controller: 'AdminProblemsCtrl'
      })
      .when('/:useremail/:type/problems', {
        templateUrl: 'views/problems.html',
        controller: 'ProblemsCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/:type/problem/:no', {
        templateUrl: 'views/adminProblem.html',
        controller: 'AdminProblemCtrl'
      })
      .when('/solution/new', {
        templateUrl: 'views/solution_new.html',
        controller: 'SolutionNewCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/unauthorized', {
        templateUrl: 'views/unauthorized.html',
        controller: 'UnauthorizedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
