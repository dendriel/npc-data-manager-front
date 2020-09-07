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
                // NPCS
                .when('/npc/list', {
                    template: '<npc-list></npc-list>'
                })
                .when('/npc/edit', {
                    template: '<npc-edit></npc-edit>'
                })
                // ENEMIES
                .when('/enemy/list', {
                    template: '<enemy-list></enemy-list>'
                })
                .when('/enemy/edit', {
                    template: '<enemy-edit></enemy-edit>'
                })
                // ITEMS
                .when('/item/list', {
                    template: '<item-list></item-list>'
                })
                .when('/item/edit', {
                    template: '<item-edit></item-edit>'
                })
                .otherwise('/dashboard');
        }
    ]);
