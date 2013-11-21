define([ "text!app/request-invite/views/requestInviteWithGo.html", "text!app/plain-html-modules/views/pressspeak.html", "text!app/request-invite/views/requestInviteWhiteRow.html", "text!app/plain-html-modules/views/randomContentLayout.html", "app/deal/vms/baseDealVM", "app/plain-html-modules/lib/bootstrap-carousel", "require" ], function(requestInviteSmallHtml, pressSpeakHtml, requestInviteHtml, layoutHTML, BaseDealVM, carousel, require) {
    var PlainContentVM = function(content, slugHtml) {
        var self = this;
        BaseDealVM.call(self, content), self.urlHash = {}, self.createUrlHash = function() {
            self.urlHash.slide_one = "bangalore-drink-deals/doff-the-pub-and-lounge-indira-nagar.html", self.urlHash.slide_two = "bangalore-drink-deals/lock-n-load-club-sahakara-nagar.html", self.urlHash.slide_three = "bangalore-drink-deals/chairmans-jade-resort-devanahalli.html", self.urlHash.slide_four = "bangalore-drink-deals/peacock-indira-nagar.html", self.urlHash.slide_five = "bangalore-drink-deals/woodstok-indira-nagar.html"
;
        }, self.requestInviteSmallTemplate = function() {
            return Hogan.compile(requestInviteSmallHtml);
        }, self.requestInviteTemplate = function() {
            return Hogan.compile(requestInviteHtml);
        }, self.plainHTMLTemplate = function() {
            return Hogan.compile(layoutHTML);
        }, self.slugTemplate = function() {
            return Hogan.compile(slugHtml);
        }, self.pressSpeakTemplate = function() {
            return Hogan.compile(pressSpeakHtml);
        }, self.afterRender = function() {
            self.rendered(!0), $("#myCarousel").carousel(), $("#myCarousel").bind("slid", function() {
                $(".spinner").hide("slow");
            }), require([ "domReady!", "app/deal/lib/shareThis", "jquery", "plain-html-module/jqueryprettyPhoto", "http://connect.facebook.net/en_US/all.js#xfbml=1&appId=538507336185757" ], function(doc, shareThis, $, prettyPhoto) {
                $(".try-this").each(function(index, item) {
                    
console.log(item, $("div.active").attr("id")), $(item).click(function() {
                        console.log("Check this"), window.location.href = "./" + self.urlHash[$("div.active").attr("id")];
                    });
                }), $("a[rel^='prettyPhoto']").prettyPhoto({
                    default_width: 800,
                    default_height: 460,
                    social_tools: ""
                });
            });
        }, self.createUrlHash();
    };
    return PlainContentVM.prototype = Object.create(BaseDealVM.prototype), PlainContentVM;
});;