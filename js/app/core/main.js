define([ "jquery", "json!app/modules/routes.json", "app/common/lib/Routes", "hoganTemplateEngine", "app/common/lib/env", "require" ], function() {}), define([ "jquery", "json!app/modules/routes.json", "app/common/lib/Routes", "hoganTemplateEngine", "app/common/lib/env", "require", "app/plain-html-modules/vms/PlainContentVM" ], function($, routes, Routes, hogan, env, require, PlainContentVM) {
    console.log("I have loaded this", $("head title")[0], PlainContentVM, window.location.host, env);
    var route = (new Routes(routes)).get(window.location.pathname);
    console.log("Route", route);
    var dataUrl = "app".concat("/modules/").concat(route.name).concat("/data/dealDetail.json"), data = require([ "json!" + dataUrl, "text!app/plain-html-modules/views/" + route.slug ], function(data, slugHtml) {
        data.env = env, ko.applyBindings(new PlainContentVM(data, slugHtml), document.getElementById("sitePage"));
    });
});;