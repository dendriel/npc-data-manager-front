'use strict';

function CoreSharedDataService($window) {
    let self = this;
    self.data = [];
    self.persistentKeys = [];

    self.setParam = (key, value) => {
        // self.data[key] = value;
        $window.localStorage.setItem(key,  angular.toJson(value));
    };

    self.setPersistentParam = (key, value) => {
        self.setParam(key, value);
        if (self.persistentKeys.indexOf(key) === -1) {
            self.persistentKeys.push(key);
        }

        if (value === null) {
            self._clearPersistentParam(key);
        }
    };

    self.getParam = (key) => {
        //return self.data[key];
        return angular.fromJson($window.localStorage.getItem(key));
    };

    self.clearParam = (key) => {
        $window.localStorage.setItem(key, null);
    }

    self.clear = () => {
        // self.data = [];
        let persistentParams = self._getPersistentParams();
        $window.localStorage.clear();
        self._setPersistentParams(persistentParams);
    };

    self._getPersistentParams = () => {
        let temp = [];
        self.persistentKeys.forEach(key => {
            temp[key] = $window.localStorage.getItem(key);
        });
        return temp;
    };

    self._setPersistentParams = (params) => {
        for (let key in params) {
            $window.localStorage.setItem(key,  params[key]);
        }
    };

    self._clearPersistentParam = function (key) {
        let keyIndex = self.persistentKeys.indexOf(key);

        if (keyIndex !== -1) {
            self.persistentKeys = self.persistentKeys.splice(keyIndex, 1);
        }
    }
}

angular
    .module('core')
    .service('CoreSharedDataService', ['$window', CoreSharedDataService]);
