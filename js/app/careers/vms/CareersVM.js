define([ "text!app/careers/views/careersLayout.html", "app/deal/vms/baseDealVM", "require" ], function(layoutHTML, BaseDealVM, require) {
    var PlainContentVM = function(content) {
        var self = this;
        BaseDealVM.call(self, content), self.requestInviteTemplate = function() {
            return Hogan.compile(requestInviteHtml);
        }, self.careersLayoutTemplate = function() {
            return Hogan.compile(layoutHTML);
        }, self.afterRender = function() {
            self.rendered(!0), require([ "domReady!", "app/deal/lib/shareThis", "jquery" ], function(doc, shareThis, $, prettyPhoto) {});
        };
    };
    return PlainContentVM.prototype = Object.create(BaseDealVM.prototype), PlainContentVM;
});;