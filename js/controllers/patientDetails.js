(function () {
'use strict';
    angular.module('patientsApp').controller('patientDetailsController', function ($scope, $location, $routeParams, $modal, patientsService) {
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

        $scope.print = function(patient) {
            window.print();
        };

        $scope.save = function(patient) {
            if (!id) {
                patientsService.insert(patient)
            } else {
                patientsService.update(patient);
            }

            $location.path('/');
        };

        $scope.addExam = function(patient) {
            showExamDialog($modal, null, function(newExam) {
                if (!patient.examinations) {
                    patient.examinations = [];
                }
                patient.examinations.push(newExam);
            });
        };

        $scope.editExam = function(exam) {
            showExamDialog($modal, exam, function(updatedExam) {
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
  	});

    function showExamDialog(modal, exam, next) {
        modal.open({
            templateUrl: 'tmpl/exam.html',
            controller: 'examController',
            size: 'lg',
            backdropClass: 'backdrop',
            backdrop: 'static',
            resolve: {
                exam: function() { return exam; }
            }
        }).result.then(next);
    }
})();