'use strict';

function CoreExportController($routeParams, CoreGenericService, FeedbackBarService) {
    let self = this;
    self.file_name = $routeParams.file_name;
    self.entity = $routeParams.entity;
    self.inprogress = false;

    if ($routeParams.action === "import") {
        self.actionName = "Import";
        self.style = "background-color:#E8F8FF; width: min-content;";
        self.legend = "Import " + self.entity.toUpperCase();
    }
    else {
        self.actionName = "Export";
        self.style = "background-color:#f8d7da; width: min-content;";
        self.legend = "Export " + self.entity.toUpperCase();
    }

    self.execute = () => {
        let continueAction = confirm("Do you really want to " + self.actionName + " " + self.filePath + "?");
        if (continueAction === false) {
            return;
        }
        if ($routeParams.action === "import") {
            self.import();
        }
        else {
            self.export();
        }
    };

    self.import = () => {
        let fileField = document.getElementById('file');
        let f = fileField.files[0];
        let r = new FileReader();

        if (!f) {
            FeedbackBarService.error("No file selected to import!");
            return;
        }

        r.onloadend = function(e) {
            let rawData = e.target.result;
            let data = JSON.parse(rawData);

            CoreGenericService
                .import(self.entity, data)
                .then((res) => {
                    const retVal = res.data;

                    if (retVal >= 0) {
                        FeedbackBarService.info("Imported " + res.data + " " + self.entity + "s.");
                        fileField.value = null;
                    }
                    else if (retVal == -1) {
                        FeedbackBarService.error("Failed to import \"" + f.name + "\". Invalid data.");
                    }
                    else {
                        FeedbackBarService.error("Failed to import \"" + f.name + "\". Could not save to database.");
                    }
                    self.inprogress = false;
                });
        }

        r.readAsBinaryString(f);
        self.inprogress = true;
    };

    self.export = () => {
        CoreGenericService
            .export(self.entity, self.filePath)
            .then((res) => {
                FeedbackBarService.info("Exported " + res.data + " " + self.entity + "s.");
            });
    };
}

angular
    .module('core')
    .component('importExport', {
        templateUrl: "modules/core/import-export/core-importexport.template.html",
        controller: ['$routeParams', 'CoreGenericService', 'FeedbackBarService', CoreExportController]
});
