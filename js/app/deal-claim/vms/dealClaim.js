define([ "jquery", "app/age-gate/vms/ageGate" ], function($, ageGate) {
    var DealPageApplicationViewModel = function(data, id) {
        var self = this;
        self.baseUrl = data.baseUrl, self.id = id, self.ageGate = ageGate, self.dealClaimShow = ko.observable(!0), self.email = ko.observable(""), self.dealClaimSuccessful = ko.observable(!1), self.dealClaimError = ko.observable(!1), self.init = function() {
            console.log("Activated VM");
        }, self.showDealClaim = function() {
            if (!self.ageGate.isAgeGateVerified()) return;
            self.dealClaimShow(!0);
        }, self.clearDealStatus = function() {
            self.dealClaimError(!1), self.dealClaimSuccessful(!1);
        }, self.claimThisDeal = function(id, data) {
            if (self.email() == "") return;
            var request = $.ajax({
                url: self.baseUrl.concat("/deal/claimOpenDeals/").concat(self.id),
                type: "POST",
                data: {
                    email
: self.email(),
                    id: self.id
                },
                dataType: "json"
            });
            request.fail(function(data, jqxr) {
                self.dealClaimSuccessful(!1), self.dealClaimError(!0);
            }), request.done(function(data, jqxr) {
                self.dealClaimSuccessful(!0), self.dealClaimError(!1);
            }), request.always(function(jqxr, text) {
                console.log(text === "error"), text === "error" && (self.dealClaimSuccessful(!1), self.dealClaimError(!0));
            });
        }, self.updateLocation = function(form) {
            console.log("Preferred Locations" + ko.toJSON(form));
        };
    };
    return DealPageApplicationViewModel;
});;