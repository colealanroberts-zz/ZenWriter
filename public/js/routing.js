// Declare Angular Routes
var zen = angular.module('zen', [
        'ui.router',
        'ngAnimate'
    ]);

    zen.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

    var templateDir = '../public/templates/';

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: templateDir + 'home.html',
        controller: 'homeCtrl'
    });
});