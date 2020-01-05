'use strict';

function FeedbackBarController(FeedbackBarService) {
    let self = this;
    const infoFeedbackClass = "navbar navbar-expand-md bg-info fixed-bottom";
    const errorFeedbackClass = "navbar navbar-expand-md bg-danger fixed-bottom";
    const hideFeedbackClass = "";
    const hideFeedbackText = "";

    self.feedbackText = hideFeedbackText;
    self.feedbackClass = hideFeedbackClass;

    self.info = (text) => {
        self.feedbackText = text;
        self.feedbackClass = infoFeedbackClass;
    };

    self.error = (text) => {
        self.feedbackText = text;
        self.feedbackClass = errorFeedbackClass;
    };

    self.hide = () => {
        self.feedbackClass = hideFeedbackClass;
        self.feedbackText = hideFeedbackText;
    };

    FeedbackBarService.registerFeedbackBar(self);
}


angular
    .module('core')
    .component('feedbackBar', {
        templateUrl: 'modules/core/feedback-bar/core-feedbackbar.template.html',
        controller: ['FeedbackBarService', FeedbackBarController]
    });
