'use strict';

function LootHolderController() {
    let self = this;

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
}

angular
    .module('sharedcomponents')
    .component('lootHolder', {
        templateUrl: 'modules/shared-components/loot-holder/loot-holder.template.html',
        controller: [LootHolderController],
        bindings: {
            data: '='
        }
    });
