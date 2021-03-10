'use strict';

function NImageController(CoreStorageService) {
    let self = this;
    self.directories = [];
    self.resources = [];
    self.selectedDir = null;
    self.selectedRes = null;

    function getSelectedRes(resId) {
        let target = self.resources.find(r => r.id === resId);
        return target ?? self.resources[0] ;
    }

    self.updateResources = (dirId, cb) => {
        CoreStorageService
            .getResourcesByDirectoryId(dirId)
            .then((res) => {
                self.resources = res.data;
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
            self.selectResource();
        });
    }

    self.selectResource = () => {
        self.data.resId = self.selectedRes.id;
        self.data.storageId = self.selectedRes.storageId;
        self.data.dirId = self.selectedDir.id;
    }

    function getSelectedDir() {
        let target = self.directories.find(d => d.id === self.data.dirId);
        return target ?? self.directories[0] ;
    }

    CoreStorageService
        .getAllDirectories()
        .then((res) => {
            self.directories = res.data.filter(d => d.resourcesCount > 0);
            self.selectedDir = getSelectedDir();
            self.updateResources(self.selectedDir.id, () => {
                self.selectedRes = getSelectedRes(self.data.resId);
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
