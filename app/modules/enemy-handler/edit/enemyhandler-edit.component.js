'use strict';

function EnemyHandlerEditController($scope, $routeParams, CoreGenericService, sharedData, FeedbackBarService) {
    const entity = "enemy";
    let self = this;
    self.enemyData = {};

    self.findNextEnemyUid = () => {
        let enemies = sharedData.getParam("enemies");
        let lastUid = 0;
        enemies.map(function(obj) {
            if (obj.uid > lastUid){
                lastUid = obj.uid;
            }
        });
        return lastUid+1;
    };

    self.enemyData = sharedData.getParam("enemy");
    console.log("Edit enemy: " + self.enemyData);
    if (self.enemyData === null || self.enemyData === undefined) {
        console.log("Create Enemy");
        self.enemyData = {
            name: "FIX ME",
            uid: self.findNextEnemyUid(),
            behaviorId: 2,
            status: { strength: 0, intelligence: 0, dexterity: 0, accuracy: 0, life: 0, mana: 0 },
            spriteData: { imageFile: "FIX ME", order: 0, offset: {x: 0, y: 0}, scale: {width: 1, height: 1}, enabled: true },
            facingRight: false,
            idAsText: null,
            wearableHolder: { minAttack:0, maxAttack:0, defense:0 },
            lootHolder: { name:null, lootItemHolder: "Loot Bag", chance:100, loot:[] }
        }
    }

    self.save = () => {
        CoreGenericService
            .save(entity, self.enemyData)
            .then((res) => {
                if (res.status === 200) {
                    FeedbackBarService.info("Entity saved successfully!");
                    self.enemyData = res.data;
                } else {
                    FeedbackBarService.error("Failed to save! Status: " + res.status);
                }
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to save! Status: " + reason.status + ". Error: " + reason.data.error)
            );
    };
}

angular
    .module('enemyhandler')
    .component('enemyEdit', {
       templateUrl: 'modules/enemy-handler/edit/enemyhandler-edit.template.html',
       controller: ['$scope', '$routeParams', 'CoreGenericService', 'CoreSharedDataService', 'FeedbackBarService', EnemyHandlerEditController]
    });
