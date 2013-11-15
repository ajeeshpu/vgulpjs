define(['app/common/lib/env'],function(env){
    'use strict';
    var Route=function(routes){
        var self=this;
        self.get=function(slug){
            for(var i=0;i<routes.length;i++){
               if(slug.match(routes[i].slug+"$")!= undefined){
                    return routes[i];
               }else{
                   console.log("routes",slug,routes[i].slug,slug.match(routes[i].slug+"$")!=undefined)
               }
            }
            if(slug.match(/env.context$/)!==undefined){
                return self.get('/index.html');
            }
            console.log("Route: "+slug+" not found tried all routes",routes)
        }
    }
    return Route;
})