(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .controller('FbPageDialogController', FbPageDialogController);

    FbPageDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'FbPage', 'Cover', 'CategoryList'];

    function FbPageDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, FbPage, Cover, CategoryList) {
        var vm = this;

        vm.fbPage = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.covers = Cover.query({filter: 'fbpage-is-null'});
        $q.all([vm.fbPage.$promise, vm.covers.$promise]).then(function() {
            if (!vm.fbPage.coverId) {
                return $q.reject();
            }
            return Cover.get({id : vm.fbPage.coverId}).$promise;
        }).then(function(cover) {
            vm.covers.push(cover);
        });
        vm.categorylists = CategoryList.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.fbPage.id !== null) {
                FbPage.update(vm.fbPage, onSaveSuccess, onSaveError);
            } else {
                FbPage.save(vm.fbPage, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('socIntGatewayApp:fbPageUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.createdAt = false;
        vm.datePickerOpenStatus.updatedAt = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
