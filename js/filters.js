(function () {
'use strict';
    var app = angular.module('patientsApp');

    app.filter('patientFilter', function() {
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

    app.filter('truncate', function() {
        return function(text, length) {
            if (text) {
                var ellipsis = text.length > length ? '...' : '';
                return text.slice(0, length) + ellipsis;
            };
            return text;
        }
    });
})();