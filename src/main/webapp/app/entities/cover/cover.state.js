(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('cover', {
            parent: 'entity',
            url: '/cover?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Covers'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cover/covers.html',
                    controller: 'CoverController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }]
            }
        })
        .state('cover-detail', {
            parent: 'cover',
            url: '/cover/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Cover'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cover/cover-detail.html',
                    controller: 'CoverDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Cover', function($stateParams, Cover) {
                    return Cover.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'cover',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('cover-detail.edit', {
            parent: 'cover-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cover/cover-dialog.html',
                    controller: 'CoverDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cover', function(Cover) {
                            return Cover.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cover.new', {
            parent: 'cover',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cover/cover-dialog.html',
                    controller: 'CoverDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                fbId: null,
                                source: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('cover', null, { reload: 'cover' });
                }, function() {
                    $state.go('cover');
                });
            }]
        })
        .state('cover.edit', {
            parent: 'cover',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cover/cover-dialog.html',
                    controller: 'CoverDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cover', function(Cover) {
                            return Cover.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cover', null, { reload: 'cover' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cover.delete', {
            parent: 'cover',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cover/cover-delete-dialog.html',
                    controller: 'CoverDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Cover', function(Cover) {
                            return Cover.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cover', null, { reload: 'cover' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
