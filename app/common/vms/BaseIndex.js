define("text!common/views/metaDetails.html",[],function(){return'<title>{{meta.title}}</title>\n<meta name="description" content="{{meta.description}}">\n<meta property="og:title"  content="{{facebook.title}}"  />\n<meta property="og:description"  content="{{facebook.description}}"/>\n<meta property="og:url" content="{{facebook.pageUrl}}"/>\n<meta property="og:image" content="{{facebook.imageUrl}}" />\n<meta itemprop="image" content="{{facebook.pageUrl}}"/>\n'}),define("common/vms/BaseIndex",["text!common/views/metaDetails.html","common/lib/Routes","jquery","hogan"],function(e,t,n){var r=function(r){var i=this;i.routes=new t,console.log("hash",window.location.hash),i.content={},i.addMetaAttributes=function(e,t){a(),i.unloadWidgets(),u(o),(t===undefined||t===!0)&&i.domReadyCallbacks.push(f),s()},i.domReadyCallbacks=[];var s=function(){var e=n.Deferred(),t=setInterval(function(){n("meta[property*='og']").length>0&&e.resolve()},10);e.promise().then(function(){clearInterval(t);for(var e=0;e<
i.domReadyCallbacks.length;e++)i.domReadyCallbacks[e]()})};i.unloadWidgets=function(){requirejs.undef("shareThis/socialWidgets"),requirejs.undef("http://w.sharethis.com/button/buttons.js"),n("script[src*='sharethis']").remove(),n("#stwrapper").remove(),n("stSegmentFrame").remove(),n("stcpDiv").remove()};var o=function(t){n("head title").remove();var r=Hogan.compile(e).render(t);n("head").append(r)},u=function(e){var t=i.routes.getFromHash(window.location.hash);console.log("route",window.location.hash,t),require([t.dataModuleUrl],function(t){e(t)})},a=function(){n("title").remove(),n("meta[property*='og']").remove(),n("meta[name='description']").remove()},f=function(){require(["shareThis/socialWidgets"])}};return r});