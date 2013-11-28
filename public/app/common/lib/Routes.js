define(['common/lib/env','json!routes.json','durandal/system'],function(env,routes,system){
    'use strict';
    var Route=function(){
        var self=this;
        self.get=function(slug){
            for(var i=0;i<routes.length;i++){
               if(slug.match(routes[i].slug+"$")!= undefined){
                    return self.dataModuleUrl(routes[i]);
               }else{
                   //console.log("routes",slug,routes[i].slug,slug.match(routes[i].slug+"$")!=undefined)
               }
            }
            if(slug.match(/env.context$/)!==undefined){
                return self.get('/index.html');
            }
            console.log("Route: "+slug+" not found tried all routes",routes)
        }
        self.getFromHash=function(hash){
             var token=hash.match("#![a-zA-z0-9./-]*$")
            console.log("token",token,hash,hash.match("#!"))
            if(token){
               return self.get(token[0].substring(1,token[0].length))
            }
            if(hash.match(/env.context$/)!==undefined){
                return self.get('/index.html');
            }
            console.log("Route: "+hash+" not found tried all routes",routes)

        }
        var transformRoute=function(data,index){
            var result={}
            result.route="!"+data.slug
            result.moduleId=data.name+"/vms/index"
            result.nav=index
            return result
        }
        var printRoutes=function(routeMap){
            for(var i=0;i<routeMap.length;i++){
                //system.log("{route"+routeMap[i].route+",moduleId:"+routeMap[i].moduleId+",nav:"+routeMap[i].nav+"}");
            }
        }
        self.routeMap=function(){
            var routeMap=[]
            routeMap.push({route:'',moduleId:'plain-html-modules/home/vms/index',nav:1})

            for(var i=0;i<routes.length;i++){
                routeMap.push(transformRoute(routes[i],i+2))

            }
            printRoutes(routeMap)
            return routeMap;
        }
        self.dataModuleUrl=function(route){
            route.dataModuleUrl= 'json!'.concat(route.name).concat('/data/').concat(route.slug.replace('.html','.json'))
            console.log("Route data module url",route.dataModuleUrl);
            return route;
        }
        self.currentRoute=function(){
            return self.getFromHash(window.location.hash)
        }

    }
    return Route;
})