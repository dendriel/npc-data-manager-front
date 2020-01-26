'use strict';

function ItemHandlerEditController($scope, $routeParams, CoreGenericService, sharedData, FeedbackBarService) {
    const entity = 'item';
    let self = this;
    self.data = {};

    self.findNextItemUid = () => {
        let items = sharedData.getParam("items");
        let lastUid = 0;
        items.map(function(obj){
            if (obj.uid > lastUid){
                lastUid = obj.uid;
            }
        });
        return lastUid+1;
    };

    console.log("Edit item: " + sharedData.getParam("item"));
    self.data = sharedData.getParam("item");

    self.save = () => {
        CoreGenericService
            .save(entity, self.data)
            .then((res) => {
                if (res.status === 200) {
                    FeedbackBarService.info("Entity saved successfully!");
                    self.data = res.data;
                } else {
                    FeedbackBarService.error("Failed to save entity! Status: " + res.status);
                }
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to save item! Status: " + reason.status + ". Error: " + reason.data.error)
            );
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

    self.fixData = (data) => {
      if (data.aim === null || data.aim === undefined) {
          data.aim = { aimSprite: {
                  imageFile: "FIX ME SPRITE",
                  order: 0,
                  offset: {x: 0, y: 0},
                  scale: {width: 1, height: 1},
                  enabled: true
              }
            }
      }
    };

    self.initialize = () => {
        if (self.data !== null && self.data !== undefined && self.data.uid !== null) {
            console.log("Edit Item");
            self.fixData(self.data);
            return;
        }
        else if (self.data !== null && self.data.uid === null) {
            console.log("Clone Item");
            self.data.uid = self.findNextItemUid();
            self.fixData(self.data);
            return;
        }

        console.log("Create Item");
        self.data = {
            type: "gold",
            uid: self.findNextItemUid(),
            level: 1,
            name: "FIX ME",
            description: "FIX ME DESCRIPTION",
            spriteData: {
                imageFile: "FIX ME SPRITE",
                order: 0,
                offset: {x: 0, y: 0},
                scale: {width: 1, height: 1},
                enabled: true
            },
            iconData: {imageFile: "FIX ME ICON", rect: {x: 0, y: 0, width: 64, height: 64}},
            count: 1,
            maximumStack: 20,
            price: 100,
            status: { minAttack:0, maxAttack:0, defense:0, minRange:0, maxRange:0 },
            wearableSlots : [],
            soundEfx: "",
            statusModifiersData: [],
            aim: { aimSprite: {
                    imageFile: "FIX ME SPRITE",
                        order: 0,
                        offset: {x: 0, y: 0},
                    scale: {width: 1, height: 1},
                    enabled: true
                }
            },
            hit: { vfx: "hit", sfx: "melee_hit" },
            idAsText: null
        }
    };

    // Bootstrap
    if (sharedData.getParam("items") === undefined) {
        CoreGenericService
            .getAll(entity)
            .then((res) => {
                sharedData.setParam("items", res.data);
                self.initialize();
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to get all items! Status: " + reason.status + ". Error: " + reason.data.error)
            );
    } else {
        self.initialize();
    }
}

angular
    .module('itemhandler')
    .component('itemEdit',{
        templateUrl: 'modules/item-handler/edit/itemhandler-edit.template.html',
        controller: ['$scope', '$routeParams', 'CoreGenericService', 'CoreSharedDataService', "FeedbackBarService", ItemHandlerEditController]
    });
