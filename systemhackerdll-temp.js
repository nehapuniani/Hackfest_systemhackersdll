angular.module('systemhackerdll-templates', ['js/components/home/systemhackerdll-view.html', 'js/components/oitcharts/charts-view.html']);

angular.module("js/components/home/systemhackerdll-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/components/home/systemhackerdll-view.html",
    "<h1>Welcome to the Front-end Framework Application Template!</h1>\n" +
    "<h2>Home View</h2>\n" +
    "<p>This Seed Project is meant to assist with the scaffolding of a new project as well as to demonstrate how to use the following features:</p>\n" +
    "\n" +
    "<ul>\n" +
    "	<li>Angular Application Layout</li>\n" +
    "	<li>Project file structuring</li>\n" +
    "	<li>Simple Routing using ngRoute</li>\n" +
    "	<li>Simple MVC Binding</li>\n" +
    "	<li>Custom Directive Structuring &amp; Consumption</li>\n" +
    "	<li>Two-Way Binding</li>\n" +
    "	<li>Template Directive Structuring &amp; Consumption</li>\n" +
    "	<li>Globalization using angular-translate</li>\n" +
    "	<li>Integration &amp; Consumption of the Bento Modern Library</li>\n" +
    "	<li>Karma Unit Test Structuring and Exection</li>\n" +
    "	<li>Grunt Connect Local Web Server</li>\n" +
    "</ul>\n" +
    "\n" +
    "<div id=\"systemhackerdll\">\n" +
    "	<h3>Translation Example: {{ 'SYSTEMHACKERDLL.HOME' | translate }}</h3>\n" +
    "	<p>See the /app/js/components/home/systemhackerdll-view.html file for source code.</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("js/components/oitcharts/charts-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/components/oitcharts/charts-view.html",
    "<div id=\"systemhackerdll\">\n" +
    " <div class=\"bento-container\">\n" +
    "  <div class=\"page-header\">\n" +
    " <h1>Charts</h1>\n" +
    " </div>\n" +
    "\n" +
    "<wj-flex-grid id=\"chartsGrid\" control=\"vm.flexGrid\" initialized=\"vm.chartsGrid.init(s,e)\" items-source=\"vm.data\" class=\"bento-flex-grid\"\n" +
    "                    allow-resizing=\"Both\" defer-resizing=\"true\" selection-mode=\"Row\" allow-merging=\"ColumnHeaders\">\n" +
    "        <wj-flex-grid-cell-template cell-type=\"RowHeader\">{{$row.index+1}}</wj-flex-grid-cell-template>\n" +
    "        <wj-flex-grid-column width=\"*\" id=\"Wj-flex-grid-column0\" header=\"TRC/TCC\" binding=\"trcFormattedNumber\"></wj-flex-grid-column>\n" +
    "        <wj-flex-grid-column width=\"*\" id=\"Wj-flex-grid-column1\" header=\"Descriptiom\" binding=\"trcDescription\">\n" +
    "                <wj-flex-grid-cell-template cell-type=\"Cell\">\n" +
    "                    <a popover-template=\"'popover.html'\" popover-placement=\"right\" popover-trigger=\"mouseenter\" popover-append-to-body=\"true\" >{{$item.trcDescription}}</a>\n" +
    "        </wj-flex-grid-cell-template>\n" +
    "        </wj-flex-grid-column>\n" +
    "        <wj-flex-grid-column width=\"*\" id=\"Wj-flex-grid-column2\" header=\"Tax Return Types\" binding=\"applicableTaxReturnTypes\"></wj-flex-grid-column>\n" +
    "</wj-flex-grid>\n" +
    "\n" +
    "\n" +
    " <script type=\"text/ng-template\" id=\"popover.html\" >\n" +
    "    <div>\n" +
    "        <b>Checkpoint </b <pre>\n" +
    "             \n" +
    "  <div>\n" +
    "    <ul class=\"nav nav-pills\">\n" +
    "      <li role=\"presentation\" class=\"dropdown\">\n" +
    "        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "      All\n" +
    "      <span class=\"caret\"></span>\n" +
    "      </a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "          <li><a href=\"#\">Editorials Materials</a></li>\n" +
    "          <li><a href=\"#\">Primary Source</a></li>\n" +
    "          <li><a href=\"#\">News/Current Awarness</a></li>\n" +
    "          <li role=\"separator\" class=\"divider\"></li>\n" +
    "          <li><a href=\"#\">Related Learning</a></li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "      <li><a href=\"#\">videos</a></li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"links\">\n" +
    "  <li>\n" +
    "    <a href=\"/app/main/doc?usid=1279c8u2477dc&amp;DocID=i3c57f913b4dace50fb33dbd07eefb838&amp;docTid=T0RETGCUR%3A36967.1-1&amp;feature=tcheckpoint&amp;lastCpReqId=2257&amp;searchHandle=i0ace0d1b000001562e38023be9cae755\" target=\"_top\" class=\"title documentLink visited\" aria-label=\"previously viewed 1525 (2014 Corporation) Schedule L, Line 2a. Trade notes and accounts receivable.\">1525 (2014 Corporation) Schedule L, Line 2a. Trade notes and accounts receivable.</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "<a href=\"/app/main/doc?usid=1279c8u2477dc&amp;DocID=i0c6eb318e9f84c0fb8f5d0554bed88ba&amp;docTid=T0RETGCUR%3A36336.1-1&amp;feature=tcheckpoint&amp;lastCpReqId=2257&amp;searchHandle=i0ace0d1b000001562e38023be9cae755\" target=\"_top\" class=\"title documentLink\">603 (2014 Corporation) Schedule L, Line 2a. </a>\n" +
    "    </li>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </pre>\n" +
    "      </div>\n" +
    "</script>\n" +
    " </div>\n" +
    "</div>");
}]);
