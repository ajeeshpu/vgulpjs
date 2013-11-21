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

(function($) {
    var defaults = {
        prefilled: null,
        CapitalizeFirstLetter: !1,
        preventSubmitOnEnter: !0,
        isClearInputOnEsc: !0,
        AjaxPush: null,
        AjaxPushAllTags: null,
        AjaxPushParameters: null,
        delimiters: [ 9, 13, 44 ],
        backspace: [ 8 ],
        maxTags: 0,
        hiddenTagListName: null,
        hiddenTagListId: null,
        replace: !0,
        output: null,
        deleteTagsOnBackspace: !0,
        tagsContainer: null,
        tagCloseIcon: "x",
        tagClass: "",
        validator: null,
        onlyTagList: !1
    }, publicMethods = {
        pushTag: function(tag, ignoreEvents) {
            var $self = $(this), opts = $self.data("opts"), alreadyInList, tlisLowerCase, max, tagId, tlis = $self.data("tlis"), tlid = $self.data("tlid"), idx, newTagId, newTagRemoveId, escaped, html, $el, lastTagId, lastTagObj;
            tag = privateMethods.trimTag(tag, opts.delimiterChars);
            if (!tag || tag.length <= 0
) return;
            opts.CapitalizeFirstLetter && tag.length > 1 && (tag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());
            if (opts.validator && !opts.validator(tag)) return;
            if (opts.maxTags > 0 && tlis.length >= opts.maxTags) return;
            alreadyInList = !1, tlisLowerCase = jQuery.map(tlis, function(elem) {
                return elem.toLowerCase();
            }), idx = $.inArray(tag.toLowerCase(), tlisLowerCase), -1 !== idx && (alreadyInList = !0), alreadyInList ? $("#" + $self.data("tm_rndid") + "_" + tlid[idx]).stop().animate({
                backgroundColor: opts.blinkBGColor_1
            }, 100).animate({
                backgroundColor: opts.blinkBGColor_2
            }, 100).animate({
                backgroundColor: opts.blinkBGColor_1
            }, 100).animate({
                backgroundColor: opts.blinkBGColor_2
            }, 100).animate({
                backgroundColor: opts.blinkBGColor_1
            }, 100).animate({
                
backgroundColor: opts.blinkBGColor_2
            }, 100) : (ignoreEvents || $self.trigger("tm:pushing", tag), max = Math.max.apply(null, tlid), max = max === -Infinity ? 0 : max, tagId = ++max, tlis.push(tag), tlid.push(tagId), ignoreEvents || opts.AjaxPush !== null && $.inArray(tag, opts.prefilled) === -1 && $.post(opts.AjaxPush, $.extend({
                tag: tag
            }, opts.AjaxPushParameters)), newTagId = $self.data("tm_rndid") + "_" + tagId, newTagRemoveId = $self.data("tm_rndid") + "_Remover_" + tagId, escaped = $("<span/>").text(tag).html(), html = '<span class="' + privateMethods.tagClasses.call($self) + '" id="' + newTagId + '">', html += "<span>" + escaped + "</span>", html += '<a href="#" class="tm-tag-remove" id="' + newTagRemoveId + '" TagIdToRemove="' + tagId + '">', html += opts.tagCloseIcon + "</a></span> ", $el = $(html), opts.tagsContainer !== null ? $(opts.tagsContainer).append($el) : tagId > 1 ? (lastTagId = tagId - 1, lastTagObj = $("#" + $self.data("tm_rndid"
) + "_" + lastTagId), lastTagObj.after($el)) : $self.before($el), $el.find("#" + newTagRemoveId).on("click", $self, function(e) {
                e.preventDefault();
                var TagIdToRemove = parseInt($(this).attr("TagIdToRemove"));
                privateMethods.spliceTag.call($self, TagIdToRemove, e.data);
            }), privateMethods.refreshHiddenTagList.call($self), ignoreEvents || $self.trigger("tm:pushed", tag), privateMethods.showOrHide.call($self)), $self.val("");
        },
        popTag: function() {
            var $self = $(this), tagId, tagBeingRemoved, tlis = $self.data("tlis"), tlid = $self.data("tlid");
            tlid.length > 0 && (tagId = tlid.pop(), tagBeingRemoved = tlis[tlis.length - 1], $self.trigger("tm:popping", tagBeingRemoved), tlis.pop(), $("#" + $self.data("tm_rndid") + "_" + tagId).remove(), privateMethods.refreshHiddenTagList.call($self), $self.trigger("tm:popped", tagBeingRemoved));
        },
        empty: function() {
            var $self = 
$(this), tlis = $self.data("tlis"), tlid = $self.data("tlid"), tagId;
            while (tlid.length > 0) tagId = tlid.pop(), tlis.pop(), $("#" + $self.data("tm_rndid") + "_" + tagId).remove(), privateMethods.refreshHiddenTagList.call($self);
            $self.trigger("tm:emptied", null), privateMethods.showOrHide.call($self);
        }
    }, privateMethods = {
        showOrHide: function() {
            var $self = this, opts = $self.data("opts"), tlis = $self.data("tlis");
            opts.maxTags > 0 && tlis.length < opts.maxTags && ($self.show(), $self.trigger("tm:show")), opts.maxTags > 0 && tlis.length >= opts.maxTags && ($self.hide(), $self.trigger("tm:hide"));
        },
        tagClasses: function() {
            var $self = $(this), opts = $self.data("opts"), tagBaseClass = opts.tagBaseClass, inputBaseClass = opts.inputBaseClass, cl;
            return cl = tagBaseClass, $self.attr("class") && $.each($self.attr("class").split(" "), function(index, value) {
                value
.indexOf(inputBaseClass + "-") !== -1 && (cl += " " + tagBaseClass + value.substring(inputBaseClass.length));
            }), cl += opts.tagClass ? " " + opts.tagClass : "", cl;
        },
        trimTag: function(tag, delimiterChars) {
            var i;
            tag = $.trim(tag), i = 0;
            for (i; i < tag.length; i++) if ($.inArray(tag.charCodeAt(i), delimiterChars) !== -1) break;
            return tag.substring(0, i);
        },
        refreshHiddenTagList: function() {
            var $self = $(this), tlis = $self.data("tlis"), lhiddenTagList = $self.data("lhiddenTagList");
            lhiddenTagList && $(lhiddenTagList).val(tlis.join($self.data("opts").baseDelimiter)).change(), $self.trigger("tm:refresh", tlis.join($self.data("opts").baseDelimiter));
        },
        killEvent: function(e) {
            e.cancelBubble = !0, e.returnValue = !1, e.stopPropagation(), e.preventDefault();
        },
        keyInArray: function(e, ary) {
            return $.inArray(e.
which, ary) !== -1;
        },
        applyDelimiter: function(e) {
            var $self = $(this);
            publicMethods.pushTag.call($self, $(this).val()), e.preventDefault();
        },
        prefill: function(pta) {
            var $self = $(this);
            $.each(pta, function(key, val) {
                publicMethods.pushTag.call($self, val, !0);
            });
        },
        pushAllTags: function(e, tag) {
            var $self = this, opts = $self.data("opts"), tlis = $self.data("tlis");
            opts.AjaxPushAllTags && (e.type !== "tm:pushed" || $.inArray(tag, opts.prefilled) === -1) && $.post(opts.AjaxPush, {
                tags: tlis.join(opts.baseDelimiter)
            });
        },
        spliceTag: function(tagId) {
            var $self = this, tlis = $self.data("tlis"), tlid = $self.data("tlid"), idx = $.inArray(tagId, tlid), tagBeingRemoved;
            -1 !== idx && (tagBeingRemoved = tlis[idx], $self.trigger("tm:splicing", tagBeingRemoved), $("#" + 
$self.data("tm_rndid") + "_" + tagId).remove(), tlis.splice(idx, 1), tlid.splice(idx, 1), privateMethods.refreshHiddenTagList.call($self), $self.trigger("tm:spliced", tagBeingRemoved)), privateMethods.showOrHide.call($self);
        },
        init: function(options) {
            var opts = $.extend({}, defaults, options), delimiters, keyNums;
            opts.hiddenTagListName = opts.hiddenTagListName === null ? "hidden-" + this.attr("name") : opts.hiddenTagListName, delimiters = opts.delimeters || opts.delimiters, keyNums = [ 9, 13, 17, 18, 19, 37, 38, 39, 40 ], opts.delimiterChars = [], opts.delimiterKeys = [], $.each(delimiters, function(i, v) {
                $.inArray(v, keyNums) !== -1 ? opts.delimiterKeys.push(v) : opts.delimiterChars.push(v);
            }), opts.baseDelimiter = String.fromCharCode(opts.delimiterChars[0] || 44), opts.tagBaseClass = "tm-tag", opts.inputBaseClass = "tm-input", $.isFunction(opts.validator) || (opts.validator = null), this.each(function() {
                
var $self = $(this), hiddenObj = "", rndid = "", albet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                if ($self.data("tagManager")) return !1;
                $self.data("tagManager", !0);
                for (var i = 0; i < 5; i++) rndid += albet.charAt(Math.floor(Math.random() * albet.length));
                $self.data("tm_rndid", rndid), $self.data("opts", opts).data("tlis", []).data("tlid", []), opts.output === null ? (hiddenObj = $("<input/>", {
                    type: "hidden",
                    name: opts.hiddenTagListName
                }), $self.after(hiddenObj), $self.data("lhiddenTagList", hiddenObj)) : $self.data("lhiddenTagList", $(opts.output)), opts.AjaxPushAllTags && ($self.on("tm:spliced", privateMethods.pushAllTags), $self.on("tm:popped", privateMethods.pushAllTags), $self.on("tm:pushed", privateMethods.pushAllTags)), $self.on("focus keypress", function(e) {
                    $(this).popover && $(this).popover("hide");
                
}), opts.isClearInputOnEsc && $self.on("keyup", function(e) {
                    e.which === 27 && ($(this).val(""), privateMethods.killEvent(e));
                }), $self.on("keypress", function(e) {
                    privateMethods.keyInArray(e, opts.delimiterChars) && privateMethods.applyDelimiter.call($self, e);
                }), $self.on("keydown", function(e) {
                    e.which === 13 && opts.preventSubmitOnEnter && privateMethods.killEvent(e), privateMethods.keyInArray(e, opts.delimiterKeys) && privateMethods.applyDelimiter.call($self, e);
                }), opts.deleteTagsOnBackspace && $self.on("keydown", function(e) {
                    privateMethods.keyInArray(e, opts.backspace) && $(this).val().length <= 0 && (publicMethods.popTag.call($self), privateMethods.killEvent(e));
                }), $self.change(function(e) {
                    /webkit/.test(navigator.userAgent.toLowerCase()) || $self.focus(), privateMethods.killEvent(e);
                });
                
if (opts.prefilled !== null) typeof opts.prefilled == "object" ? privateMethods.prefill.call($self, opts.prefilled) : typeof opts.prefilled == "string" ? privateMethods.prefill.call($self, opts.prefilled.split(opts.baseDelimiter)) : typeof opts.prefilled == "function" && privateMethods.prefill.call($self, opts.prefilled()); else if (opts.output !== null) {
                    if ($(opts.output) && $(opts.output).val()) var existing_tags = $(opts.output);
                    privateMethods.prefill.call($self, $(opts.output).val().split(opts.baseDelimiter));
                }
            });
        }
    };
    $.fn.tagsManager = function(method) {
        var $self = $(this);
        return 0 in this ? publicMethods[method] ? publicMethods[method].apply($self, Array.prototype.slice.call(arguments, 1)) : typeof method == "object" || !method ? privateMethods.init.apply(this, arguments) : ($.error("Method " + method + " does not exist."), !1) : this;
    };
})(jQuery);;