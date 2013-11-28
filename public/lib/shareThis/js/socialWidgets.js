define(['jquery','http://w.sharethis.com/button/buttons.js'],function($){
    'use strict';
    var switchTo5x=false;
    stLight.options({publisher: "90dcd702-a013-45a5-aecc-ea34cf513ee3", doNotHash: false, doNotCopy: false, hashAddressBar: true});

    stButtons.locateElements();
    var deferred=$.Deferred()
    var isDomReady=setInterval(function(){
        console.log("og atts",$("meta[property*='og']")[0]);
        if($("meta[property*='og']").length>0){
            deferred.resolve();
        }
    },10);
    deferred.promise().then(function(){
        clearInterval(isDomReady);
        require(['http://w.sharethis.com/button/buttons.js'],function(socialWidgets){


        })
    })

    /*stLight.loadServicesLoggedIn(function(){
        stLight.getAllAppDefault(function () {
            stlib.data.init()
            stButtons.locateElements();
            stButtons.makeButtons();
        })
    })*/
    console.log("stlight called again");
    return {
        unload:function(){
            requirejs.undef('shareThis/socialWidgets')
            requirejs.undef('http://wd.sharethis.com/button/buttons.js');
        }
    }
})