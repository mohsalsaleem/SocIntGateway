(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('CoverDetailController', CoverDetailController);

    CoverDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Cover'];

    function CoverDetailController($scope, $rootScope, $stateParams, previousState, entity, Cover) {
        var vm = this;

        vm.cover = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('socIntGatewayApp:coverUpdate', function(event, result) {
            vm.cover = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
