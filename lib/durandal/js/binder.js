/**
 * Durandal 2.0.1 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */

define(["durandal/system","knockout"],function(e,t){function u(t){return t===undefined?{applyBindings:!0}:e.isBoolean(t)?{applyBindings:t}:(t.applyBindings===undefined&&(t.applyBindings=!0),t)}function a(a,f,l,c){if(!f||!l){n.throwOnErrors?e.error(r):e.log(r,f,c);return}if(!f.getAttribute){n.throwOnErrors?e.error(i):e.log(i,f,c);return}var h=f.getAttribute("data-view");try{var p;return a&&a.binding&&(p=a.binding(f)),p=u(p),n.binding(c,f,p),p.applyBindings?(e.log("Binding",h,c),t.applyBindings(l,f)):a&&t.utils.domData.set(f,o,{$data:a}),n.bindingComplete(c,f,p),a&&a.bindingComplete&&a.bindingComplete(f),t.utils.domData.set(f,s,p),p}catch(d){d.message=d.message+";\nView: "+h+";\nModuleId: "+e.getModuleId(c),n.throwOnErrors?e.error(d):e.log(d.message)}}var n,r="Insufficient Information to Bind",i="Unexpected View Type",s="durandal-binding-instruction",o="__ko_bindingContext__";return n={binding:e.noop,bindingComplete:e.noop,throwOnErrors:!1,getBindingInstruction:function(e){return t.utils.
domData.get(e,s)},bindContext:function(e,t,n){return n&&e&&(e=e.createChildContext(n)),a(n,t,e,n||(e?e.$data:null))},bind:function(e,t){return a(e,t,e,e)}}});