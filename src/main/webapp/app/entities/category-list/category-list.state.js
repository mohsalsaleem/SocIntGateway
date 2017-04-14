(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('category-list', {
            parent: 'entity',
            url: '/category-list',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'CategoryLists'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/category-list/category-lists.html',
                    controller: 'CategoryListController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('category-list-detail', {
            parent: 'category-list',
            url: '/category-list/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'CategoryList'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/category-list/category-list-detail.html',
                    controller: 'CategoryListDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'CategoryList', function($stateParams, CategoryList) {
                    return CategoryList.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'category-list',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('category-list-detail.edit', {
            parent: 'category-list-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category-list/category-list-dialog.html',
                    controller: 'CategoryListDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CategoryList', function(CategoryList) {
                            return CategoryList.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('category-list.new', {
            parent: 'category-list',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category-list/category-list-dialog.html',
                    controller: 'CategoryListDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                fbId: null,
                                category: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('category-list', null, { reload: 'category-list' });
                }, function() {
                    $state.go('category-list');
                });
            }]
        })
        .state('category-list.edit', {
            parent: 'category-list',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category-list/category-list-dialog.html',
                    controller: 'CategoryListDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CategoryList', function(CategoryList) {
                            return CategoryList.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('category-list', null, { reload: 'category-list' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('category-list.delete', {
            parent: 'category-list',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/category-list/category-list-delete-dialog.html',
                    controller: 'CategoryListDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['CategoryList', function(CategoryList) {
                            return CategoryList.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('category-list', null, { reload: 'category-list' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
