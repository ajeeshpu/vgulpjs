

define(['durandal/system','durandal/app','common/vms/BaseIndex',
    'bootstrap/bootstrap-carousel'],function(system,app,BaseIndex){
    var VM=function(data){
         var self=this;
        BaseIndex.call(this,data)
        self.showCustomModal=function(){
            system.log("Show Modal-->");

        }
        self.compositionComplete=function(view,parent){
            self.addMetaAttributes(data)
            $("#myCarousel").carousel();
            $("#myCarousel").bind('slid',function(){
                    $('.spinner').hide("slow");
                }
            );


            //self.loadShareThis();
            console.log("Composition completed");

        }

    }
    VM.prototype=Object.create(BaseIndex.prototype)
    return VM;

})
