define([ "jquery", "jquery.cookie", "app/age-gate/lib/ageGate.ko.bindings" ], function($, cookie) {
    var AgeGate = function(data) {
        var self = this;
        self.showAgeGate = ko.observable(!0), self.confirmLegalAge = function() {
            console.log("confirm legal age", "Here it is");
            if ($.cookie("age_verified") == "yes") {
                self.showAgeGate(!1);
                return;
            }
            $.cookie("age_verified", "yes", {
                path: "/"
            }), self.showAgeGate(!1);
        }, self.isAgeGateVerified = function() {
            return !self.showAgeGate();
        }, console.log("age Gate", data.showAgeGate), (data.showAgeGate === "false" || data.showAgeGate === !1) && self.showAgeGate(!1);
    };
    return AgeGate;
});;