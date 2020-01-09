'use strict';

function DashboardController($location, NpcHandlerService) {
    let self = this;

    self.npc = {
        count: 0,
        list: () => { self.changeRoute("/npc/list") }
    };

    NpcHandlerService
        .getAll()
        .then(res => {
            self.npc.count = res.data.length;
        });

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
    };
}

angular
    .module('core')
    .component('dashboard', {
    templateUrl: "modules/core/dashboard/core-dashboard.template.html",
    controller: ['$location', 'NpcHandlerService', DashboardController]
});
