define(['jquery', 'jqueryPlugins/jquery.cookie','plugins/dialog', 'knockout'], function ($, cookie,dialog,ko) {
    var AgeGate = function (data) {
        var self = this;
        self.data = data
        self.showAgeGate = ko.observable(true)



        self.confirmLegalAge = function () {
            if ($.cookie('age_verified') == 'yes') {
                dialog.close(self);
                return;
            }
            $.cookie('age_verified', 'yes', {path: "/"});
            self.showAgeGate(false);

            dialog.close(self);
            console.log("confirm legal age", "Here it is");

        }
        self.isAgeGateVerified = function () {
            return !self.showAgeGate()
        }

        if (data.showAgeGate === "false" || data.showAgeGate === false) {
            self.showAgeGate(false)
        }
    }
    AgeGate.show = function (data) {
        if($.cookie('age_verified') == 'yes'){
            return ;
        }
        dialog.getContext().blockoutOpacity=0.7
        return dialog.show(new AgeGate(data));
    }
    return AgeGate;
})