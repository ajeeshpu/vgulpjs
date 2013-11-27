

define(['common/vms/BaseIndex',
    ],function(BaseIndex){
    var VM=function(data){
         var self=this;
        BaseIndex.call(this,data)
        self.compositionComplete=function(view,parent){
            self.addMetaAttributes(data)
        }
    }
    VM.prototype=Object.create(BaseIndex.prototype)
    return VM;

})
