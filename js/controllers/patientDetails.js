(function () {
'use strict';
    angular.module('patientsApp').controller('patientDetailsController', function ($scope, $location, $routeParams, $window, patientsService) {
        var id = $routeParams.id;
        if (id) {
            $scope.patient = patientsService.find({ id: id });
            $scope.origEGN = angular.copy($scope.patient.egn);
        }

        $scope.save = function(patient) {
            if (!id) {
                patientsService.insert(patient)
            } else {
                patientsService.update(patient);
            }

            $location.path('/');
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
  	});
})();