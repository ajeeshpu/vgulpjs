/*!
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */

(function(jQuery, window, undefined) {
    var warnedAbout = {};
    jQuery.migrateWarnings = [], !jQuery.migrateMute && window.console && window.console.log && window.console.log("JQMIGRATE: Logging is active"), jQuery.migrateTrace === undefined && (jQuery.migrateTrace = !0), jQuery.migrateReset = function() {
        warnedAbout = {}, jQuery.migrateWarnings.length = 0;
    };
    function migrateWarn(msg) {
        var console = window.console;
        warnedAbout[msg] || (warnedAbout[msg] = !0, jQuery.migrateWarnings.push(msg), console && console.warn && !jQuery.migrateMute && (console.warn("JQMIGRATE: " + msg), jQuery.migrateTrace && console.trace && console.trace()));
    }
    function migrateWarnProp(obj, prop, value, msg) {
        if (Object.defineProperty) try {
            Object.defineProperty(obj, prop, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return migrateWarn(msg), value;
                },
                
set: function(newValue) {
                    migrateWarn(msg), value = newValue;
                }
            });
            return;
        } catch (err) {}
        jQuery._definePropertyBroken = !0, obj[prop] = value;
    }
    document.compatMode === "BackCompat" && migrateWarn("jQuery is not compatible with Quirks Mode");
    var attrFn = jQuery("<input/>", {
        size: 1
    }).attr("size") && jQuery.attrFn, oldAttr = jQuery.attr, valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get || function() {
        return null;
    }, valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set || function() {
        return undefined;
    }, rnoType = /^(?:input|button)$/i, rnoAttrNodeType = /^[238]$/, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, ruseDefault = /^(?:checked|selected)$/i;
    migrateWarnProp(jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated"), jQuery
.attr = function(elem, name, value, pass) {
        var lowerName = name.toLowerCase(), nType = elem && elem.nodeType;
        if (pass) {
            oldAttr.length < 4 && migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
            if (elem && !rnoAttrNodeType.test(nType) && (attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name]))) return jQuery(elem)[name](value);
        }
        return name === "type" && value !== undefined && rnoType.test(elem.nodeName) && elem.parentNode && migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8"), !jQuery.attrHooks[lowerName] && rboolean.test(lowerName) && (jQuery.attrHooks[lowerName] = {
            get: function(elem, name) {
                var attrNode, property = jQuery.prop(elem, name);
                return property === !0 || typeof property != "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== !1 ? name.toLowerCase() : undefined;
            },
            set: function(elem, 
value, name) {
                var propName;
                return value === !1 ? jQuery.removeAttr(elem, name) : (propName = jQuery.propFix[name] || name, propName in elem && (elem[propName] = !0), elem.setAttribute(name, name.toLowerCase())), name;
            }
        }, ruseDefault.test(lowerName) && migrateWarn("jQuery.fn.attr('" + lowerName + "') may use property instead of attribute")), oldAttr.call(jQuery, elem, name, value);
    }, jQuery.attrHooks.value = {
        get: function(elem, name) {
            var nodeName = (elem.nodeName || "").toLowerCase();
            return nodeName === "button" ? valueAttrGet.apply(this, arguments) : (nodeName !== "input" && nodeName !== "option" && migrateWarn("jQuery.fn.attr('value') no longer gets properties"), name in elem ? elem.value : null);
        },
        set: function(elem, value) {
            var nodeName = (elem.nodeName || "").toLowerCase();
            if (nodeName === "button") return valueAttrSet.apply(this, arguments);
            
nodeName !== "input" && nodeName !== "option" && migrateWarn("jQuery.fn.attr('value', val) no longer sets properties"), elem.value = value;
        }
    };
    var matched, browser, oldInit = jQuery.fn.init, oldParseJSON = jQuery.parseJSON, rquickExpr = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    jQuery.fn.init = function(selector, context, rootjQuery) {
        var match;
        if (selector && typeof selector == "string" && !jQuery.isPlainObject(context) && (match = rquickExpr.exec(jQuery.trim(selector))) && match[0]) {
            selector.charAt(0) !== "<" && migrateWarn("$(html) HTML strings must start with '<' character"), match[3] && migrateWarn("$(html) HTML text after last tag is ignored"), match[0].charAt(0) === "#" && (migrateWarn("HTML string cannot start with a '#' character"), jQuery.error("JQMIGRATE: Invalid selector string (XSS)")), context && context.context && (context = context.context);
            if (jQuery.parseHTML) return oldInit.call(this, jQuery.parseHTML(match[2], context
, !0), context, rootjQuery);
        }
        return oldInit.apply(this, arguments);
    }, jQuery.fn.init.prototype = jQuery.fn, jQuery.parseJSON = function(json) {
        return !json && json !== null ? (migrateWarn("jQuery.parseJSON requires a valid JSON string"), null) : oldParseJSON.apply(this, arguments);
    }, jQuery.uaMatch = function(ua) {
        ua = ua.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    }, jQuery.browser || (matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, browser.version = matched.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0), jQuery.browser = 
browser), migrateWarnProp(jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated"), jQuery.sub = function() {
        function jQuerySub(selector, context) {
            return new jQuerySub.fn.init(selector, context);
        }
        jQuery.extend(!0, jQuerySub, this), jQuerySub.superclass = this, jQuerySub.fn = jQuerySub.prototype = this(), jQuerySub.fn.constructor = jQuerySub, jQuerySub.sub = this.sub, jQuerySub.fn.init = function init(selector, context) {
            return context && context instanceof jQuery && !(context instanceof jQuerySub) && (context = jQuerySub(context)), jQuery.fn.init.call(this, selector, context, rootjQuerySub);
        }, jQuerySub.fn.init.prototype = jQuerySub.fn;
        var rootjQuerySub = jQuerySub(document);
        return migrateWarn("jQuery.sub() is deprecated"), jQuerySub;
    }, jQuery.ajaxSetup({
        converters: {
            "text json": jQuery.parseJSON
        }
    });
    var oldFnData = jQuery.fn.data;
    jQuery.fn.data = 
function(name) {
        var ret, evt, elem = this[0];
        if (elem && name === "events" && arguments.length === 1) {
            ret = jQuery.data(elem, name), evt = jQuery._data(elem, name);
            if ((ret === undefined || ret === evt) && evt !== undefined) return migrateWarn("Use of jQuery.fn.data('events') is deprecated"), evt;
        }
        return oldFnData.apply(this, arguments);
    };
    var rscriptType = /\/(java|ecma)script/i, oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;
    jQuery.fn.andSelf = function() {
        return migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), oldSelf.apply(this, arguments);
    }, jQuery.clean || (jQuery.clean = function(elems, context, fragment, scripts) {
        context = context || document, context = !context.nodeType && context[0] || context, context = context.ownerDocument || context, migrateWarn("jQuery.clean() is deprecated");
        var i, elem, handleScript, jsTags, ret = [];
        jQuery.merge(ret
, jQuery.buildFragment(elems, context).childNodes);
        if (fragment) {
            handleScript = function(elem) {
                if (!elem.type || rscriptType.test(elem.type)) return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem);
            };
            for (i = 0; (elem = ret[i]) != null; i++) if (!jQuery.nodeName(elem, "script") || !handleScript(elem)) fragment.appendChild(elem), typeof elem.getElementsByTagName != "undefined" && (jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript), ret.splice.apply(ret, [ i + 1, 0 ].concat(jsTags)), i += jsTags.length);
        }
        return ret;
    });
    var eventAdd = jQuery.event.add, eventRemove = jQuery.event.remove, eventTrigger = jQuery.event.trigger, oldToggle = jQuery.fn.toggle, oldLive = jQuery.fn.live, oldDie = jQuery.fn.die, ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", rajaxEvent = new RegExp
("\\b(?:" + ajaxEvents + ")\\b"), rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, hoverHack = function(events) {
        return typeof events != "string" || jQuery.event.special.hover ? events : (rhoverHack.test(events) && migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), events && events.replace(rhoverHack, "mouseenter$1 mouseleave$1"));
    };
    jQuery.event.props && jQuery.event.props[0] !== "attrChange" && jQuery.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), jQuery.event.dispatch && migrateWarnProp(jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), jQuery.event.add = function(elem, types, handler, data, selector) {
        elem !== document && rajaxEvent.test(types) && migrateWarn("AJAX events should be attached to document: " + types), eventAdd.call(this, elem, hoverHack(types || ""), handler, data, selector);
    }, jQuery.event.remove = function(elem, types, handler, selector, 
mappedTypes) {
        eventRemove.call(this, elem, hoverHack(types) || "", handler, selector, mappedTypes);
    }, jQuery.fn.error = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        return migrateWarn("jQuery.fn.error() is deprecated"), args.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, args) : (this.triggerHandler.apply(this, args), this);
    }, jQuery.fn.toggle = function(fn, fn2) {
        if (!jQuery.isFunction(fn) || !jQuery.isFunction(fn2)) return oldToggle.apply(this, arguments);
        migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");
        var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function(event) {
            var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
            return jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1), event.preventDefault(), args[lastToggle].apply(this, arguments) || !1;
        };
        toggler.guid = guid;
        
while (i < args.length) args[i++].guid = guid;
        return this.click(toggler);
    }, jQuery.fn.live = function(types, data, fn) {
        return migrateWarn("jQuery.fn.live() is deprecated"), oldLive ? oldLive.apply(this, arguments) : (jQuery(this.context).on(types, this.selector, data, fn), this);
    }, jQuery.fn.die = function(types, fn) {
        return migrateWarn("jQuery.fn.die() is deprecated"), oldDie ? oldDie.apply(this, arguments) : (jQuery(this.context).off(types, this.selector || "**", fn), this);
    }, jQuery.event.trigger = function(event, data, elem, onlyHandlers) {
        return !elem && !rajaxEvent.test(event) && migrateWarn("Global events are undocumented and deprecated"), eventTrigger.call(this, event, data, elem || document, onlyHandlers);
    }, jQuery.each(ajaxEvents.split("|"), function(_, name) {
        jQuery.event.special[name] = {
            setup: function() {
                var elem = this;
                return elem !== document && (jQuery.event.
add(document, name + "." + jQuery.guid, function() {
                    jQuery.event.trigger(name, null, elem, !0);
                }), jQuery._data(this, name, jQuery.guid++)), !1;
            },
            teardown: function() {
                return this !== document && jQuery.event.remove(document, name + "." + jQuery._data(this, name)), !1;
            }
        };
    });
})(jQuery, window);;