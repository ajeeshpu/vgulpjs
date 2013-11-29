define(['text!common/views/metaDetails.html','common/lib/Routes','jquery','hogan'],function(metaDetails,Routes,$){
    var BaseVM=function(data){
        var self=this
        self.routes=new Routes()
        console.log("hash",window.location.hash)
        self.content={}
        self.addMetaAttributes=function(metaData,loadShareWidgets){
            deleteMetaTags()
            self.unloadWidgets();
            includeMetaInHead(appendMetaTags);
            if(loadShareWidgets===undefined || loadShareWidgets===true){
                self.domReadyCallbacks.push(loadShareThis);
            }
            domReady();
        }
        self.domReadyCallbacks=[]
        var domReady=function(){
            var deferred=$.Deferred()
            var isDomReady=setInterval(function(){
                if($("meta[property*='og']").length>0){
                    deferred.resolve();
                }
            },10);
            deferred.promise().then(function(){
                clearInterval(isDomReady);
                for(var i=0;i<self.domReadyCallbacks.length;i++){
                    self.domReadyCallbacks[i]()
                }
            })
        }
        self.unloadWidgets=function(){
            requirejs.undef('shareThis/socialWidgets')
            requirejs.undef('http://w.sharethis.com/button/buttons.js');
            $("script[src*='sharethis']").remove();
            $("#stwrapper").remove()
            $("stSegmentFrame").remove()
            $("stcpDiv").remove()
        }
        var appendMetaTags=function(data){
            $("head title").remove()
            var metaTagHtml=Hogan.compile(metaDetails).render(data)
            $("head").append(metaTagHtml);
        }
        var includeMetaInHead=function(callback){
            var route=self.routes.getFromHash(window.location.hash)
            console.log('route',window.location.hash,route);
            require([route.dataModuleUrl],function(data){
                    callback(data)
            })

        }
        var deleteMetaTags=function(){
            $("title").remove()
            $("meta[property*='og']").remove()
            $("meta[name='description']").remove()
        }
        var loadShareThis=function(){
            /*require(['domReady!','shareThis/socialWidgets'],function(domReady,socialWidgets){
            })*/
            require(['shareThis/socialWidgets']);

        }
        /*self.detached=function(view){
            console.log('Detached!!!!');
            self.unloadWidgets()
        }*/

    }
    return BaseVM;
})