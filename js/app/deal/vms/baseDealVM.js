define(["text!app/request-invite/views/requestInvite.html","text!app/age-gate/views/ageGate.html",
    "app/common/vms/layout","hogan","app/age-gate/vms/ageGate","app/request-invite/vms/requestInvite","require"],
    function(requestInvite,ageGate,layout,hogan,AgeGateVM,RequestInviteVM,require){
        var BaseDealVM=function(content){
            var self=this;
            self.content=content;
            self.layout=layout
            self.rendered=ko.observable(false)
            self.ageGateVM=new AgeGateVM(content)
            self.requestInviteVM=new RequestInviteVM(content.env)

            self.ageGateTemplate=function(){
                return Hogan.compile(ageGate)
            }
            self.requestInviteTemplate=function(){
                return Hogan.compile(requestInvite);
            }
            self.afterRender=function(){
                self.rendered(true)
                $("#myCarousel").carousel();
                $("#myCarousel").bind('slid',function(){
                        $('.spinner').hide("slow");
                    }
                );

            }
            self.content=content


        }
        return BaseDealVM;
    })