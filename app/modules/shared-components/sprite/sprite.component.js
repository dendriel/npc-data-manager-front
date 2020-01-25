'use strict';

function SpriteController() {
}

angular
    .module('sharedcomponents')
    .component('sprite', {
        templateUrl: 'modules/shared-components/sprite/sprite.template.html',
        controller: [SpriteController],
        bindings: {
            data: '='
        }
    });
