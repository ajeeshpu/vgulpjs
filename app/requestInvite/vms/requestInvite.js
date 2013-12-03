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

/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#typeahead
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function(e){var t={prefilled:null,CapitalizeFirstLetter:!1,preventSubmitOnEnter:!0,isClearInputOnEsc:!0,AjaxPush:null,AjaxPushAllTags:null,AjaxPushParameters:null,delimiters:[9,13,44],backspace:[8],maxTags:0,hiddenTagListName:null,hiddenTagListId:null,replace:!0,output:null,deleteTagsOnBackspace:!0,tagsContainer:null,tagCloseIcon:"x",tagClass:"",validator:null,onlyTagList:!1},n={pushTag:function(t,n){var i=e(this),s=i.data("opts"),o,u,a,f,l=i.data("tlis"),c=i.data("tlid"),h,p,d,v,m,g,y,b;t=r.trimTag(t,s.delimiterChars);if(!t||t.length<=0)return;s.CapitalizeFirstLetter&&t.length>1&&(t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase());if(s.validator&&!s.validator(t))return;if(s.maxTags>0&&l.length>=s.maxTags)return;o=!1,u=jQuery.map(l,function(e){return e.toLowerCase()}),h=e.inArray(t.toLowerCase(),u),-1!==h&&(o=!0),o?e("#"+i.data("tm_rndid")+"_"+c[h]).stop().animate({backgroundColor:s.blinkBGColor_1},100).animate({backgroundColor:s.blinkBGColor_2},100).animate({backgroundColor:s.blinkBGColor_1
},100).animate({backgroundColor:s.blinkBGColor_2},100).animate({backgroundColor:s.blinkBGColor_1},100).animate({backgroundColor:s.blinkBGColor_2},100):(n||i.trigger("tm:pushing",t),a=Math.max.apply(null,c),a=a===-Infinity?0:a,f=++a,l.push(t),c.push(f),n||s.AjaxPush!==null&&e.inArray(t,s.prefilled)===-1&&e.post(s.AjaxPush,e.extend({tag:t},s.AjaxPushParameters)),p=i.data("tm_rndid")+"_"+f,d=i.data("tm_rndid")+"_Remover_"+f,v=e("<span/>").text(t).html(),m='<span class="'+r.tagClasses.call(i)+'" id="'+p+'">',m+="<span>"+v+"</span>",m+='<a href="#" class="tm-tag-remove" id="'+d+'" TagIdToRemove="'+f+'">',m+=s.tagCloseIcon+"</a></span> ",g=e(m),s.tagsContainer!==null?e(s.tagsContainer).append(g):f>1?(y=f-1,b=e("#"+i.data("tm_rndid")+"_"+y),b.after(g)):i.before(g),g.find("#"+d).on("click",i,function(t){t.preventDefault();var n=parseInt(e(this).attr("TagIdToRemove"));r.spliceTag.call(i,n,t.data)}),r.refreshHiddenTagList.call(i),n||i.trigger("tm:pushed",t),r.showOrHide.call(i)),i.val("")},popTag
:function(){var t=e(this),n,i,s=t.data("tlis"),o=t.data("tlid");o.length>0&&(n=o.pop(),i=s[s.length-1],t.trigger("tm:popping",i),s.pop(),e("#"+t.data("tm_rndid")+"_"+n).remove(),r.refreshHiddenTagList.call(t),t.trigger("tm:popped",i))},empty:function(){var t=e(this),n=t.data("tlis"),i=t.data("tlid"),s;while(i.length>0)s=i.pop(),n.pop(),e("#"+t.data("tm_rndid")+"_"+s).remove(),r.refreshHiddenTagList.call(t);t.trigger("tm:emptied",null),r.showOrHide.call(t)}},r={showOrHide:function(){var e=this,t=e.data("opts"),n=e.data("tlis");t.maxTags>0&&n.length<t.maxTags&&(e.show(),e.trigger("tm:show")),t.maxTags>0&&n.length>=t.maxTags&&(e.hide(),e.trigger("tm:hide"))},tagClasses:function(){var t=e(this),n=t.data("opts"),r=n.tagBaseClass,i=n.inputBaseClass,s;return s=r,t.attr("class")&&e.each(t.attr("class").split(" "),function(e,t){t.indexOf(i+"-")!==-1&&(s+=" "+r+t.substring(i.length))}),s+=n.tagClass?" "+n.tagClass:"",s},trimTag:function(t,n){var r;t=e.trim(t),r=0;for(r;r<t.length;r++)if(e.inArray
(t.charCodeAt(r),n)!==-1)break;return t.substring(0,r)},refreshHiddenTagList:function(){var t=e(this),n=t.data("tlis"),r=t.data("lhiddenTagList");r&&e(r).val(n.join(t.data("opts").baseDelimiter)).change(),t.trigger("tm:refresh",n.join(t.data("opts").baseDelimiter))},killEvent:function(e){e.cancelBubble=!0,e.returnValue=!1,e.stopPropagation(),e.preventDefault()},keyInArray:function(t,n){return e.inArray(t.which,n)!==-1},applyDelimiter:function(t){var r=e(this);n.pushTag.call(r,e(this).val()),t.preventDefault()},prefill:function(t){var r=e(this);e.each(t,function(e,t){n.pushTag.call(r,t,!0)})},pushAllTags:function(t,n){var r=this,i=r.data("opts"),s=r.data("tlis");i.AjaxPushAllTags&&(t.type!=="tm:pushed"||e.inArray(n,i.prefilled)===-1)&&e.post(i.AjaxPush,{tags:s.join(i.baseDelimiter)})},spliceTag:function(t){var n=this,i=n.data("tlis"),s=n.data("tlid"),o=e.inArray(t,s),u;-1!==o&&(u=i[o],n.trigger("tm:splicing",u),e("#"+n.data("tm_rndid")+"_"+t).remove(),i.splice(o,1),s.splice(o,1),r.refreshHiddenTagList
.call(n),n.trigger("tm:spliced",u)),r.showOrHide.call(n)},init:function(i){var s=e.extend({},t,i),o,u;s.hiddenTagListName=s.hiddenTagListName===null?"hidden-"+this.attr("name"):s.hiddenTagListName,o=s.delimeters||s.delimiters,u=[9,13,17,18,19,37,38,39,40],s.delimiterChars=[],s.delimiterKeys=[],e.each(o,function(t,n){e.inArray(n,u)!==-1?s.delimiterKeys.push(n):s.delimiterChars.push(n)}),s.baseDelimiter=String.fromCharCode(s.delimiterChars[0]||44),s.tagBaseClass="tm-tag",s.inputBaseClass="tm-input",e.isFunction(s.validator)||(s.validator=null),this.each(function(){var t=e(this),i="",o="",u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";if(t.data("tagManager"))return!1;t.data("tagManager",!0);for(var a=0;a<5;a++)o+=u.charAt(Math.floor(Math.random()*u.length));t.data("tm_rndid",o),t.data("opts",s).data("tlis",[]).data("tlid",[]),s.output===null?(i=e("<input/>",{type:"hidden",name:s.hiddenTagListName}),t.after(i),t.data("lhiddenTagList",i)):t.data("lhiddenTagList",e(s.output)),s.AjaxPushAllTags&&
(t.on("tm:spliced",r.pushAllTags),t.on("tm:popped",r.pushAllTags),t.on("tm:pushed",r.pushAllTags)),t.on("focus keypress",function(t){e(this).popover&&e(this).popover("hide")}),s.isClearInputOnEsc&&t.on("keyup",function(t){t.which===27&&(e(this).val(""),r.killEvent(t))}),t.on("keypress",function(e){r.keyInArray(e,s.delimiterChars)&&r.applyDelimiter.call(t,e)}),t.on("keydown",function(e){e.which===13&&s.preventSubmitOnEnter&&r.killEvent(e),r.keyInArray(e,s.delimiterKeys)&&r.applyDelimiter.call(t,e)}),s.deleteTagsOnBackspace&&t.on("keydown",function(i){r.keyInArray(i,s.backspace)&&e(this).val().length<=0&&(n.popTag.call(t),r.killEvent(i))}),t.change(function(e){/webkit/.test(navigator.userAgent.toLowerCase())||t.focus(),r.killEvent(e)});if(s.prefilled!==null)typeof s.prefilled=="object"?r.prefill.call(t,s.prefilled):typeof s.prefilled=="string"?r.prefill.call(t,s.prefilled.split(s.baseDelimiter)):typeof s.prefilled=="function"&&r.prefill.call(t,s.prefilled());else if(s.output!==null){if(e(
s.output)&&e(s.output).val())var f=e(s.output);r.prefill.call(t,e(s.output).val().split(s.baseDelimiter))}})}};e.fn.tagsManager=function(t){var i=e(this);return 0 in this?n[t]?n[t].apply(i,Array.prototype.slice.call(arguments,1)):typeof t=="object"||!t?r.init.apply(this,arguments):(e.error("Method "+t+" does not exist."),!1):this}})(jQuery),define("requestInvite/lib/tagmanager",function(){}),!function(e){var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,n),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=e(this.options.menu),this.shown=!1,this.listen()};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},show:function(){var t=
e.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var n;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(n=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source,n?this.process(n):this)},process:function(t){var n=this;return t=e.grep(t,function(e){return n.matcher(e)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var t=[],n=[],r=[],i;while(i=e.shift())i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query)?n.push(i):r.push(i):t.push(i);return t.concat(n,r)},highlighter:function(e){var t=this.query.replace
(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),function(e,t){return"<strong>"+t+"</strong>"})},render:function(t){var n=this;return t=e(t).map(function(t,r){return t=e(n.options.item).attr("data-value",r),t.find("a").html(n.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(t){var n=this.$menu.find(".active").removeClass("active"),r=n.next();r.length||(r=e(this.$menu.find("li")[0])),r.addClass("active")},prev:function(e){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last()),n.addClass("active")},listen:function(){this.$element.on("focus",e.proxy(this.focus,this)).on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this)
).on("mouseleave","li",e.proxy(this.mouseleave,this))},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t=typeof this.$element[e]=="function"),t},move:function(e){if(!this.shown)return;switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()},keydown:function(t){this.suppressKeyPressRepeat=~e.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(e){if(this.suppressKeyPressRepeat)return;this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},focus:function(e){this.focused=!0},blur:function(e){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(e){e.stopPropagation(),e.preventDefault(),this
.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")},mouseleave:function(e){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var n=e.fn.typeahead;e.fn.typeahead=function(n){return this.each(function(){var r=e(this),i=r.data("typeahead"),s=typeof n=="object"&&n;i||r.data("typeahead",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},e.fn.typeahead.Constructor=t,e.fn.typeahead.noConflict=function(){return e.fn.typeahead=n,this},e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(t){var n=e(this);if(n.data("typeahead"))return;n.typeahead(n.data())})}(window.jQuery),define("bootstrap/bootstrap-typeahead",function(){}),!function(e){var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]'
,"click.dismiss.modal",e.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in").attr("aria-hidden",!1),t.enforceFocus(),n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,this.escape(),e(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden"
,!0),e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),t.hideModal()})},hideModal:function(){var e=this;this.$element.hide(),this.backdrop(function(){e.removeBackdrop(),e.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},backdrop:function(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop)
{var i=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!t)return;i?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t):t()):t&&t()}};var n=e.fn.modal;e.fn.modal=function(n){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("modal",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=t,e.fn.modal.noConflict=function(){return e.fn.modal=n,this},e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(
t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault(),i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery),define("bootstrap/bootstrap-modal",function(){}),define("requestInvite/lib/requestInvite.ko.bindings",["knockout","requestInvite/lib/tagmanager","bootstrap/bootstrap-typeahead","bootstrap/bootstrap-modal"],function(e){var t=["HSR Layout","Bellandur","Sarjapur Road","Koramangala","Domlur","Old Airport Road","Marathahalli","Brookefields","Whitefield","Old Madras Road","Rammurthy Nagar","Jeevan Bhima Nagar","Indiranagar","BTM","MG Road","Brigade Road","Residency Road","Richmond Road","Richmond Town","Infantry Road","Cunningham Road","Lavelle Road","JP Nagar","Jayanagar","Bannerghatta","Electronic City","KR Puram","Banashankari","Banaswadi","BasavanagudiBasaveshwara NagarFrazer Town","HBR Layout","Hebbal","International AirportJakkur","Kalyan Nagar"
,"KammanahalliKumaraswamy Layout","Magadi Road","MajesticMalleshwaram","Mysore Road","Nagawara","New BEL Road","Peenya","RT Nagar","Race Course Road","Rajajinagar","Rajarajeshwari Nagar","Sadashiv Nagar","Sahakara Nagar","Sanjay Nagar","Sankey Road","Seshadripuram","Shanti Nagar","Shivajinagar","Ulsoor","Vijay Nagar","Yelahanka","Yeshwantpur"];e.bindingHandlers.tagsInput={init:function(e,n){$(e).tagsManager({}),$(e).typeahead({source:t})},update:function(e,t){t()('input[name="hidden-'+$(e).attr("name")+'"]')}},e.bindingHandlers.showModal={init:function(t,n){var r=n(),i=e.utils.unwrapObservable(r);$(t).modal({backdrop:"static",keyboard:!0,show:i})},update:function(t,n){var r=n();e.utils.unwrapObservable(r)?($(t).modal("show"),$("input",t).focus()):$(t).modal("hide")}}}),define("requestInvite/vms/requestInvite",["jquery","knockout","common/lib/env","requestInvite/lib/requestInvite.ko.bindings"],function(e,t,n){var r=function(r){var i=this;i.baseUrl=n.baseUrl,i.id=t.observable(""),i.show=t
.observable(!1),i.email=t.observable(""),i.preferredLocationsQuery=t.observable(""),i.success=t.observable(!1),i.failure=t.observable(!1),i.showNext=t.observable(!1),i.showShareThis=t.observable(!1),i.showTopBar=t.observable(!0),i.close=function(){i.showRequestInvite(!1)},i.hideTopBar=function(){i.showTopBar(!1)},i.reset=function(){i.success(!1),i.failure(!1),i.show(!1),i.showShareThis(!1)},i.ask=function(){i.reset();if(!i.email())return;var t=e.ajax({url:i.baseUrl.concat("/userRegistration/requestInvite"),type:"POST",data:{email:i.email()},dataType:"json"});t.fail(function(e,t){i.failure(!0),i.success(!1),i.show(!1)}),t.done(function(e,t){console.log("preferred data",e),i.id(e.id),i.failure(!1),i.success(!0),i.show(!0)}),t.always(function(e,t){console.log(t==="error"),t==="error"&&(i.success(!1),i.failure(!0))})},i.updateInvite=function(t){console.log(i.preferredLocationsQuery()),console.log("Preferred Locations:",e(t).find(i.preferredLocationsQuery()).val());var n=e.ajax({url:i.baseUrl
.concat("/requestInvite/update/")+i.id(),type:"POST",data:"&preferredLocations="+e(t).find(i.preferredLocationsQuery()).val(),dataType:"json"});n.fail(function(e,t){i.failure(!0),i.success(!1)}),n.done(function(e,t){i.failure(!1),i.success(!0),i.show(!1),i.showShareThis(!0)}),n.always(function(e,t){console.log(t==="error"),t==="error"&&(i.success(!1),i.failure(!0),i.showShareThis(!1))})},i.openShareThis=function(){i.show(!1),i.showShareThis(!0)}};return r});