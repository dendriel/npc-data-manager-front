'use strict';

function LootHolderController(sharedData, CoreGenericService) {
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

    self.$onInit = function() {
        if (self.options !== undefined) {
            self.initialize();
        }
    };

    self.items = sharedData.getParam("item_all");
    if (self.items === null || self.items === undefined) {
        CoreGenericService
            .getAll("item")
            .then((res) => {
                self.items = res.data;
                sharedData.setParam("item_all", res.data);
            });
    }
}

angular
    .module('sharedcomponents')
    .component('lootHolder', {
        templateUrl: 'modules/shared-components/loot-holder/loot-holder.template.html',
        controller: ['CoreSharedDataService', 'CoreGenericService', LootHolderController],
        bindings: {
            data: '='
        }
    });
