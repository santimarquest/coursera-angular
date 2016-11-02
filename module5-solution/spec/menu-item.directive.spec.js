describe('validMenuItem directive', function () {
    var $compile, $rootScope, $httpBackend, form,
        existentShortNameCategoryResponse = {
            "id":1,
            "short_name":"A1",
            "name":"Won Ton Soup with Chicken",
            "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
            "price_small":2.55,
            "price_large":5.0,
            "small_portion_name":"pint",
            "large_portion_name":"quart",
            "created_at":"2016-10-25T22:13:54.127Z",
            "updated_at":"2016-10-25T22:13:54.127Z",
            "category_short_name":"A",
            "image_present":true
        },
        nonExistentShortNameCategoryResponse = {
            "status":"500",
            "error":"Internal Server Error"
        };

    beforeEach(module('public'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(function () {
        
        var element = angular.element(
            '<form name="form">' +
                '<input type="text" ng-model="user.favorite_dish" name="favorite_dish" valid-menu-item>' +
            '</form>'
        );

        $rootScope.user = {favorite_dish: ""};
        $compile(element)($rootScope);
        $rootScope.$digest();
        form = $rootScope.form;

    });


    it('should pass with valid dish', function () {
        $httpBackend.whenGET("https://amt-coursera-spa-angular.herokuapp.com/menu_items/A1.json")
                    .respond(existentShortNameCategoryResponse);
        
        form.favorite_dish.$setViewValue('A1');
        $httpBackend.flush();
        
        expect($rootScope.user.favorite_dish).toEqual('A1');
        expect(form.favorite_dish.$valid).toBe(true);
        
    });
    
    it('should not pass with an invalid dish', function () {
        $httpBackend.whenGET("https://amt-coursera-spa-angular.herokuapp.com/menu_items/X.json")
                    .respond(nonExistentShortNameCategoryResponse);
        
        form.favorite_dish.$setViewValue('X');
        $httpBackend.flush();
        
        expect($rootScope.user.favorite_dish).not.toBeDefined();
        expect(form.favorite_dish.$valid).toBe(false);
        
    });

    



});
