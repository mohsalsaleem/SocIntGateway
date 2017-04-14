(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('CategoryListDeleteController',CategoryListDeleteController);

    CategoryListDeleteController.$inject = ['$uibModalInstance', 'entity', 'CategoryList'];

    function CategoryListDeleteController($uibModalInstance, entity, CategoryList) {
        var vm = this;

        vm.categoryList = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            CategoryList.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
