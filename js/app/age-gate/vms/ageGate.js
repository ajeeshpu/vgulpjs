define(['jquery','jquery.cookie'],function($,cookie){
     var AgeGate=function(data){
        var self=this;
        self.showAgeGate=ko.observable(true)

        self.confirmLegalAge=function(){
             console.log("confirm legal age","Here it is");
             //needs the jquery cookie module.require?
             if($.cookie('age_verified')=='yes'){
                 self.showAgeGate(false);
                 return;
             }
             $.cookie('age_verified', 'yes',{path:"/"});
             self.showAgeGate(false);
         }
         self.isAgeGateVerified=function(){
             return !self.showAgeGate()
         }
         console.log("age Gate",data.showAgeGate)
         if(data.showAgeGate==="false"||data.showAgeGate===false){
             self.showAgeGate(false)
         }
     }
    return AgeGate;
})