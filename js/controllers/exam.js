(function () {
'use strict';
    angular.module('patientsApp').controller('examController', function ($scope, $modalInstance, exam) {
        $scope.exam = angular.copy(exam);

        if (!$scope.exam) {
            $scope.exam = {
                date: new Date().toISOString()
            };
        }

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.save = function(exam) {
            if (exam.date && exam.date instanceof Date) {
                exam.date = exam.date.toISOString();
            }
            $modalInstance.close(exam);
        };

        $scope.close = function() {
            $modalInstance.dismiss('no');
        };
    });
})();