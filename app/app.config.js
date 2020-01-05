angular
    .module('npcDataManager')
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/npc/list', {
                    template: '<npc-list></npc-list>'
                })
                .when('/npc/edit', {
                    template: '<npc-edit></npc-edit>'
                })
                .when('/npc/export', {
                    template: '<npc-export></npc-export>'
                })
                .otherwise('/npc/list');
        }
    ]);
