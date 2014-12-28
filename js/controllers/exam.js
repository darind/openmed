(function () {
'use strict';
    var app = angular.module('patientsApp');
    app.controller('examController', ['$scope', '$modalInstance', 'exam', 'patient', function ($scope, $modalInstance, exam, patient) {
        $scope.exam = angular.copy(exam);
        $scope.patient = patient;

        if (!$scope.exam) {
            $scope.exam = {
                date: new Date().toISOString()
            };
        }

        $scope.exam.isPrimary = isPrimary(patient, $scope.exam);

        $scope.$watch('exam.date', function(newValue, oldValue) {
            $scope.exam.isPrimary = isPrimary(patient, $scope.exam);
        });        

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

        $scope.print = function() {
            window.print();
        };
    }]);

    function isPrimary(patient, exam) {
        var lastPrimary = getLastPrimary(patient, exam);
        if (!lastPrimary) {
            return true;
        }

        var diff = Math.abs(dateDiffInDays(new Date(exam.date), new Date(lastPrimary.date)));
        if (diff > 30) {
            return true;
        }

        return false;
    }

    function getLastPrimary(patient, exam) {
        var result = null;

        if (!patient.examinations) {
            return result;
        }

        var sortedExams = angular.copy(patient.examinations);
        sortedExams.sort(function(a, b) {
            var aDate = new Date(a.date);
            var bDate = new Date(b.date);
            if (aDate < bDate) {
                return 1;
            } else if (aDate > bDate) {
                return -1;
            }
            return  0;
        });

        var examDate = new Date(exam.date);
        for (var i = 0; i < sortedExams.length; i++) {
            var current = sortedExams[i];
            if (current.isPrimary === true && new Date(current.date) < examDate) {
                return current;
            }
        }

        return result;
    }

    var _MS_PER_DAY = 1000 * 60 * 60 * 24;

    function dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }    
})();