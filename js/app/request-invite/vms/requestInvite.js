define([ "jquery", "knockout", "app/request-invite/lib/requestInvite.ko.bindings" ], function($, knockout) {
    var RequestInvite = function(data) {
        var self = this;
        self.baseUrl = data.baseUrl, self.id = ko.observable(""), self.show = ko.observable(!1), self.email = ko.observable(""), self.preferredLocationsQuery = ko.observable(""), self.success = ko.observable(!1), self.failure = ko.observable(!1), self.showNext = ko.observable(!1), self.showShareThis = ko.observable(!1), self.showTopBar = ko.observable(!0), self.close = function() {
            self.showRequestInvite(!1);
        }, self.hideTopBar = function() {
            self.showTopBar(!1);
        }, self.reset = function() {
            self.success(!1), self.failure(!1), self.show(!1), self.showShareThis(!1);
        }, self.ask = function() {
            self.reset();
            if (!self.email()) return;
            var request = $.ajax({
                url: self.baseUrl.concat("/userRegistration/requestInvite"
),
                type: "POST",
                data: {
                    email: self.email()
                },
                dataType: "json"
            });
            request.fail(function(data, jqxr) {
                self.failure(!0), self.success(!1), self.show(!1);
            }), request.done(function(data, jqxr) {
                self.id(data.id), self.failure(!1), self.success(!0), self.show(!0);
            }), request.always(function(jqxr, text) {
                console.log(text === "error"), text === "error" && (self.success(!1), self.failure(!0));
            });
        }, self.updateInvite = function(form) {
            console.log(self.preferredLocationsQuery()), console.log("Preferred Locations:", $(form).find(self.preferredLocationsQuery()).val());
            var request = $.ajax({
                url: self.baseUrl.concat("/requestInvite/update/") + self.id(),
                type: "POST",
                data: "&preferredLocations=" + $(form).find(self.preferredLocationsQuery
()).val(),
                dataType: "json"
            });
            request.fail(function(data, jqxr) {
                self.failure(!0), self.success(!1);
            }), request.done(function(data, jqxr) {
                self.failure(!1), self.success(!0), self.show(!1), self.showShareThis(!0);
            }), request.always(function(jqxr, text) {
                console.log(text === "error"), text === "error" && (self.success(!1), self.failure(!0), self.showShareThis(!1));
            });
        }, self.openShareThis = function() {
            self.show(!1), self.showShareThis(!0);
        };
    };
    return RequestInvite;
});;