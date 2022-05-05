'use strict';

function NImageController(CoreStorageService) {
    let self = this;
    self.directories = [];
    self.resources = [];
    self.filteredResources = [];
    self.selectedDir = null;
    self.selectedRes = null;
    self.searchTerm = "";

    function getSelectedRes(resId) {
        let target = self.resources.find(r => r.id === resId);
        return target ?? self.resources[0] ;
    }

    self.updateResources = (dirId, cb) => {
        CoreStorageService
            .getResourcesByDirectoryId(dirId)
            .then((res) => {
                self.resources = res.data;
                self.filteredResources = res.data;
                if (cb) {
                    cb();
                }
            })
            .catch(reason => {
                    self.inprogress = false;
                    FeedbackBarService.error("Failed to load resources! Status: " + reason.status + ". Error: " +
                        reason.data + " : " + reason.message);
                }
            )
    }
    self.refresh = () => {
        self.updateResources(self.selectedDir.id, () => {
            self.selectedRes = self.resources[0];
            self.searchResource();
        });
    }

    self.searchResource = () => {
        if (self.searchTerm === "" || self.resources.length <= 1) {
            self.filteredResources = self.resources
            return
        }

        self.filteredResources = self.resources.filter(res => {
            return res.name.includes(self.searchTerm)
        })

        if (self.filteredResources.length > 0) {
            self.selectedRes = self.filteredResources[0]
            self.selectResource()
        }
    }

    self.selectResource = () => {
        if (!self.selectedRes) {
            return
        }
        self.data.resId = self.selectedRes.id;
        self.data.storageId = self.selectedRes.storageId;
        self.data.name = self.selectedRes.name;
        self.data.dirId = self.selectedDir.id;
    }

    function getSelectedDir() {
        let dirId = self.data.dirId ?? 0
        let target = self.directories.find(d => d.id === dirId);
        return target ?? self.directories[0] ;
    }

    CoreStorageService
        .getAllDirectories()
        .then((res) => {
            self.directories = res.data.filter(d => d.resourcesCount > 0);
            self.selectedDir = getSelectedDir();
            self.updateResources(self.selectedDir.id, () => {
                let resId = self.data.resId ?? 0;
                self.selectedRes = getSelectedRes(resId);
            });
        });
}

angular
    .module('sharedcomponents')
    .component('nImage', {
        templateUrl: "modules/shared-components/n-image/n-image.template.html",
        controller: ["CoreStorageService", NImageController],
        bindings: {
            data: '='
        }
    });
