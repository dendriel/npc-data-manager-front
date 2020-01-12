'use strict';

function NpcHandlerListController($location, NpcHandlerService, sharedData, FeedbackBarService) {
    let self = this;
    sharedData.setParam("npc", null);

    self.editNpc = (npc) => {
        sharedData.setParam("npc", npc);
        self.changeRoute('/npc/edit');
    };

    self.removeNpc = (npc) => {
        let remove = confirm("Do you really want to remove " + npc.name + "?");
        if (remove === false) {
            return;
        }

        const index = self.npcs.indexOf(npc);
        if (index > -1) {
            NpcHandlerService
                .delete(npc.idAsText)
                .then((res) => {
                    self.npcs.splice(index, 1);
                    FeedbackBarService.info("NPC " + npc.name + " removed!");
                })
                .catch(reason =>
                    FeedbackBarService.error("Failed to delete NPC! Status: " + reason.status + ". Error: " + reason.data.error + ":" + reason.message)
                )
        }
        else {
            FeedbackBarService.error("Couldn't remove NPC from array. NPC is not in the list");
        }
    };

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
    };

    NpcHandlerService
        .getAll()
        .then((res) => {
            self.npcs = res.data;
            sharedData.setParam("npcs", res.data);
        });

    FeedbackBarService.hide();
}

angular
    .module('npchandler')
    .component('npcList', {
       templateUrl: 'modules/npc-handler/list/npchandler-list.template.html',
        controller: ['$location', 'NpcHandlerService', 'CoreSharedDataService', "FeedbackBarService", NpcHandlerListController]
    });
