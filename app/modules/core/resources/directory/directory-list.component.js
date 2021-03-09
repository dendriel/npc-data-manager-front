'use strict';

function DirectoryListController($location, $routeParams, CoreStorageService, sharedData, FeedbackBarService) {
    let self = this;
    self.directories = [];
    self.newDirName = "";
    self.inprogress = false;

    function isNewDirectoryInvalid() {
        if (!self.newDirName) {
            FeedbackBarService.error("Directory name is blank!");
            return true;
        }

        for (let i = 0; i < self.directories.length; i++) {
            let dir = self.directories[i];
            if (dir.name === self.newDirName) {
                FeedbackBarService.error("Directory name already in use!");
                return true;
            }
        }

        return false;
    }

    function refresh() {
        CoreStorageService
            .getAllDirectories()
            .then((res) => {
                self.directories = res.data;
            });
    }

    self.create = () => {
        self.inprogress = true;
        FeedbackBarService.hide();
        if (isNewDirectoryInvalid()) {
            self.inprogress = false;
            return;
        }

        CoreStorageService
            .createDirectory(self.newDirName)
            .then((res) => {
                FeedbackBarService.info(`Directory ${self.newDirName} created!`);
                self.newDirName = "";
                self.inprogress = false;
                refresh();
            })
            .catch(reason => {
                    self.inprogress = false;
                    FeedbackBarService.error("Failed to create directory! Status: " + reason.status + ". Error: " +
                        reason.data + " : " + reason.message);
                }
            )
    }

    self.remove = (dir) => {
        dir.inprogress = true;
        CoreStorageService
            .removeDirectory(dir.id)
            .then((res) => {
                FeedbackBarService.info(`Directory ${dir.name} removed!`);
                refresh();
            })
            .catch(reason => {
                dir.inprogress = false;
                    FeedbackBarService.error("Failed to remove directory! Status: " + reason.status + ". Error: " +
                        reason.data + " : " + reason.message);
                }
            )
    }

    refresh();
}

angular
    .module('core')
    .component('directoryList', {
        templateUrl: 'modules/core/resources/directory/directory-list.template.html',
        controller: ['$location', '$routeParams', 'CoreStorageService', 'CoreSharedDataService', "FeedbackBarService", DirectoryListController]
    });
