'use strict';

function ItemSelectController(sharedData, CoreGenericService) {
    let self = this;

    self.$onInit = function() {
        if (self.options !== undefined) {
            self.initialize();
        }
    };

    self.items = sharedData.getParam("items");
    if (self.items === null || self.items === undefined) {
        CoreGenericService
            .getAll("item")
            .then((res) => {
                self.items = res.data;
                sharedData.setParam("items", res.data);
            });
    }
}

angular
    .module('sharedcomponents')
    .component('itemSelect', {
        templateUrl: 'modules/shared-components/item-select/item-select.template.html',
        controller: ['CoreSharedDataService', 'CoreGenericService', ItemSelectController],
        bindings: {
            data: '='
        }
    });
