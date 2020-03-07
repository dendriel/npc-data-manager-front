'use strict';

function StoreItemsController() {
    let self = this;

    self.addElementToArray = (arr, elem) => {
        if (arr === undefined) {
            arr = [];
        }
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
    .component('storeItems', {
        templateUrl: 'modules/shared-components/store-items/store-items.template.html',
        controller: [StoreItemsController],
        bindings: {
            data: '='
        }
    });
