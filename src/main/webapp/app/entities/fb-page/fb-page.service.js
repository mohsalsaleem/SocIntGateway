(function() {
    'use strict';
    angular
        .module('socIntGatewayApp')
        .factory('FbPage', FbPage);

    FbPage.$inject = ['$resource', 'DateUtils'];

    function FbPage ($resource, DateUtils) {
        var resourceUrl =  'socintfacebookservice/' + 'api/fb-pages/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.createdAt = DateUtils.convertLocalDateFromServer(data.createdAt);
                        data.updatedAt = DateUtils.convertLocalDateFromServer(data.updatedAt);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.createdAt = DateUtils.convertLocalDateToServer(copy.createdAt);
                    copy.updatedAt = DateUtils.convertLocalDateToServer(copy.updatedAt);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.createdAt = DateUtils.convertLocalDateToServer(copy.createdAt);
                    copy.updatedAt = DateUtils.convertLocalDateToServer(copy.updatedAt);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
