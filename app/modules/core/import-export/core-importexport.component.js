'use strict';

function CoreExportController($routeParams, CoreGenericService, FeedbackBarService) {
    let self = this;
    self.file_name = $routeParams.file_name;
    self.entity = $routeParams.entity;
    self.filePath = "E:\\workspace\\Java\\quest\\src\\main\\resources\\data\\data\\" + self.file_name + ".json";

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
        CoreGenericService
            .import(self.entity, self.filePath)
            .then((res) => {
                FeedbackBarService.info("Imported " + res.data + " " + self.entity + "s.");
            });
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
