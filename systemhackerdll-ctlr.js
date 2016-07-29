(function () {
    'use strict';

    angular.module('systemhackerdll')
    
    .controller('systemhackerdllHomeController', HomeController);
    

    HomeController.$inject = ['$log'];

    function HomeController($log) {
        this.testableProperty = 'Hello World!';

        $log.info('Primary Controller Loaded.');
    }
}());
