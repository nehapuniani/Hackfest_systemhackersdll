(function () {
    'use strict';
    
    angular.module('systemhackerdll')
        .service('flexgrid', Flexgrid);
    
    Flexgrid.$inject = ['$rootScope', '$timeout'];
    function Flexgrid ($rootScope, $timeout) {
    var self = this;
        var ON_MULTI_SELECT = 'onMultiSelect';
        this.multiSelectPanelObj = {}
        this.setUpMultiSelect = function(panel, r, c, cell, binding) {
            var flex = panel.grid;
            var col = flex.columns[c];
            // check that this is a boolean column
            if (col && col.dataType == wijmo.DataType.Boolean && col.binding === binding) {
                if (panel.cellType == wijmo.grid.CellType.ColumnHeader) {
                    // prevent sorting on click
                    col.allowSorting = false;
                    // count true values to initialize checkbox
                    var cnt = 0;
                    for (var i = 0; i < flex.rows.length; i++) {
                        if (flex.getCellData(i, c) == true) cnt++;
                    }
                    // create and initialize checkbox
                    cell.innerHTML = '<input type="checkbox"> ';
                    var cb = cell.firstChild;
                    cb.checked = cnt > 0;
                    cb.indeterminate = cnt > 0 && cnt < flex.rows.length;

                    cb.removeEventListener('click', __cbListener);
                    cb.addEventListener('click', __cbListener);

                    //Set up custom sorting for checkbox column
                    cell.removeEventListener('click', __cellListener);
                    cell.addEventListener('click', __cellListener);
                    self.multiSelectPanelObj = {
                        panel: panel,
                        r: r,
                        c: c,
                        cell: cell,
                        flex: flex,
                        col: col,
                        cb: cb
                    }
                }
                cell.className += ' col-select';

            }
        };

        function __cbListener(e) {
            e.stopPropagation();

            self.multiSelectPanelObj.flex.beginUpdate();
            for (var i = 0; i < self.multiSelectPanelObj.flex.rows.length; i++) {
                    self.multiSelectPanelObj.flex.setCellData(i, self.multiSelectPanelObj.c, self.multiSelectPanelObj.cb.checked);
            }
            self.multiSelectPanelObj.flex.endUpdate();
            self.multiSelect(self.multiSelectPanelObj.cb.checked);
        }

        function __cellListener(e) {
            // $scope.sortingColumn(flex, {
            //     col: col.index
            // });
            //$scope.ctx.flexGrid.autoSizeColumns();
        }
        this.multiSelect = function(checked) {
            $rootScope.$broadcast(ON_MULTI_SELECT, {
                checked: checked
            });
        }
        this.onMultiSelect = function($scope, handler) {
            $scope.$on(ON_MULTI_SELECT, function(event, message) {
                handler(message);
            });
        }


        this.updateFlexGridRowHeight = function (grid) {
            grid.rows.defaultSize = 37;
            for (var i = 0, total = grid.columnHeaders.rows.length; i < total; i++) {
                grid.columnHeaders.rows[i].height = 48;
            }
        };

        this.setUpRowHeader = function(panel, r, c, cell) {
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.style.textAlign = 'right';
                cell.textContent = (r + 1).toString();
            }
        };
        this.initFilters = function(grid, gridFilter, filteredCols) {
            if (!gridFilter) {
                gridFilter = new wijmo.grid.filter.FlexGridFilter(grid);
                // gridFilter.filterColumns = filteredCols;
                // grid.autoSizeColumns();
                self.toggleFilter(false, gridFilter, filteredCols);
            }
            return gridFilter;
        };
        this.setUpActions = function(panel, r, c, cell, header) {
            var col = panel.columns[c];
            if (col.header === header) {
                cell.className += " cell-actions";
            }
        };
        this.addClassToColumnByHeader = function(panel, r, c, cell, header, className) {
            var col = panel.columns[c];
            if (col.header === header) {
                cell.className += " " + className;
            }
        };
        this.addClassToColumnByBinding = function(panel, r, c, cell, binding, className) {
            var col = panel.columns[c];
            if (col.binding === binding) {
                cell.className += " " + className;
            }
        };

        this.setUpColumnVisibility = function(flex, colBindings, colNum) {
            if (flex && colBindings.length > 0) {
                var columnBindingsToggle = [];
                var columnVis = {};
                // var colBindings = Object.keys(data[0]);
                var ttl = colBindings.length;
                var cols = colNum ? colNum : 5;
                var rows = Math.ceil(ttl / cols);
                var count = 0;
                for (var i = 0; i < cols; i++) {
                    columnBindingsToggle[i] = [];
                    for (var j = 0; j < rows; j++) {
                        columnBindingsToggle[i][j] = colBindings[count];
                        count++;
                        if (count >= ttl) {
                            break;
                        }
                    }
                }
                for (var i = 0; i < colBindings.length; i++) {
                    columnVis[colBindings[i].binding] = true;
                }
                return {
                    columnBindingsToggle: columnBindingsToggle,
                    columnVis: columnVis
                }
            }
        }

        this.toggleFilter = function(filtersHidden, gridFilter, filteredCols) {
            //if flexgrid available
            if (gridFilter) {
                //get FlexGridFilter, defined in initGrid
                var f = gridFilter;
                if (f) {
                    //iterate through columns to filtered
                    for (var i = 0, il = filteredCols.length; i < il; i++) {
                        //get column and column filter
                        var col = f.grid.columns.getColumn(filteredCols[i].binding),
                            cf = col ? f.getColumnFilter(col, true) : {};
                        //switch filterType to 0 if filters hidden, otherwise to filterType defined in model
                        cf.filterType = filtersHidden ? 0 : filteredCols[i].filterType;
                    }

                }
                //refresh grid
                f.grid.refresh();
            }

        }


    }
    
}());