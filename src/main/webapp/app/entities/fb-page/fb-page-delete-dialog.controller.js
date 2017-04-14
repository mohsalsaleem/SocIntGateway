(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('FbPageDeleteController',FbPageDeleteController);

    FbPageDeleteController.$inject = ['$uibModalInstance', 'entity', 'FbPage'];

    function FbPageDeleteController($uibModalInstance, entity, FbPage) {
        var vm = this;

        vm.fbPage = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FbPage.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
