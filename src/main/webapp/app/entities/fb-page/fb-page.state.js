(function() {
    'use strict';

    angular
        .module('socIntGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('fb-page', {
            parent: 'entity',
            url: '/fb-page?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'FbPages'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fb-page/fb-pages.html',
                    controller: 'FbPageController',
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
                }],
            }
        })
        .state('fb-page-detail', {
            parent: 'fb-page',
            url: '/fb-page/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'FbPage'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fb-page/fb-page-detail.html',
                    controller: 'FbPageDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'FbPage', function($stateParams, FbPage) {
                    return FbPage.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'fb-page',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('fb-page-detail.edit', {
            parent: 'fb-page-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fb-page/fb-page-dialog.html',
                    controller: 'FbPageDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FbPage', function(FbPage) {
                            return FbPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fb-page.new', {
            parent: 'fb-page',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fb-page/fb-page-dialog.html',
                    controller: 'FbPageDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                fbName: null,
                                fbID: null,
                                accessToken: null,
                                category: null,
                                description: null,
                                isPublished: null,
                                link: null,
                                userName: null,
                                createdAt: null,
                                updatedAt: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('fb-page', null, { reload: 'fb-page' });
                }, function() {
                    $state.go('fb-page');
                });
            }]
        })
        .state('fb-page.edit', {
            parent: 'fb-page',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fb-page/fb-page-dialog.html',
                    controller: 'FbPageDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FbPage', function(FbPage) {
                            return FbPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fb-page', null, { reload: 'fb-page' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fb-page.delete', {
            parent: 'fb-page',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fb-page/fb-page-delete-dialog.html',
                    controller: 'FbPageDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FbPage', function(FbPage) {
                            return FbPage.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fb-page', null, { reload: 'fb-page' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
