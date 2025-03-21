(function() {
    'use strict';
    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Welcome to Our Restaurant</h1><a ui-sref="categories">See Menu Categories</a>'
            })
            .state('categories', {
                url: '/categories',
                controller: 'CategoriesController as categoriesCtrl',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                },
                template: '<categories categories="$resolve.categories.data"></categories>'
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                },
                template: '<items items="$resolve.items.data"></items>'
            });
    }
})();
