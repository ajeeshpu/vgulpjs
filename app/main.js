requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'prettyPhoto':'../lib/prettyPhoto/js',
        'shareThis':'../lib/shareThis/js',
        'jqueryPlugins':'../lib/jquery',
        'domReady':'../lib/require/domReady',
        'hogan':'../lib/hogan/hogan.min',
        'json':'../lib/require/json',
        'async':'../lib/require/async',
        'facebook': '//connect.facebook.net/en_US/all',
        'fb':'../lib/facebook/fb'

    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'bootstrap-carousel': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'bootstrap-modal': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'prettyPhoto/jqueryPrettyPhoto':{
            deps:['jquery','jqueryPlugins/jquery.migrate.1.2.1'],
            exports:'jQuery'
        },
        'jqueryPlugins/jquery.cookie':{
            deps:['jquery','jqueryPlugins/jquery.migrate.1.2.1'],
            exports:'jQuery'
        } ,
        'facebook' : {
            export: 'FB'
        }

    }
});
var queryParams=(function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'))

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Vgulp | Drink Responsibly,Socially';

    //specify which plugins to install and their configuration
    app.configurePlugins({
        router:true,
        dialog: true,
        widget: {
            kinds: ['expander']
        }
    });
    system.log("Query Params: Escaped Fragment (SEO)",queryParams['__escaped_fragment__']);
    if(queryParams['__escaped_fragment__']!== undefined){
        window.location.assign("snapshots/sp_"+queryParams['__escaped_fragment__']+".html")
        return;
    }

    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention('vms','views');

        //Show the app by setting the root view model for our application.
        app.setRoot('shell','entrance');
    });
});