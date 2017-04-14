(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('CoverDialogController', CoverDialogController);

    CoverDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Cover'];

    function CoverDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Cover) {
        var vm = this;

        vm.cover = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.cover.id !== null) {
                Cover.update(vm.cover, onSaveSuccess, onSaveError);
            } else {
                Cover.save(vm.cover, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('socIntGatewayApp:coverUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
