'use strict';

function ResourceListController(CoreStorageService, FeedbackBarService) {
    let self = this;
    self.directories = [];
    self.resources = [];
    self.selectedDir = null;
    self.resourceTypes = ["Default"];
    self.inprogress = false;
    self.newResource = { type: "DEFAULT" };

    function resetResourceFrom() {
        let prevType = self.newResource.type;
        self.newResource = {
            name: "",
            type: prevType
        }
    }

    resetResourceFrom();

    self.updateResources = (dirId) => {
        CoreStorageService
            .getResourcesByDirectoryId(dirId)
            .then((res) => {
                self.resources = res.data;
            })
            .catch(reason => {
                    self.inprogress = false;
                    FeedbackBarService.error("Failed to load resources! Status: " + reason.status + ". Error: " +
                        reason.data + " : " + reason.message);
                }
            )
    }

    function getSelectedFile() {
        let fileField = document.getElementById('resFile');
        return fileField.files[0];
    }

    function clearSelectedFile() {
        let fileField = document.getElementById('resFile');
        return fileField.value = null;
    }

    self.refresh = () => {
        self.updateResources(self.selectedDir.id);
    }

    function isResourceDataInvalid() {
        if (!self.newResource.name) {
            FeedbackBarService.error("Resource name is empty!");
            return true;
        }

        for (let i = 0; i < self.resources.length; i++) {
            let res = self.resources[i];
            if (res.name === self.newResource.name) {
                FeedbackBarService.error(`Name "${res.name}" is already in use!`);
                return true;
            }
        }

        if (!getSelectedFile()) {
            FeedbackBarService.error("No file selected!");
            return true;
        }

        return false;
    }

    self.create = () => {
        if (isResourceDataInvalid()) {
            return;
        }

        FeedbackBarService.hide();
        self.inprogress = true;
        CoreStorageService
            .createResource(self.newResource.name, self.newResource.type, self.selectedDir.id, getSelectedFile())
            .then((res) => {
                FeedbackBarService.info(`Resource ${self.newResource.name} created!`);
                resetResourceFrom();
                self.refresh();
                clearSelectedFile();
                self.inprogress = false;
            })
            .catch(reason => {
                self.inprogress = false;
                FeedbackBarService.error("Failed to create resource! Status: " + reason.status + ". Error: " +
                    reason.data + " : " + reason.message);
                }
            )
    }

    self.remove = (res) => {
        res.inprogress = true;
        let resName = res.name;
        CoreStorageService
            .removeResource(res.id)
            .then((res) => {
                FeedbackBarService.info(`Resource ${resName} removed!`);
                self.refresh();
            })
            .catch(reason => {
                res.inprogress = false;
                FeedbackBarService.error("Failed to remove resource! Status: " + reason.status + ". Error: " +
                    reason.data + " : " + reason.message);
                }
            )
    }

    CoreStorageService
        .getAllDirectories()
        .then((res) => {
            self.directories = res.data;
            self.selectedDir = res.data[0];
            self.refresh();
        });

    CoreStorageService
        .getResourceTypes()
        .then((res) => {
            self.resourceTypes = res.data;
        });
}

angular
    .module('core')
    .component('resourceList', {
        templateUrl: 'modules/core/resources/resource/resource-list.template.html',
        controller: ['CoreStorageService', "FeedbackBarService", ResourceListController]
    });
