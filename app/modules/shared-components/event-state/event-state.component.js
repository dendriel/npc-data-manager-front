'use strict';

function EventStateController() {
    let self = this;

    self.addEventState = (eventsState) => {
        eventsState.push({
            type: "SWITCH",
            key: "FIX ME",
            value: false
        })
    };

    self.removeElementFromArray = (arr, elem) => {
        const index = arr.indexOf(elem);
        if (index > -1) {
            arr.splice(index, 1);
        }
        else {
            FeedbackBarService.error("Couldn't remove element from array.")
        }
    };
}

angular
    .module("sharedcomponents")
    .component("eventState", {
        templateUrl: "modules/shared-components/event-state/event-state.template.html",
        controller: [EventStateController],
        bindings: {
            data: '='
        }
    });
