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
                loadShareThis();
            }
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
            require(['domReady!','shareThis/socialWidgets'],function(domReady,socialWidgets){
            })

        }
        /*self.detached=function(view){
            console.log('Detached!!!!');
            self.unloadWidgets()
        }*/

    }
    return BaseVM;
})