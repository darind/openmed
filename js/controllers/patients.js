(function () {
'use strict';
    angular.module('patientsApp').controller('patientsController', function ($scope, $location, $modal, patientsService) {
        $scope.patients = patientsService.findAll();

        $scope.delete = function(patient) {
            $modal.open({
                templateUrl: 'tmpl/confirm.html',
                controller: 'confirmDialogController',
                backdropClass: 'backdrop',
                backdrop: 'static',
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

        $scope.firstVisit = function(patient) {
            if (!patient.examinations) {
                return { };
            }

            return patient.examinations.reduce(function(a, b) {
                if (new Date(a.date) < new Date(b.date)) {
                    return a;
                }

                return b;
            });
        }
    });
})();