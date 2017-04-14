(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('FbPageDetailController', FbPageDetailController);

    FbPageDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FbPage', 'Cover', 'CategoryList'];

    function FbPageDetailController($scope, $rootScope, $stateParams, previousState, entity, FbPage, Cover, CategoryList) {
        var vm = this;

        vm.fbPage = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('socIntGatewayApp:fbPageUpdate', function(event, result) {
            vm.fbPage = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
