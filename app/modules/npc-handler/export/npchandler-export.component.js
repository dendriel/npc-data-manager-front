'use strict';

function NpcHandlerExportController($routeParams, NpcHandlerService, FeedbackBarService) {
    let self = this;
    self.filePath = "E:\\workspace\\Java\\the-quest\\src\\com\\thequest\\resources\\data\\npcs_data.json";

    if ($routeParams.action === "import") {
        self.actionName = "Import";
    }
    else {
        self.actionName = "Export";
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
        NpcHandlerService
            .import(self.filePath)
            .then((res) => {
                FeedbackBarService.info("Imported " + res.data + " NPCS.");
            });
    };

    self.export = () => {
        NpcHandlerService
            .export(self.filePath)
            .then((res) => {
                FeedbackBarService.info("Exported " + res.data + " NPCS.");
            });
    };
}

angular
    .module('npchandler')
    .component('npcExport', {
        templateUrl: "modules/npc-handler/export/npchandler-export.template.html",
        controller: ['$routeParams', 'NpcHandlerService', 'FeedbackBarService', NpcHandlerExportController]
});
