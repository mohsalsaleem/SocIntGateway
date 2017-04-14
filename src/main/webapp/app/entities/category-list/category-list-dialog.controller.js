(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('CategoryListDialogController', CategoryListDialogController);

    CategoryListDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'CategoryList', 'FbPage'];

    function CategoryListDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, CategoryList, FbPage) {
        var vm = this;

        vm.categoryList = entity;
        vm.clear = clear;
        vm.save = save;
        vm.fbpages = FbPage.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.categoryList.id !== null) {
                CategoryList.update(vm.categoryList, onSaveSuccess, onSaveError);
            } else {
                CategoryList.save(vm.categoryList, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('socIntGatewayApp:categoryListUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
