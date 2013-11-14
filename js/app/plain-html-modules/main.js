require.config({
    baseUrl: 'js/lib',
    shim:{
        'koExternalTemplateEngine':{
            deps:['jquery','knockout'],
            exports:'koExternalTemplateEngine'
        },

        'hoganTemplateEngine':{
            deps:['hogan','knockout']
        },
        'jquery.cookie':{
            deps:['jquery'],
            exports:'jquery.cookie'
        },
        'plain-html-module/jqueryprettyPhoto':{
            "deps":['jquery','plain-html-module/jquery.migrate.1.2.1']
        }

    },
    paths: {

        '*':{'jquery':'jquery-private'},
        'jquery-private':{'jquery':'jquery'},
        'jquery': 'jquery-1.9.1.min',
        'knockout':'knockout-2.2.1.min',
        'app':'../app',
        'hogan':'hogan.min',
        'bootstrap':'bootstrap.min',
        'plain-html-module':'../app/plain-html-modules/lib'


    }

});

define("main",["json!app/modules/routes.json","app/common/lib/Routes",'hoganTemplateEngine',"app/plain-html-modules/vms/PlainContentVM","jquery","app/common/lib/env","require"],function(routes,Routes,hogan,PlainContentVM,$,env,require){
    'use strict';
    console.log("I have loaded this",$('head title')[0],PlainContentVM,window.location.host,env);
    var route=new Routes(routes).get(window.location.pathname);
    var dataUrl='app'.concat("/modules/").concat(route.name).concat('/data/dealDetail.json');
    var data=require(["json!"+dataUrl,"text!app/plain-html-modules/views/"+route.module.slug],function(data,slugHtml) {
        data.env=env
        ko.applyBindings(new PlainContentVM(data,slugHtml),document.getElementById("sitePage"));
    })
})
