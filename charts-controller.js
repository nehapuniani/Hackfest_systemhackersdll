(function () {
    'use strict';

    
    angular.module('systemhackerdll')
        .controller('systemhackerdllChartsController', ChartsController);
    

    ChartsController.$inject = ['$scope', '$log', 'systemhackerdllOitcharts', 'flexgrid'];

    function ChartsController($scope, $log, systemhackerdllOitcharts, flexgrid) {
       var vm = this;
       vm.flexGrid = null;
       vm.data = {};
          
       vm.getData = function () {   
           systemhackerdllOitcharts.getCharts()
                .then(function (charts) {
                    $log.info('systemhackerdllChartsController: Charts are loaded');
                    vm.data = new wijmo.collections.CollectionView(charts._embedded.trcs.trcs);
                    //vm.data = charts._embedded.trcs.trcs[0];      
                },
                function (error) {
                    $log.info('systemhackerdllChartsController. Unable to load charts.' + error.data);
                }
            );
       }
      vm.myData = {
    firstname: 'John',
    lastname: 'Doe',
    employer: 'Stackoverflow'
  };
       /*Grid settings*/
        vm.chartsGrid = function () {
             return {
                init: function (s, e) {
                    var grid = s;
                    vm.flexGrid = grid;
                    flexgrid.updateFlexGridRowHeight(grid);
                    grid.allowMerging = wijmo.grid.AllowMerging.Cells;
                    vm.getData();
                    grid.invalidate();
                    
                 },
                settings: {
                    readOnly: true
                }
            };
        }();
    };
    
  
}());
