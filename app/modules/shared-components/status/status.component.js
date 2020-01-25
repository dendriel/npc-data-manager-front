'use strict';

function StatusController() {
}

angular
    .module('sharedcomponents')
    .component('status', {
        templateUrl: 'modules/shared-components/status/status.template.html',
        controller: [StatusController],
        bindings: {
            data: '='
        }
    });
