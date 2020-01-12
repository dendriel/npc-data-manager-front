'use strict';

function CoreSharedDataService() {
    let self = this;
    self.data = [];

    self.setParam = (key, value) => {
        self.data[key] = value;
    };

    self.getParam = (key) => {
        return self.data[key];
    };

    self.clear = () => {
        self.data = [];
    }
}

angular
    .module('core')
    .service('CoreSharedDataService', [CoreSharedDataService]);
