(function () {
    'use strict';
    
    angular.module('systemhackerdll')
    .service('systemhackerdllOitcharts', oitcharts);
    
     oitcharts.$inject = ['$stateParams', '$http', '$log'];

    function oitcharts ($stateParams, $http, $log) {
        var data = {
             getCharts: function () {
                $log.info('Get OIT charts');
                return $http({
                    method: 'GET',
                    url: 'https://usit-chart-dev.api.int.thomsonreuters.com/TccCharts/E45V010100000U9E',
                    headers :{
                        'Accept': 'application/hal+json',
                        'Firm': 'E45V',
                        'Account': 'E45V',
                        'UserName': 'U0041861_E45V_PD1_new'
                    }
                })
                    .then(
                        function (charts) {
                            $log.info('systemhackerdllOitcharts service: ' + charts.data);
                            return (charts.data);
                        })
                    
                }
            }
        return data;
        }
}());
