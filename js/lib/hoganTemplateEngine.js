ko.hoganTemplateEngine = function() {}, ko.hoganTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine, {
    makeTemplateSource: function(e) {
        if (typeof e == "object") return e;
        throw new Error("Unknown template type: " + e);
    },
    renderTemplateSource: function(e, t, n) {
        var r = t.$data, i = e.render(r);
        return ko.utils.parseHtmlFragment(i);
    },
    allowTemplateRewriting: !1,
    version: "0.1.0"
}), ko.setTemplateEngine(new ko.hoganTemplateEngine);;