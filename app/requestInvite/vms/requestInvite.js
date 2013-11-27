define(["jquery","knockout","common/lib/env","requestInvite/lib/requestInvite.ko.bindings"],function($,ko,env){
    var RequestInvite=function(data){
        var self=this
        self.baseUrl=env.baseUrl
        self.id=ko.observable("")
        self.show=ko.observable(false)
        self.email=ko.observable("")
        self.preferredLocationsQuery=ko.observable("")
        self.success=ko.observable(false)
        self.failure=ko.observable(false)
        self.showNext=ko.observable(false)
        self.showShareThis=ko.observable(false)
        self.showTopBar= ko.observable(true)
        self.close=function(){
            self.showRequestInvite(false);
        }
        self.hideTopBar=function(){
            self.showTopBar(false)
        }
        self.reset=function(){
            self.success(false)
            self.failure(false)
            self.show(false)
            self.showShareThis(false)
        }
        self.ask=function(){
            self.reset();
            if(!self.email()){
                return;
            }
            var request=$.ajax({
                url:self.baseUrl.concat('/userRegistration/requestInvite'),
                type:'POST',
                data:{"email":self.email()},
                dataType:'json'
            })
            request.fail(function(data,jqxr){
                self.failure(true)
                self.success(false)
                self.show(false)
            })
            request.done(function(data,jqxr){
                console.log("preferred data",data);
                self.id(data.id );
                self.failure(false)
                self.success(true)
                self.show(true)
            })
            request.always(function(jqxr,text){
                console.log(text==="error")
                if(text==="error"){
                    self.success(false)
                    self.failure(true)
                }
            })
        }

        self.updateInvite=function(form){
            console.log(self.preferredLocationsQuery())
            console.log("Preferred Locations:",$(form).find(self.preferredLocationsQuery()).val())
            var request=$.ajax({
                url:self.baseUrl.concat('/requestInvite/update/')+self.id(),
                type:'POST',
                data:"&preferredLocations="+$(form).find(self.preferredLocationsQuery()).val(),
                dataType:'json'
            })
            request.fail(function(data,jqxr){
                self.failure(true)
                self.success(false)
            })
            request.done(function(data,jqxr){
                self.failure(false)
                self.success(true)
                self.show(false)
                self.showShareThis(true)
            })
            request.always(function(jqxr,text){
                console.log(text==="error")
                if(text==="error"){
                    self.success(false)
                    self.failure(true)
                    self.showShareThis(false)
                }
            })
        }
        self.openShareThis=function(){
            self.show(false)
            self.showShareThis(true)
        }
    }
    return RequestInvite;
})