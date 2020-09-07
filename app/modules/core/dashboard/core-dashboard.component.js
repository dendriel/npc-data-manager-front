'use strict';

function DashboardController($location, CoreGenericService) {
    let self = this;

    self.npc = {
        count: 0,
        list: () => { self.changeRoute("/npc/list") }
    };

    self.item = {
        count: 0,
        list: () => { self.changeRoute("/item/list") }
    };

    self.enemy = {
        count: 0,
        list: () => { self.changeRoute("/enemy/list") }
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

    CoreGenericService
        .getAll('enemy')
        .then(res => {
            self.enemy.count = res.data.length;
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
                image: "images\\merchant01.png",
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
        },
        {
            data: self.enemy,
            legend: "Enemies",
            bgcolor: "#f8d7da",
            icon: {
                image: "images\\bandit01.png",
                w: 80, h: 80
            },
        }
    ]
}

angular
    .module('core')
    .component('dashboard', {
        templateUrl: "modules/core/dashboard/core-dashboard.template.html",
        controller: ['$location', 'CoreGenericService', DashboardController]
    });
