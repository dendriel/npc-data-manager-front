'use strict';

function NpcHandlerEditController($routeParams, NpcHandlerService, sharedData, FeedbackBarService) {
    let self = this;
    self.npcData = {};

    console.log("Edit npc: " + sharedData.getParam("npc"));
    self.npcData = sharedData.getParam("npc");

    self.addEventState = (eventsState) => {
        eventsState.push({
            type: "SWITCH"
        })
    };

    self.addElementToArray = (arr, elem) => {
        arr.push(elem);
    };

    self.removeElementFromArray = (arr, elem) => {
        const index = arr.indexOf(elem);
        if (index > -1) {
            arr.splice(index, 1);
        }
        else {
            FeedbackBarService.error("Couldn't remove element from array.")
        }
    };

    self.save = () => {
        NpcHandlerService
            .save(self.npcData)
            .then((res) => {
                if (res.status === 200) {
                    FeedbackBarService.info("NPC saved successfully!");
                } else {
                    FeedbackBarService.error("Failed to save NPC! Status: " + res.status);
                }
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to save NPC! Status: " + reason.status + ". Error: " + reason.data.error)
            );
    };
}

angular
    .module('npchandler')
    .component('npcEdit', {
        templateUrl: 'modules/npc-handler/edit/npchandler-edit.template.html',
        controller: ['$routeParams', 'NpcHandlerService', 'NpcHandlerSharedDataService', "FeedbackBarService", NpcHandlerEditController]
    });
