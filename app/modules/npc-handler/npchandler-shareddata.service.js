'use strict';

function NpcHandlerSharedDataService() {
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
    .module('npchandler')
    .service('NpcHandlerSharedDataService', [NpcHandlerSharedDataService]);
