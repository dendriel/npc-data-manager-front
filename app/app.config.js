angular
    .module('npcDataManager')
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                // Core
                .when('/login', {
                    template: '<login></login>'
                })
                .when('/dashboard', {
                    template: '<dashboard></dashboard>'
                })
                .when('/core/importExport/:action/:entity/:file_name', {
                    template: '<import-export></import-export>'
                })
                .when('/list/:entity', {
                    template: '<entity-list></entity-list>'
                })
                .when('/npc/edit', {
                    template: '<npc-edit></npc-edit>'
                })
                .when('/enemy/edit', {
                    template: '<enemy-edit></enemy-edit>'
                })
                .when('/item/edit', {
                    template: '<item-edit></item-edit>'
                })
                .otherwise('/dashboard');
        }
    ]);
