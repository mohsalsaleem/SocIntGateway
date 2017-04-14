(function() {
    'use strict';
    angular
        .module('socIntGatewayApp')
        .factory('Cover', Cover);

    Cover.$inject = ['$resource'];

    function Cover ($resource) {
        var resourceUrl =  'socintfacebookservice/' + 'api/covers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
