/**
 * Durandal 2.0.1 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */

define(["durandal/system"],function(e){return{typeAttribute:"type",space:undefined,replacer:function(e,t){if(e){var n=e[0];if(n==="_"||n==="$")return undefined}return t},serialize:function(t,n){n=n===undefined?{}:n;if(e.isString(n)||e.isNumber(n))n={space:n};return JSON.stringify(t,n.replacer||this.replacer,n.space||this.space)},getTypeId:function(e){return e?e[this.typeAttribute]:undefined},typeMap:{},registerType:function(){var t=arguments[0];if(arguments.length==1){var n=t[this.typeAttribute]||e.getModuleId(t);this.typeMap[n]=t}else this.typeMap[t]=arguments[1]},reviver:function(e,t,n,r){var i=n(t);if(i){var s=r(i);if(s)return s.fromJSON?s.fromJSON(t):new s(t)}return t},deserialize:function(e,t){var n=this;t=t||{};var r=t.getTypeId||function(e){return n.getTypeId(e)},i=t.getConstructor||function(e){return n.typeMap[e]},s=t.reviver||function(e,t){return n.reviver(e,t,r,i)};return JSON.parse(e,s)}}});