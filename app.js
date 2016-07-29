'use strict';

// Declare the application module. In this case, the module is named 'systemhackerdll'.
angular.module('systemhackerdll', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'pascalprecht.translate',
    'fef',
    'bento.modern',
    'wj',
    'tmh.dynamicLocale',
    'systemhackerdll-templates'
])
    .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    
    .state('charts', {
        url: '/systemhackerdll/charts' ,
        templateUrl: 'js/components/oitcharts/charts-view.html',
        controller: 'systemhackerdllChartsController' ,
        controllerAs: 'vm'
    })
    .state('systemhackerdllHome', {
            url: '/systemhackerdll/home',
            templateUrl: 'js/components/home/systemhackerdll-view.html',
            controller:  'systemhackerdllHomeController',
            controllerAs: 'systemhackerdll'
        });
    

    

    if(typeof(LoneStar) !== 'object') {
    
        $urlRouterProvider.otherwise('/systemhackerdll/charts');
    
    }
    }])
    .config(['$translateProvider', function ($translateProvider) {
        if(typeof(LoneStar) !== 'object') {
            $translateProvider.useStaticFilesLoader({
                
                prefix: '/languages/systemhackerdll-',
                
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');
        }
    }]);