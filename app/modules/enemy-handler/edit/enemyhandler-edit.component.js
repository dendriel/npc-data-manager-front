'use strict';

function EnemyHandlerEditController($scope, $location, CoreGenericService, sharedData, FeedbackBarService) {
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

    self.setupLootHolder = (lootHolder) => {
        lootHolder.loot.forEach((loot) => { loot.uid = { uid: loot.uid } });
        lootHolder.uid = { uid: lootHolder.uid };
    };

    self.enemyData = sharedData.getParam("enemy");
    console.log("Edit enemy: " + self.enemyData);

    if (self.enemyData !== null && self.enemyData !== undefined && self.enemyData.uid !== null) {
        self.operationTitle = "Editing";
        self.setupLootHolder(self.enemyData.lootHolder);
    }
    else if (self.enemyData !== null && self.enemyData !== undefined && self.enemyData.uid === null) {
        self.operationTitle = "Cloning";
        self.enemyData.uid = self.findNextEnemyUid();
        self.setupLootHolder(self.enemyData.lootHolder);
    }
    else {
        self.operationTitle = "Creating";
        self.enemyData = {
            name: "FIX ME",
            uid: self.findNextEnemyUid(),
            behaviorId: 2,
            status: { strength: 0, intelligence: 0, dexterity: 0, accuracy: 0, life: 0, mana: 0 },
            spriteData: { resource: { resId: 1, dirId: 1, storageId: "images/icon_iron_dagger.png" }, order: 0, offset: {x: 0, y: 0}, scale: {width: 1, height: 1}, enabled: true },
            facingRight: false,
            idAsText: null,
            wearableHolder: { minAttack:0, maxAttack:0, defense:0 },
            lootHolder: { uid: 1, name: "", chance:100, loot:[] }
        };
    }

    self.save = () => {
        // Reset uid to its original object format.
        self.enemyData.lootHolder.loot.forEach((loot) => {
            loot.uid = loot.uid.uid;
        });
        self.enemyData.lootHolder.uid = self.enemyData.lootHolder.uid.uid;

        CoreGenericService
            .save(entity, self.enemyData)
            .then((res) => {
                if (res.status === 200) {
                    // self.setupLootHolder(res.data.lootHolder);
                    // self.enemyData = res.data;
                    FeedbackBarService.info("Entity saved successfully!");
                    $location.path('/list/enemy');
                } else {
                    FeedbackBarService.error("Failed to save! Status: " + res.status);
                }
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to save! Status: " + reason.status + ". Error: " + reason.data.error)
            );
    };

    $scope.$on("$destroy", function() {
        console.log("Clear enemy param.")
        sharedData.clearParam("enemy");
    });
}

angular
    .module('enemyhandler')
    .component('enemyEdit', {
       templateUrl: 'modules/enemy-handler/edit/enemyhandler-edit.template.html',
       controller: ['$scope', '$location', 'CoreGenericService', 'CoreSharedDataService', 'FeedbackBarService', EnemyHandlerEditController]
    });
