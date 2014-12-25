(function () {
'use strict';

    var low      = require('lowdb'),
        uuid     = require('uuid'),
        db       = low('patients.json'),
        patients = db('patients');

    angular.module('patientsApp').factory('patientsService', function () {
        return {
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
    });

    function processPatient(patient) {
        if (patient.firstVisit && patient.firstVisit instanceof Date) {
            patient.firstVisit = patient.firstVisit.toISOString();
        }
    }
})();