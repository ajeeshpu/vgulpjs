require.config({
    baseUrl: "../js/lib",
    shim: {
        koExternalTemplateEngine: {
            deps: [ "jquery", "knockout" ],
            exports: "koExternalTemplateEngine"
        },
        hoganTemplateEngine: {
            deps: [ "hogan", "knockout" ]
        },
        "jquery.cookie": {
            deps: [ "jquery" ],
            exports: "jquery.cookie"
        }
    },
    paths: {
        "*": {
            jquery: "jquery-private"
        },
        "jquery-private": {
            jquery: "jquery"
        },
        jquery: "jquery-1.9.1.min",
        knockout: "knockout-2.2.1.min",
        app: "../app",
        hogan: "hogan.min",
        bootstrap: "bootstrap.min"
    }
}), define("main", [ "json!app/modules/routes.json", "app/common/lib/Routes", "hoganTemplateEngine", "app/careers/vms/CareersVM", "jquery", "app/common/lib/env", "require" ], function(routes, Routes, hogan, CareersVM, $, env, require) {
    console.log("I have loaded this", $("head title")[0], CareersVM
, window.location.host, env);
    var route = (new Routes(routes)).get(window.location.pathname), dataUrl = "app".concat("/modules/").concat(route.name).concat("/data/dealDetail.json"), data = require([ "json!" + dataUrl ], function(data) {
        data.env = env, console.log("data", data), ko.applyBindings(new CareersVM(data), document.getElementById("careersPage"));
    });
});;