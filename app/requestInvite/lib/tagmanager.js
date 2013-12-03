/* ===================================================
 * tagmanager.js v3.0.0
 * http://welldonethings.com/tags/manager
 * ===================================================
 * Copyright 2012 Max Favilli
 *
 * Licensed under the Mozilla Public License, Version 2.0 You may not use this work except in compliance with the License.
 *
 * http://www.mozilla.org/MPL/2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function(e){var t={prefilled:null,CapitalizeFirstLetter:!1,preventSubmitOnEnter:!0,isClearInputOnEsc:!0,AjaxPush:null,AjaxPushAllTags:null,AjaxPushParameters:null,delimiters:[9,13,44],backspace:[8],maxTags:0,hiddenTagListName:null,hiddenTagListId:null,replace:!0,output:null,deleteTagsOnBackspace:!0,tagsContainer:null,tagCloseIcon:"x",tagClass:"",validator:null,onlyTagList:!1},n={pushTag:function(t,n){var i=e(this),s=i.data("opts"),o,u,a,f,l=i.data("tlis"),c=i.data("tlid"),h,p,d,v,m,g,y,b;t=r.trimTag(t,s.delimiterChars);if(!t||t.length<=0)return;s.CapitalizeFirstLetter&&t.length>1&&(t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase());if(s.validator&&!s.validator(t))return;if(s.maxTags>0&&l.length>=s.maxTags)return;o=!1,u=jQuery.map(l,function(e){return e.toLowerCase()}),h=e.inArray(t.toLowerCase(),u),-1!==h&&(o=!0),o?e("#"+i.data("tm_rndid")+"_"+c[h]).stop().animate({backgroundColor:s.blinkBGColor_1},100).animate({backgroundColor:s.blinkBGColor_2},100).animate({backgroundColor:s.blinkBGColor_1
},100).animate({backgroundColor:s.blinkBGColor_2},100).animate({backgroundColor:s.blinkBGColor_1},100).animate({backgroundColor:s.blinkBGColor_2},100):(n||i.trigger("tm:pushing",t),a=Math.max.apply(null,c),a=a===-Infinity?0:a,f=++a,l.push(t),c.push(f),n||s.AjaxPush!==null&&e.inArray(t,s.prefilled)===-1&&e.post(s.AjaxPush,e.extend({tag:t},s.AjaxPushParameters)),p=i.data("tm_rndid")+"_"+f,d=i.data("tm_rndid")+"_Remover_"+f,v=e("<span/>").text(t).html(),m='<span class="'+r.tagClasses.call(i)+'" id="'+p+'">',m+="<span>"+v+"</span>",m+='<a href="#" class="tm-tag-remove" id="'+d+'" TagIdToRemove="'+f+'">',m+=s.tagCloseIcon+"</a></span> ",g=e(m),s.tagsContainer!==null?e(s.tagsContainer).append(g):f>1?(y=f-1,b=e("#"+i.data("tm_rndid")+"_"+y),b.after(g)):i.before(g),g.find("#"+d).on("click",i,function(t){t.preventDefault();var n=parseInt(e(this).attr("TagIdToRemove"));r.spliceTag.call(i,n,t.data)}),r.refreshHiddenTagList.call(i),n||i.trigger("tm:pushed",t),r.showOrHide.call(i)),i.val("")},popTag
:function(){var t=e(this),n,i,s=t.data("tlis"),o=t.data("tlid");o.length>0&&(n=o.pop(),i=s[s.length-1],t.trigger("tm:popping",i),s.pop(),e("#"+t.data("tm_rndid")+"_"+n).remove(),r.refreshHiddenTagList.call(t),t.trigger("tm:popped",i))},empty:function(){var t=e(this),n=t.data("tlis"),i=t.data("tlid"),s;while(i.length>0)s=i.pop(),n.pop(),e("#"+t.data("tm_rndid")+"_"+s).remove(),r.refreshHiddenTagList.call(t);t.trigger("tm:emptied",null),r.showOrHide.call(t)}},r={showOrHide:function(){var e=this,t=e.data("opts"),n=e.data("tlis");t.maxTags>0&&n.length<t.maxTags&&(e.show(),e.trigger("tm:show")),t.maxTags>0&&n.length>=t.maxTags&&(e.hide(),e.trigger("tm:hide"))},tagClasses:function(){var t=e(this),n=t.data("opts"),r=n.tagBaseClass,i=n.inputBaseClass,s;return s=r,t.attr("class")&&e.each(t.attr("class").split(" "),function(e,t){t.indexOf(i+"-")!==-1&&(s+=" "+r+t.substring(i.length))}),s+=n.tagClass?" "+n.tagClass:"",s},trimTag:function(t,n){var r;t=e.trim(t),r=0;for(r;r<t.length;r++)if(e.inArray
(t.charCodeAt(r),n)!==-1)break;return t.substring(0,r)},refreshHiddenTagList:function(){var t=e(this),n=t.data("tlis"),r=t.data("lhiddenTagList");r&&e(r).val(n.join(t.data("opts").baseDelimiter)).change(),t.trigger("tm:refresh",n.join(t.data("opts").baseDelimiter))},killEvent:function(e){e.cancelBubble=!0,e.returnValue=!1,e.stopPropagation(),e.preventDefault()},keyInArray:function(t,n){return e.inArray(t.which,n)!==-1},applyDelimiter:function(t){var r=e(this);n.pushTag.call(r,e(this).val()),t.preventDefault()},prefill:function(t){var r=e(this);e.each(t,function(e,t){n.pushTag.call(r,t,!0)})},pushAllTags:function(t,n){var r=this,i=r.data("opts"),s=r.data("tlis");i.AjaxPushAllTags&&(t.type!=="tm:pushed"||e.inArray(n,i.prefilled)===-1)&&e.post(i.AjaxPush,{tags:s.join(i.baseDelimiter)})},spliceTag:function(t){var n=this,i=n.data("tlis"),s=n.data("tlid"),o=e.inArray(t,s),u;-1!==o&&(u=i[o],n.trigger("tm:splicing",u),e("#"+n.data("tm_rndid")+"_"+t).remove(),i.splice(o,1),s.splice(o,1),r.refreshHiddenTagList
.call(n),n.trigger("tm:spliced",u)),r.showOrHide.call(n)},init:function(i){var s=e.extend({},t,i),o,u;s.hiddenTagListName=s.hiddenTagListName===null?"hidden-"+this.attr("name"):s.hiddenTagListName,o=s.delimeters||s.delimiters,u=[9,13,17,18,19,37,38,39,40],s.delimiterChars=[],s.delimiterKeys=[],e.each(o,function(t,n){e.inArray(n,u)!==-1?s.delimiterKeys.push(n):s.delimiterChars.push(n)}),s.baseDelimiter=String.fromCharCode(s.delimiterChars[0]||44),s.tagBaseClass="tm-tag",s.inputBaseClass="tm-input",e.isFunction(s.validator)||(s.validator=null),this.each(function(){var t=e(this),i="",o="",u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";if(t.data("tagManager"))return!1;t.data("tagManager",!0);for(var a=0;a<5;a++)o+=u.charAt(Math.floor(Math.random()*u.length));t.data("tm_rndid",o),t.data("opts",s).data("tlis",[]).data("tlid",[]),s.output===null?(i=e("<input/>",{type:"hidden",name:s.hiddenTagListName}),t.after(i),t.data("lhiddenTagList",i)):t.data("lhiddenTagList",e(s.output)),s.AjaxPushAllTags&&
(t.on("tm:spliced",r.pushAllTags),t.on("tm:popped",r.pushAllTags),t.on("tm:pushed",r.pushAllTags)),t.on("focus keypress",function(t){e(this).popover&&e(this).popover("hide")}),s.isClearInputOnEsc&&t.on("keyup",function(t){t.which===27&&(e(this).val(""),r.killEvent(t))}),t.on("keypress",function(e){r.keyInArray(e,s.delimiterChars)&&r.applyDelimiter.call(t,e)}),t.on("keydown",function(e){e.which===13&&s.preventSubmitOnEnter&&r.killEvent(e),r.keyInArray(e,s.delimiterKeys)&&r.applyDelimiter.call(t,e)}),s.deleteTagsOnBackspace&&t.on("keydown",function(i){r.keyInArray(i,s.backspace)&&e(this).val().length<=0&&(n.popTag.call(t),r.killEvent(i))}),t.change(function(e){/webkit/.test(navigator.userAgent.toLowerCase())||t.focus(),r.killEvent(e)});if(s.prefilled!==null)typeof s.prefilled=="object"?r.prefill.call(t,s.prefilled):typeof s.prefilled=="string"?r.prefill.call(t,s.prefilled.split(s.baseDelimiter)):typeof s.prefilled=="function"&&r.prefill.call(t,s.prefilled());else if(s.output!==null){if(e(
s.output)&&e(s.output).val())var f=e(s.output);r.prefill.call(t,e(s.output).val().split(s.baseDelimiter))}})}};e.fn.tagsManager=function(t){var i=e(this);return 0 in this?n[t]?n[t].apply(i,Array.prototype.slice.call(arguments,1)):typeof t=="object"||!t?r.init.apply(this,arguments):(e.error("Method "+t+" does not exist."),!1):this}})(jQuery);