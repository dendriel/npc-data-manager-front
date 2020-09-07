'use strict';

function CoreGenericService($http, sharedData) {
    let self = this;
    const authTokenKey = "authToken";

    self.getById = function(entity, id) {
        let url = "http://localhost:8080/" + entity + "/getById?id="+id;
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
        let url = "http://localhost:8080/" + entity + "/delete?id="+id;
        console.log(url);
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    };

    self.getAll = function(entity) {
        let url = "http://localhost:8080/" + entity + "/getAll";
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
        let url = "http://localhost:8080/" + entity + "/save";
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
        let url = "http://localhost:8080/" + entity + "/import";
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
        let url = "http://localhost:8080/" + entity + "/export";
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
        let url = "http://localhost:8080/" + "authenticate";
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
    .service('CoreGenericService', ['$http', 'CoreSharedDataService', CoreGenericService]);
