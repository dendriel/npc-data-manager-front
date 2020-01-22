'use strict';

function SpriteController() {
    let self = this;
    console.log(self.spriteData);
}

angular
    .module('sharedcomponents')
    .component('sprite', {
        templateUrl: 'modules/shared-components/sprite/sprite.template.html',
        controller: [SpriteController],
        bindings: {
            spriteData: '='
        }
    });
