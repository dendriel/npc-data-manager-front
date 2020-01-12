'use strict';

function ItemHandlerSharedDataService() {
    let self = this;
    self.data = [];

    self.setParam = (key, value) => {
        self.data[key] = value;
    };

    self.getParam = (key) => {
        return self.data[key];
    };
}

angular
    .module('itemhandler')
    .service('ItemHandlerSharedDataService', [ItemHandlerSharedDataService]);
