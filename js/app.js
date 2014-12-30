(function () {
'use strict';
    var gui = require('nw.gui');
    gui.Window.get().maximize();

    var app = angular.module('patientsApp', [ 'ngRoute', 'ui.bootstrap', 'smart-table' ]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['patientsApp']);
    });
})();