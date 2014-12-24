(function () {
'use strict';
    angular.module('patientsApp').filter('patientFilter', function() {
        return function(patients, search) {
            if (!search) {
                return patients;
            }

            return patients.filter(function (item) {
                var searchRegex = new RegExp(search, 'i');
                return searchRegex.test(item.name) || searchRegex.test(item.egn);
            });
        };
    });
})();