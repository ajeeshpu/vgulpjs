define([ "text!app/deal-claim/views/dealClaim.html", "text!app/deal/views/dealDetailLayout.html", "app/deal/lib/googleMap", "app/deal-claim/vms/dealClaim", "app/deal/vms/baseDealVM", "require" ], function(dealClaim, dealDetail, Map, DealClaimVM, BaseDealVM, require) {
    var DealVM = function(content) {
        var self = this;
        self.parent = BaseDealVM.prototype, BaseDealVM.call(self, content), self.dealClaimVM = new DealClaimVM(content.env, content._id), self.dealDetail = function() {
            return Hogan.compile(dealDetail);
        }, self.dealClaimTemplate = function() {
            return Hogan.compile(dealClaim);
        }, self.afterRender = function() {
            self.rendered(!0), $("#myCarousel").carousel(), $("#myCarousel").bind("slid", function() {
                $(".spinner").hide("slow");
            }), require([ "domReady!", "app/deal/lib/shareThis", "jquery" ], function(doc, shareThis, $) {
                self.map = new Map({
                    mapDiv: 
document.getElementById("map-canvas"),
                    location: content.location
                });
            });
        };
    };
    return DealVM.prototype = Object.create(BaseDealVM.prototype), DealVM;
});;