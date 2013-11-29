define(['ageGate/vms/ageGate','durandal/system','durandal/app','common/vms/BaseIndex', 'jquery',
    'bootstrap/bootstrap-carousel'],function(AgeGate,system,app,BaseIndex,$){
    var VM=function(data){
         var self=this;
        BaseIndex.call(this,data)
        self.urlHash={}
        self.createUrlHash=function(){
            self.urlHash.slide_one="bangalore-drink-deals/doff-the-pub-and-lounge-indira-nagar.html";
            self.urlHash.slide_two="bangalore-drink-deals/lock-n-load-club-sahakara-nagar.html";
            self.urlHash.slide_three="bangalore-drink-deals/chairmans-jade-resort-devanahalli.html";
            self.urlHash.slide_four="bangalore-drink-deals/peacock-indira-nagar.html";
            self.urlHash.slide_five="bangalore-drink-deals/woodstok-indira-nagar.html";
        }
        self.compositionComplete=function(view,parent){
            self.addMetaAttributes(data)
            $("#myCarousel").carousel();
            $("#myCarousel").bind('slid',function(){
                    $('.spinner').hide("slow");
                }
            );


        }
        var acivateSliderLinks=function(){
            $('.try-this').each(function(index,item){
                console.log(item,$('div.active').attr('id'))
                $(item).click(function(){
                    console.log("Check this",self.urlHash[$('div.active').attr('id')]);
                    window.location.hash="#!"+self.urlHash[$('div.active').attr('id')]
                })
            })
        }
        var activateVideo=function(){
            require(['prettyPhoto/jqueryPrettyPhoto'],function(){
                $("a[rel^='prettyPhoto']").prettyPhoto({
                    default_width: 800,
                    default_height: 460,
                    social_tools: ''
                });
            })
        }
        self.init=function(){
            self.domReadyCallbacks.push(function(){ AgeGate.show({})});
            self.domReadyCallbacks.push(acivateSliderLinks);
            self.domReadyCallbacks.push(activateVideo)
            self.createUrlHash()
        }
        self.init();

    }
    VM.prototype=Object.create(BaseIndex.prototype)
    return VM;

})
