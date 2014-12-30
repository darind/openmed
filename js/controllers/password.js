(function () {
'use strict';
    var fs     = require('fs'),
        dbFile = 'patients.db',
        low    = require('./js/lowdb_mod');

    var app = angular.module('patientsApp');
    app.controller('passwordController', ['$scope', '$modalInstance', 'nextFn', function($scope, $modalInstance, nextFn) {
        $scope.isNew = !fs.existsSync(dbFile);
        $scope.password = '';

        $scope.yes = function() {
            try {
                var db = low(dbFile, { algorithm: 'aes256', key: $scope.password });
                nextFn(db('patients'));
                $modalInstance.close();
            } catch (e) {
                $scope.invalid = true;
            }
        };

        $scope.no = function() {
            $modalInstance.dismiss();
        };

        $scope.change = function() {
            $scope.invalid = false;
        };
    }]);
})();