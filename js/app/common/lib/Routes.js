define(['app/common/lib/env'],function(env){
    'use strict';
    var Route=function(routes){
        var self=this;
        self.get=function(slug){
            for(var i=0;i<routes.length;i++){
                //console.log("routes",routes,slug,routes[i].slug,routes[i].slug===slug)
                console.log("routes",slug,routes[i].slug,slug.match(routes[i].slug+"$"))

                if(routes[i].slug===slug || "/".concat(routes[i].slug)  ===slug){
                    return routes[i];
                }else if(slug.match(routes[i].slug+"$")!==undefined){
                    return routes[i];
                }
            }
            if(slug.match(/env.context$/)!==undefined){
                return self.get('/index.html');
            }
            console.log("Route: "+slug+" not found")
        }
    }
    return Route;
})