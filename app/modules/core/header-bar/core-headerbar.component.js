'use strict';

function HeaderBarController($location, $route, NpcHandlerSharedDataService) {
    let self = this;

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
        if (window.location.href.indexOf(newRoute) !== -1) {
            NpcHandlerSharedDataService.setParam("npc", null);
            $route.reload();
        } else {
            $location.path(newRoute);
        }
    };
}


angular
    .module('core')
    .component('headerBar', {
        templateUrl: 'modules/core/header-bar/core-headerbar.template.html',
        controller: ['$location', '$route', 'NpcHandlerSharedDataService', HeaderBarController]
    });
