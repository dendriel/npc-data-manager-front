'use strict';

function CoreExportController($routeParams, CoreGenericService, FeedbackBarService) {
    let self = this;
    self.fileName = $routeParams.file_name + ".json";
    self.entity = $routeParams.entity;
    self.inprogress = false;

    if ($routeParams.action === "import") {
        self.actionName = "Import";
        self.style = "background-color:#E8F8FF;";
        self.legend = "Import " + self.entity.toUpperCase();
    }
    else {
        self.actionName = "Export";
        self.style = "background-color:#f8d7da;";
        self.legend = "Export " + self.entity.toUpperCase();
    }

    self.getSelectedFile = () => {
        if (self.actionName === "Import") {
            let fileField = document.getElementById('file');
            return fileField ? fileField.files[0].name : "undefined";
        }
        else {
            return self.fileName;
        }
    }

    self.execute = () => {
        let selectedFile = self.getSelectedFile();

        let continueAction = confirm("Do you really want to " + self.actionName + " " + selectedFile + "?");
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
                    else if (retVal === -1) {
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
        if (!self.fileName) {
            FeedbackBarService.error("No file name to export!");
            return;
        }

        self.inprogress = true;
        CoreGenericService
            .export(self.entity, self.fileName)
            .then((res) => {
                let json = JSON.stringify(res.data);

                json = [json];
                let blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

                let url = window.URL || window.webkitURL;
                let link = url.createObjectURL(blob1);
                let a = document.createElement("a");
                a.download = self.fileName;
                a.href = link;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                self.inprogress = false;
                FeedbackBarService.info("Exported " + res.data.data.length + " " + self.entity + "s.");
            });
    };
}

angular
    .module('core')
    .component('importExport', {
        templateUrl: "modules/core/import-export/core-importexport.template.html",
        controller: ['$routeParams', 'CoreGenericService', 'FeedbackBarService', CoreExportController]
});
