(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('CoverDeleteController',CoverDeleteController);

    CoverDeleteController.$inject = ['$uibModalInstance', 'entity', 'Cover'];

    function CoverDeleteController($uibModalInstance, entity, Cover) {
        var vm = this;

        vm.cover = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Cover.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
