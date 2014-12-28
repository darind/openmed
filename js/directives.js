(function () {
'use strict';
    var moment = require('moment'),
        app    = angular.module('patientsApp');

    app.directive('ngUnique', ['$routeParams', 'patientsService', function ($routeParams, patientsService) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                elem.on('blur', function (evt) {
                    scope.$apply(function () {
                        ctrl.$setValidity('unique', true);

                        if (!ctrl.$valid) {
                            return;
                        }

                        var egn = elem.val();
                        if (scope.origEGN && scope.origEGN != egn) {
                            var patient = patientsService.find({ egn: egn });
                            ctrl.$setValidity('unique', patient == null);
                        } else if (!scope.origEGN) {
                            var patient = patientsService.find({ egn: egn });
                            ctrl.$setValidity('unique', patient == null);
                        }
                    });
                });
            }
        };
    }]);

    app.directive('awDatepickerPattern', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function(value) {
                    if (typeof value === 'string') {
                        var date = moment(value, attrs.awDatepickerPattern, true);
                        var isValid = date.isValid();
                        ngModelCtrl.$setValidity('date', isValid);
                        if (!isValid) {
                            return undefined;
                        }
                    }

                    return value;
                });
            }
        };
    });
})();