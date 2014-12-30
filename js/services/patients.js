(function () {
'use strict';
    var uuid  = require('uuid'),
        gui = require('nw.gui'),
        patients = null;

    angular.module('patientsApp').factory('patientsService', ['$modal', '$q', '$timeout', function ($modal, $q, $timeout) {
        return {
            init: function(next) {
                var deferred = $q.defer();
                var $that = this;
                if (patients) {
                    $timeout(function() {
                        deferred.resolve(next.call($that, patients));
                    }, 0);
                } else {
                    $modal.open({
                        templateUrl: 'tmpl/password.html',
                        controller: 'passwordController',
                        size: 'md',
                        backdropClass: 'backdrop',
                        backdrop: 'static',
                        resolve: { 
                            nextFn: function() { 
                                return function(p) {
                                    patients = p;
                                    deferred.resolve(next.call($that, patients));
                                }; 
                            } 
                        }
                    }).result.then(function(password) { }, gui.App.quit);
                }
                return deferred.promise;
            },
            findAll: function() {
                return patients.cloneDeep().sortBy('name').value();
            },
            find: function(crit) {
                return patients.find(crit).value();
            },
            insert: function(patient) {
                patient.id = uuid();
                var existing = patients.find({ egn: patient.egn });
                if (existing.value()) {
                    return null;
                }

                patients.push(patient);

                processPatient(patient);
                
                return patient;
            },
            update: function(patient) {
                var existing = patients.find({ egn: patient.egn });
                if (!existing.value()) {
                    return false;
                }

                existing.assign(patient);

                processPatient(patient);

                return true;
            },
            delete: function(id) {
                patients.remove({ id: id });
            }
        };
    }]);

    function processPatient(patient) {
        if (patient.firstVisit && patient.firstVisit instanceof Date) {
            patient.firstVisit = patient.firstVisit.toISOString();
        }
    }
})();