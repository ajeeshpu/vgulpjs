define(["jquery","app/age-gate/vms/ageGate"],function($,ageGate){
    var DealPageApplicationViewModel=function (data,id) {
        var self = this;
        self.baseUrl=data.baseUrl
        self.id=id
        self.ageGate=ageGate
        self.dealClaimShow=ko.observable(true);
        self.email=ko.observable("")
        self.dealClaimSuccessful=ko.observable(false)
        self.dealClaimError=ko.observable(false)

        self.init = function () {
            console.log("Activated VM");
        }
        self.showDealClaim=function(){
            if(!self.ageGate.isAgeGateVerified()){
                return;
            }
            self.dealClaimShow(true)
        }

        self.clearDealStatus=function(){
            self.dealClaimError(false)
            self.dealClaimSuccessful(false)
        }
        self.claimThisDeal=function(id,data){
            if(self.email()==""){
                return;
            }
            var request=$.ajax({
                url:self.baseUrl.concat("/deal/claimOpenDeals/").concat(self.id),
                type:'POST',
                data:{"email":self.email(),"id":self.id},
                dataType:'json'
            })
            request.fail(function(data,jqxr){
                self.dealClaimSuccessful(false)
                self.dealClaimError(true)
            })
            request.done(function(data,jqxr){
                self.dealClaimSuccessful(true)
                self.dealClaimError(false)
            })
            request.always(function(jqxr,text){
                console.log(text==="error")
                if(text==="error"){
                    self.dealClaimSuccessful(false)
                    self.dealClaimError(true)
                }
            })
        }

        self.updateLocation=function(form){
            console.log("Preferred Locations"+ko.toJSON(form));
        }

    }
    return   DealPageApplicationViewModel;
})