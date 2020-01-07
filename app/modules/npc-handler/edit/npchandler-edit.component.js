'use strict';

function NpcHandlerEditController($scope, $routeParams, NpcHandlerService, sharedData, FeedbackBarService) {
    let self = this;
    self.npcData = {};

    console.log("Edit npc: " + sharedData.getParam("npc"));
    self.npcData = sharedData.getParam("npc");
    if (self.npcData === null) {
        console.log("Create NPC");
        self.npcData = {
            name: "FIX ME",
            behaviorId: 2,
            status: { strength: 0, intelligence: 0, dexterity: 0, accuracy: 0, life: 0, mana: 0 },
            spriteData: { imageFile: "FIX ME", order: 0, offset: {x: 0, y: 0}, scale: {width: 1, height: 1}, enabled: true },
            interactionOrder: [],
            interactionData: [],
            facingRight: false,
            idAsText: null
        }
    }

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

    self.addMessage = (arr) => {
        let msg = {
            title: {
                text: "",
                font: "Serif",
                style: 0,
                size: 22,
                color: {r:255, g:255, b:255},
                rect: {x:12, y:4, width:920, height:32},
                verticalAlignment: 0,
                horizontalAlignment: 2
            },
            text: {
                text: "",
                font: "Serif",
                style: 0,
                size: 20,
                color: {r:255, g:255, b:255},
                rect: {x:16, y:32, width:920, height:64},
                verticalAlignment: 1,
                horizontalAlignment: 2
            }
        };

        self.addElementToArray(arr, msg);
    };

    self.addInteraction = () => {
        let interId = self.findNextInteractionId();
        let inter = {
            id: interId,
            type: "DIALOG",
            messages: [],
            priceMultiplier: 0,
            items: [],
            requireEventsState: [],
            updateEventsState: [],
            targetId: 0,
            toPos: {x:0, y:0},
            targetData: ""
        };

        self.addElementToArray(self.npcData.interactionData, inter);
        self.addElementToArray(self.npcData.interactionOrder, interId);
    };

    self.removeInteraction = (inter) => {
        self.removeElementFromArray(self.npcData.interactionOrder, inter.id);
        self.removeElementFromArray(self.npcData.interactionData, inter);
    };

    self.findNextInteractionId = () => {
        let lastId = 0;
        self.npcData.interactionData.map(function(obj){
            if (obj.id > lastId){
                lastId = obj.id;
            }
        });
        let nextId = lastId+1;
        return nextId;
    };

    self.save = () => {
        NpcHandlerService
            .save(self.npcData)
            .then((res) => {
                if (res.status === 200) {
                    FeedbackBarService.info("NPC saved successfully!");
                    self.npcData = res.data;
                } else {
                    FeedbackBarService.error("Failed to save NPC! Status: " + res.status);
                }
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to save NPC! Status: " + reason.status + ". Error: " + reason.data.error)
            );
    };

    self.getSortedInteractionData = () => {
        let sortedInteractionData = [];

        let i = 0;
        for (; i < self.npcData.interactionOrder.length; i++) {
            let targetId = self.npcData.interactionOrder[i];
            let currInter = self.npcData.interactionData.find(elem => elem.id === targetId);
            sortedInteractionData.push(currInter);
        }

        return sortedInteractionData;
    }

    // $scope.$watchCollection('$ctrl.npcData.interactionOrder', function (newOrder, oldValue) {
    //     let sortedInteractionData = [];
    //
    //     let i = 0;
    //     for (; i < newOrder.length; i++) {
    //         let targetId = newOrder[i];
    //         let currInter = self.npcData.interactionData.find(elem => elem.id === targetId);
    //         sortedInteractionData.push(currInter);
    //     }
    //
    //     self.npcData.interactionData = sortedInteractionData;
    //     console.log("Scope changed! " + newOrder + " - " + oldValue);
    // });
}

angular
    .module('npchandler')
    .component('npcEdit', {
        templateUrl: 'modules/npc-handler/edit/npchandler-edit.template.html',
        controller: ['$scope', '$routeParams', 'NpcHandlerService', 'NpcHandlerSharedDataService', "FeedbackBarService", NpcHandlerEditController]
    });
