'use strict';

function DashboardController($location, CoreGenericService, sharedData) {
    let self = this;

    self.npc = {
        count: 0,
        list: () => { self.changeRoute("/list/npc") }
    };

    self.item = {
        count: 0,
        list: () => { self.changeRoute("/list/item") }
    };

    self.enemy = {
        count: 0,
        list: () => { self.changeRoute("/list/enemy") }
    };

    CoreGenericService
        .getAll('npc')
        .then(res => {
            self.npc.count = res.data.length;
            sharedData.setParam("npcs", res.data);
        });

    CoreGenericService
        .getAll('item')
        .then(res => {
            self.item.count = res.data.length;
            sharedData.setParam("items", res.data);
        });

    CoreGenericService
        .getAll('enemy')
        .then(res => {
            self.enemy.count = res.data.length;
            sharedData.setParam("enemies", res.data);
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
                image: "images?name=merchant01.png",
                w: 80, h: 80
            },
        },
        {
            data: self.item,
            legend: "Items",
            bgcolor: "#fff3cd",
            icon: {
                image: "images?name=icon_iron_dagger.png",
                w: 64, h: 64
            },
        },
        {
            data: self.enemy,
            legend: "Enemies",
            bgcolor: "#f8d7da",
            icon: {
                image: "images?name=bandit01.png",
                w: 80, h: 80
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
