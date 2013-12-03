/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function n(e){return i.raw?e:decodeURIComponent(e.replace(t," "))}function r(e){e.indexOf('"')===0&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),e=n(e);try{return i.json?JSON.parse(e):e}catch(t){}}var t=/\+/g,i=e.cookie=function(t,s,o){if(s!==undefined){o=e.extend({},i.defaults,o);if(typeof o.expires=="number"){var u=o.expires,a=o.expires=new Date;a.setDate(a.getDate()+u)}s=i.json?JSON.stringify(s):String(s);var f=document.cookie=[i.raw?t:encodeURIComponent(t),"=",i.raw?s:encodeURIComponent(s),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("");return console.log("something"+f),f}var l=document.cookie.split("; ");console.log("cookies"+l);var c=t?undefined:{};for(var h=0,p=l.length;h<p;h++){var d=l[h].split("="),v=n(d.shift()),m=d.join("=");if(t&&t===v){c=r(m);break}t||(c[v]=r(m))}return c
};i.defaults={},e.removeCookie=function(t,n){return e.cookie(t)!==undefined?(e.cookie(t,"",e.extend({},n,{expires:-1})),!0):!1}});