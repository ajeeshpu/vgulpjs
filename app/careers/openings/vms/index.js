define(["common/vms/BaseIndex","jquery","knockout"],function(e,t,n){var r=function(n){var r=this;e.call(this,n),r.content={},r.compositionComplete=function(e,t){r.addMetaAttributes(n)},r.activate=function(){console.log("activate is called");var e=t.Deferred(),n=r.routes.getFromHash(window.location.hash);return console.log("route is is ",window.location.hash,n.dataModuleUrl),require([n.dataModuleUrl],function(t){r.content=t,console.log("data -->",r.content),e.resolve()}),e.promise()},r.binding=function(){}};return r.prototype=Object.create(e.prototype),r});