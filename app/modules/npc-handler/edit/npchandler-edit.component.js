'use strict';

function NpcHandlerEditController($scope, $location, CoreGenericService, sharedData, FeedbackBarService) {
    const entity = 'npc';
    let self = this;
    self.npcData = {};
    self.operationTitle = "Unknown";

    self.findNextNpcUid = () => {
        let npcs = sharedData.getParam("npc_all");
        let lastUid = 0;
        npcs.map(function(obj){
            if (obj.uid > lastUid){
                lastUid = obj.uid;
            }
        });
        return lastUid+1;
    };

    self.setupStoreItems = (storeItems) => {
        storeItems.forEach(e => {
            e.uid = { uid: e.id };
        });
    };

    // Minor fixer for the new decisions feature.
    self.fixInteractionData = (inter) => {
        if (inter.decision === undefined || inter.decision === null || inter.decision.selectOptions === null) {
            inter.decision = {selectOptions:[]};
        }

        if (inter.storeItems === undefined || inter.storeItems === null) {
            inter.storeItems = [];
        }

        self.setupStoreItems(inter.storeItems);
    }

    console.log("Edit npc: " + sharedData.getParam("npc"));
    self.npcData = sharedData.getParam("npc");

    if (self.npcData !== null && self.npcData !== undefined && self.npcData.uid !== null) {
        self.operationTitle = "Editing";
        self.npcData.interactionData.forEach(self.fixInteractionData);
    }
    else if (self.npcData !== null && self.npcData !== undefined && self.npcData.uid === null) {
        self.operationTitle = "Cloning";
        self.npcData.uid = self.findNextNpcUid();
        self.npcData.interactionData.forEach(self.fixInteractionData);
    }
    else {
        self.operationTitle = "Creating";
        console.log("Create NPC");
        self.npcData = {
            name: "FIX ME",
            uid: self.findNextNpcUid(),
            behaviorId: 2,
            status: { strength: 0, intelligence: 0, dexterity: 0, accuracy: 0, life: 0, mana: 0 },
            spriteData: { resource: { resId: 1, dirId: 1, storageId: "images/icon_iron_dagger.png" }, order: 0, offset: {x: 0, y: 0}, scale: {width: 1, height: 1}, enabled: true },
            interactionOrder: [],
            interactionData: [],
            facingRight: false,
            idAsText: null
        }
    }

    self.addEventState = (eventsState) => {
        eventsState.push({
            type: "SWITCH",
            key: "FIX ME",
            value: false
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
                rect: {x:16, y:48, width:380, height:128},
                verticalAlignment: 1,
                horizontalAlignment: 2
            }
        };

        self.addElementToArray(arr, msg);
    };

    self.addOption = (arr) => {
      let opt = {
          label: {
              text: "FIX ME"
          },
          updateEventsState: [],
          isLoopback: false,
          loopbackToChapter: -1
      };

        self.addElementToArray(arr, opt);
    };

    self.addInteraction = () => {
        let interId = self.findNextInteractionId();
        let inter = {
            id: interId,
            type: "DIALOG",
            messages: [],
            decision : { selectOptions: [] },
            priceMultiplier: 0,
            storeItems: [],
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
        return lastId+1;
    };

    self.save = () => {
        self.npcData.interactionData.forEach(i => {
            i.storeItems.forEach(s => {
                s.id = s.uid.uid;
            })
        });

        CoreGenericService
            .save(entity, self.npcData)
            .then((res) => {
                if (res.status === 200) {
                    FeedbackBarService.info("NPC saved successfully!");
                    sharedData.clearParam("npc");
                    $location.path('/list/npc');
                    // self.npcData = res.data;
                    // self.npcData.interactionData.forEach(i => self.setupStoreItems(i.storeItems));
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
    };
}

angular
    .module('npchandler')
    .component('npcEdit', {
        templateUrl: 'modules/npc-handler/edit/npchandler-edit.template.html',
        controller: ['$scope', '$location', 'CoreGenericService', 'CoreSharedDataService', "FeedbackBarService", NpcHandlerEditController]
    });
