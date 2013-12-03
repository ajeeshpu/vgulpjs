/**
 * Durandal 2.0.1 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */

define(["durandal/system","durandal/composition","jquery"],function(e,t,n){var r=100,i={marginRight:0,marginLeft:0,opacity:1},s={marginLeft:"",marginRight:"",opacity:"",display:""},o=function(t){return e.defer(function(e){function o(){e.resolve()}function u(){t.keepScrollPosition||n(document).scrollTop(0)}if(!t.child)n(t.activeView).fadeOut(r,o);else{var a=t.duration||500,f=!!t.fadeOnly;function l(){u(),t.triggerAttach();var e={marginLeft:f?"0":"20px",marginRight:f?"0":"-20px",opacity:0,display:"block"},r=n(t.child);r.css(e),r.animate(i,{duration:a,easing:"swing",always:function(){r.css(s),o()}})}t.activeView?n(t.activeView).fadeOut({duration:r,always:l}):l()}}).promise()};return o});