'use strict';

function FeedbackBarController(FeedbackBarService) {
    let self = this;
    const infoFeedbackClass = "navbar navbar-expand-md bg-info fixed-bottom";
    const errorFeedbackClass = "navbar navbar-expand-md bg-danger fixed-bottom";
    const hideFeedbackClass = "";
    const hideFeedbackText = "";
    self.active = false;

    self.feedbackText = hideFeedbackText;
    self.feedbackClass = hideFeedbackClass;

    self.info = (text) => {
        self.feedbackText = text;
        self.feedbackClass = infoFeedbackClass;
        self.active = true;
    };

    self.error = (text) => {
        self.feedbackText = text;
        self.feedbackClass = errorFeedbackClass;
        self.active = true;
    };

    self.hide = () => {
        self.feedbackClass = hideFeedbackClass;
        self.feedbackText = hideFeedbackText;
        self.active = false;
    };

    FeedbackBarService.registerFeedbackBar(self);
}


angular
    .module('core')
    .component('feedbackBar', {
        templateUrl: 'modules/core/feedback-bar/core-feedbackbar.template.html',
        controller: ['FeedbackBarService', FeedbackBarController]
    });
