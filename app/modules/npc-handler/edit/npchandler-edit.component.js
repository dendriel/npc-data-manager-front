'use strict';

function NpcHandlerEditController($routeParams, NpcHandlerService, sharedData) {
    let self = this;
    self.npcData = {};

    console.log("Edit npc: " + sharedData.getParam("npc"));
    self.npcData = sharedData.getParam("npc");

    self.save = () => {
        NpcHandlerService
            .save(self.npcData)
            .then((res) => {
                console.log("Save response: " + res);
            });
    };
}

angular
    .module('npchandler')
    .component('npcEdit', {
        templateUrl: 'modules/npc-handler/edit/npchandler-edit.template.html',
        controller: ['$routeParams', 'NpcHandlerService', 'NpcHandlerSharedDataService', NpcHandlerEditController]
    });
