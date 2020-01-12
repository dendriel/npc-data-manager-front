angular
    .module('npcDataManager')
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/dashboard', {
                    template: '<dashboard></dashboard>'
                })
                // NPCS
                .when('/npc/list', {
                    template: '<npc-list></npc-list>'
                })
                .when('/npc/edit', {
                    template: '<npc-edit></npc-edit>'
                })
                .when('/npc/importExport/:action', {
                    template: '<npc-export></npc-export>'
                })
                // ITEMS
                .when('/item/list', {
                    template: '<item-list></item-list>'
                })
                .otherwise('/dashboard');
        }
    ]);
