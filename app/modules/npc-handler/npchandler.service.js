'use strict';

function NpcHandlerService($http, sharedData) {
    var self = this;

    self.backendAddress = sharedData.getParam("backendAddress");

    self.getById = function(id) {
        let url = self.backendAddress + "/npc/getById?id="+id;
        console.log(url);
        return $http.get(url);
    };

    self.delete = function(id) {
        let url = self.backendAddress + "/npc/delete?id="+id;
        console.log(url);
        return $http.get(url);
    };

    self.getAll = function() {
        let url = self.backendAddress + "/npc/getAll";
        console.log(url);
        return $http.get(url);
    };

    self.save = function(npcData) {
        let url = self.backendAddress + "/npc/save";
        console.log(url + " - " + npcData);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            },
            data: npcData
        });
    };

    self.import = function(filePath) {
        let url = self.backendAddress + "/npc/import";
        let data = filePath;
        console.log(url + " - " + data);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            },
            data: data
        });
    };

    self.export = function(filePath) {
        let url = self.backendAddress + "/npc/export";
        let data = filePath;
        console.log(url + " - " + data);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            },
            data: data
        });
    }
}

angular
    .module('npchandler')
    .service('NpcHandlerService', 'CoreSharedDataService', ['$http', NpcHandlerService]);
