/**
 * Durandal 2.0.1 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */

define(["durandal/system","durandal/viewEngine","durandal/composition","durandal/events","jquery"],function(e,t,n,r,i){function a(){return e.defer(function(t){if(o.length==0){t.resolve();return}e.acquire(o).then(function(n){for(var r=0;r<n.length;r++){var i=n[r];if(i.install){var s=u[r];e.isObject(s)||(s={}),i.install(s),e.log("Plugin:Installed "+o[r])}else e.log("Plugin:Loaded "+o[r])}t.resolve()}).fail(function(t){e.error("Failed to load plugin(s). Details: "+t.message)})}).promise()}var s,o=[],u=[];return s={title:"Application",configurePlugins:function(t,n){var r=e.keys(t);n=n||"plugins/",n.indexOf("/",n.length-1)===-1&&(n+="/");for(var i=0;i<r.length;i++){var s=r[i];o.push(n+s),u.push(t[s])}},start:function(){return e.log("Application:Starting"),this.title&&(document.title=this.title),e.defer(function(t){i(function(){a().then(function(){t.resolve(),e.log("Application:Started")})})}).promise()},setRoot:function(r,i,s){var o,u={activate:!0,transition:i};!s||e.isString(s)?o=document.getElementById
(s||"applicationHost"):o=s,e.isString(r)?t.isViewUrl(r)?u.view=r:u.model=r:u.model=r,n.compose(o,u)}},r.includeIn(s),s});