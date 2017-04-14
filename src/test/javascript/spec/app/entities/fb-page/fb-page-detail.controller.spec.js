'use strict';

describe('Controller Tests', function() {

    describe('FbPage Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockFbPage, MockCover, MockCategoryList;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockFbPage = jasmine.createSpy('MockFbPage');
            MockCover = jasmine.createSpy('MockCover');
            MockCategoryList = jasmine.createSpy('MockCategoryList');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'FbPage': MockFbPage,
                'Cover': MockCover,
                'CategoryList': MockCategoryList
            };
            createController = function() {
                $injector.get('$controller')("FbPageDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'socIntGatewayApp:fbPageUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
