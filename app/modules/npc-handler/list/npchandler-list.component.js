'use strict';

function NpcHandlerEditController($location, NpcHandlerService, sharedData, FeedbackBarService) {
    let self = this;

    self.editNpc = (npc) => {
        sharedData.setParam("npc", npc);
        self.changeRoute('/npc/edit');
    };

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
    };

    NpcHandlerService
        .getAll()
        .then((res) => {
            self.npcs = res.data;
        });

    FeedbackBarService.hide();
}

angular
    .module('npchandler')
    .component('npcList', {
       templateUrl: 'modules/npc-handler/list/npchandler-list.template.html',
        controller: ['$location', 'NpcHandlerService', 'NpcHandlerSharedDataService', "FeedbackBarService", NpcHandlerEditController]
    });
