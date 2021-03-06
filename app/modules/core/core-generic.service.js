'use strict';

function CoreGenericService($http, $location, sharedData) {
    let self = this;
    const authTokenKey = "authToken";

    const backendAddress = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port + "/rest/";
    sharedData.setPersistentParam("backendAddress", backendAddress);

    self.getById = function(entity, id) {
        let url = backendAddress + entity + "/getById?id="+id;
        console.log(url);
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    };

    self.delete = function(entity, id) {
        let url = backendAddress + entity + "/delete?id="+id;
        console.log(url);
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    };

    self.deleteAll = function(entity, ids) {
        let url = backendAddress + entity + "/deleteAll";
        console.log(url);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            },
            data: ids
        });
    };

    self.getAll = function(entity) {
        let url = backendAddress + entity + "/getAll";
        console.log(url);
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    };

    self.save = function(entity, npcData) {
        let url = backendAddress + entity + "/save";
        console.log(url + " - " + npcData);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            },
            data: npcData
        });
    };

    self.import = function(entity, filePath) {
        let url = backendAddress + entity + "/import";
        let data = filePath;
        console.log(url + " - " + data);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            },
            data: data
        });
    };

    self.export = function(entity, filePath) {
        let url = backendAddress + entity + "/export";
        let data = filePath;
        console.log(url + " - " + data);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            },
            data: data
        });
    };

    self.login = function(authParams) {
        let url = backendAddress + "authenticate";
        let data = authParams;
        console.log(url + " - " + data); // debugging purposes only.
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            },
            data: data
        });
    }
}

angular
    .module('core')
    .service('CoreGenericService', ['$http', '$location', 'CoreSharedDataService', CoreGenericService]);
