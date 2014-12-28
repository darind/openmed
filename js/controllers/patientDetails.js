(function () {
'use strict';
    var app = angular.module('patientsApp');
    app.controller('patientDetailsController', ['$scope', '$location', '$routeParams', '$modal', 'patientsService', function ($scope, $location, $routeParams, $modal, patientsService) {
        var id = $routeParams.id;
        if (id) {
            $scope.patient = angular.copy(patientsService.find({ id: id }));
            $scope.origEGN = angular.copy($scope.patient.egn);
        } else {
            $scope.patient = { 
                name: '',
                egn: ''
            };
        }

        $scope.save = function(patient) {
            if (!id) {
                patientsService.insert(patient)
            } else {
                patientsService.update(patient);
            }

            $location.path('/');
        };

        $scope.addExam = function(patient) {
            showExamDialog($modal, null, patient, function(newExam) {
                if (!patient.examinations) {
                    patient.examinations = [];
                }
                patient.examinations.push(newExam);
            });
        };

        $scope.editExam = function(exam, patient) {
            showExamDialog($modal, exam, patient, function(updatedExam) {
                for (var key in updatedExam) {
                    if (updatedExam.hasOwnProperty(key)) {
                        exam[key] = updatedExam[key];
                    }
                }
            });
        };

        $scope.deleteExam = function(exam) {
            var exams = $scope.patient.examinations;
            exams.splice(exams.indexOf(exam), 1);
        };
  	}]);

    function showExamDialog(modal, exam, patient, next) {
        modal.open({
            templateUrl: 'tmpl/exam.html',
            controller: 'examController',
            size: 'lg',
            backdropClass: 'backdrop',
            backdrop: 'static',
            resolve: {
                exam: function() { return exam; },
                patient: function() { return patient; }
            }
        }).result.then(next);
    }
})();