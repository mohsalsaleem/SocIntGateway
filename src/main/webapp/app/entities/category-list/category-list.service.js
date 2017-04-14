(function() {
    'use strict';
    angular
        .module('socIntGatewayApp')
        .factory('CategoryList', CategoryList);

    CategoryList.$inject = ['$resource'];

    function CategoryList ($resource) {
        var resourceUrl =  'socintfacebookservice/' + 'api/category-lists/:id';

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
