(function () {
'use strict';
    angular.module('patientsApp').controller('confirmDialogController', ['$scope', '$modalInstance', 'patient', function($scope, $modalInstance, patient) {
        $scope.patient = patient;

        $scope.no = function() {
            $modalInstance.dismiss('no');
        };
        
        $scope.yes = function() {
            $modalInstance.close('yes');
        };
    }]);    
})();