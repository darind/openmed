(function () {
'use strict';
	var app = angular.module('patientsApp');
    app.controller('confirmDialogController', ['$scope', '$modalInstance', 'patient', function($scope, $modalInstance, patient) {
        $scope.patient = patient;

        $scope.no = function() {
            $modalInstance.dismiss('no');
        };
        
        $scope.yes = function() {
            $modalInstance.close('yes');
        };
    }]);
})();