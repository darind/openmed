(function () {
'use strict';
    angular.module('patientsApp').controller('patientsController', function ($scope, $location, $modal, patientsService) {
        $scope.headerSrc = "tmpl/header.html";
        $scope.patients = patientsService.findAll();

        $scope.delete = function(patient) {
            $modal.open({
                templateUrl: 'tmpl/confirm.html',
                controller: 'confirmDialogController',
                resolve: {
                    patient: function() {
                        return patient;
                    }
                }
            }).result.then(function(res) {
                patientsService.delete(patient.id);
                $scope.patients.splice($scope.patients.indexOf(patient), 1);
            });
        };
    });
})();