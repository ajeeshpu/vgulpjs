define(['ageGate/vms/ageGate','durandal/system','durandal/app','common/vms/BaseIndex','jquery','deals/vms/dealClaim' ,'knockout','common/lib/googleMap',
    'bootstrap/bootstrap-carousel'],function(AgeGate,system,app,BaseIndex,$,DealClaim,ko,Map){
    var VM=function(data){
         var self=this;
        BaseIndex.call(this,data)
        self.content={}
        self.dealClaim=ko.observable({})
        self.compositionComplete=function(view,parent){
            self.addMetaAttributes(data)
            $("#myCarousel").carousel();
            $("#myCarousel").bind('slid',function(){
                    $('.spinner').hide("slow");
                }
            );


        }
        var displayMap=function(){
            self.map = new Map({"mapDiv": document.getElementById("map-canvas"), "location": self.content.location})
        }
        var showAgeGate=function(){
            AgeGate.show({})

        }
        self.init=function(){
            self.domReadyCallbacks.push(showAgeGate)
            self.domReadyCallbacks.push(displayMap)
        }
        self.activate=function(){
            var defer = $.Deferred();
            require([self.routes.currentRoute().dataModuleUrl],function(data){
                self.content=data
                self.dealClaim(new DealClaim(data,data._id))
                console.log("Peacock -->",data);
                defer.resolve();
            })
            return defer.promise();
        }
        self.init();
    }
    VM.prototype=Object.create(BaseIndex.prototype)
    return VM;

})
