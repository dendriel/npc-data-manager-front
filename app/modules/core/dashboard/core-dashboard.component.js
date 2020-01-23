'use strict';

function DashboardController($location, CoreGenericService, sharedData) {
    let self = this;
    sharedData.clear();

    self.npc = {
        count: 0,
        list: () => { self.changeRoute("/npc/list") }
    };

    self.item = {
        count: 0,
        list: () => { self.changeRoute("/item/list") }
    };

    CoreGenericService
        .getAll('npc')
        .then(res => {
            self.npc.count = res.data.length;
        });

    CoreGenericService
        .getAll('item')
        .then(res => {
            self.item.count = res.data.length;
        });

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
    };

    self.elements = [
        {
            data: self.npc,
            legend: "NPCs",
            bgcolor: "#E8F8FF",
            icon: {
                image: "images\\bandit01.png",
                w: 80, h: 80
            },
        },
        {
            data: self.item,
            legend: "Items",
            bgcolor: "#fff3cd",
            icon: {
                image: "images\\icon_iron_dagger.png",
                w: 64, h: 64
            },
        }
    ]
}

angular
    .module('core')
    .component('dashboard', {
    templateUrl: "modules/core/dashboard/core-dashboard.template.html",
    controller: ['$location', 'CoreGenericService', 'CoreSharedDataService', DashboardController]
});
