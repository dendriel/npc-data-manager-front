'use strict';

function CoreSharedDataService($window) {
    let self = this;
    self.data = [];

    self.setParam = (key, value) => {
        // self.data[key] = value;
        $window.localStorage.setItem(key,  angular.toJson(value));
    };

    self.getParam = (key) => {
        //return self.data[key];
        return  angular.fromJson($window.localStorage.getItem(key));
    };

    self.clear = () => {
        // self.data = [];
        $window.localStorage.clear();
    }
}

angular
    .module('core')
    .service('CoreSharedDataService', ['$window', CoreSharedDataService]);
