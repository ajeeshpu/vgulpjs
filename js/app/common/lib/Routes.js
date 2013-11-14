define([],function(){
    'use strict';
    var Route=function(routes){
        var self=this;
        self.get=function(slug){
            for(var i=0;i<routes.length;i++){
                //console.log("routes",routes,slug,routes[i].slug,routes[i].slug===slug)

                if(routes[i].slug===slug || "/".concat(routes[i].slug)  ===slug){
                    return routes[i];
                }
            }
        }
    }
    return Route;
})