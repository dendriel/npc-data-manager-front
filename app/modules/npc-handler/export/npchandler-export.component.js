'use strict';

function NpcHandlerExportController(NpcHandlerService, FeedbackBarService) {
    let self = this;
    self.exportFilePath = "E:\\workspace\\Java\\the-quest\\src\\com\\thequest\\resources\\data\\npcs_data.json";

    self.export = () => {
        NpcHandlerService
            .export(self.exportFilePath)
            .then((res) => {
                FeedbackBarService.info("Exported " + res.data + " NPCS.");
            });
    }
}

angular
    .module('npchandler')
    .component('npcExport', {
        templateUrl: "modules/npc-handler/export/npchandler-export.template.html",
        controller: ['NpcHandlerService', 'FeedbackBarService', NpcHandlerExportController]
});
