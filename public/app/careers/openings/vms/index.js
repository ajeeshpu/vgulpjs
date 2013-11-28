

define(['common/vms/BaseIndex','jquery','knockout'
    ],function(BaseIndex,$,ko){
    var VM=function(data){
         var self=this;
        BaseIndex.call(this,data)
        self.content={}
        self.compositionComplete=function(view,parent){
            self.addMetaAttributes(data)

        }
        self.activate=function(){
            console.log('activate is called');
            var defer= $.Deferred();
            var route=self.routes.getFromHash(window.location.hash)
            console.log('route is is ',window.location.hash,route.dataModuleUrl);
            require([route.dataModuleUrl],function(data){
                self.content=data
                console.log("data -->",self.content);
                defer.resolve();
            })
            return defer.promise();
        }
        self.binding=function(){


        }

    }
    VM.prototype=Object.create(BaseIndex.prototype)
    return VM;

})
