'use strict';

function StatusModifierController(FeedbackBarService) {
    let self = this;

    self.addElement = () => {
        self.data.persistentStatusModifiers.push({type: "", value: 10, turns: 4})
    }

    self.removeElement = (elem) => {
        const index = self.data.persistentStatusModifiers.indexOf(elem);
        if (index > -1) {
            self.data.persistentStatusModifiers.splice(index, 1);
        }
        else {
            FeedbackBarService.error("Couldn't remove element from array.")
        }
    };
}

angular
    .module('sharedcomponents')
    .component('statusModifier', {
        templateUrl: 'modules/shared-components/status-modifier/status-modifier.template.html',
        controller: ["FeedbackBarService", StatusModifierController],
        bindings: {
            data: '='
        }
    });
