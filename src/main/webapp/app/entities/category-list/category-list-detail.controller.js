(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('CategoryListDetailController', CategoryListDetailController);

    CategoryListDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'CategoryList', 'FbPage'];

    function CategoryListDetailController($scope, $rootScope, $stateParams, previousState, entity, CategoryList, FbPage) {
        var vm = this;

        vm.categoryList = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('socIntGatewayApp:categoryListUpdate', function(event, result) {
            vm.categoryList = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
