(function () {
'use strict';
    angular.module('patientsApp').config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'tmpl/home.html',
                controller: 'patientsController'
            }).when('/edit/:id?', {
                templateUrl: 'tmpl/patient.html',
                controller: 'patientDetailsController'
            }).otherwise({
                redirectTo: '/'
            });
    });
})();