(function () {
'use strict';
    var gui = require('nw.gui');
	gui.Window.get().maximize();

    angular.module('patientsApp', [ 'ngRoute', 'ui.bootstrap', 'smart-table' ]);
})();