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

!function($) {
    var Typeahead = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = $(this.options.menu), this.shown = !1, this.listen();
    };
    Typeahead.prototype = {
        constructor: Typeahead,
        select: function() {
            var val = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(val)).change(), this.hide();
        },
        updater: function(item) {
            return item;
        },
        show: function() {
            var pos = $.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.
insertAfter(this.$element).css({
                top: pos.top + pos.height,
                left: pos.left
            }).show(), this.shown = !0, this;
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this;
        },
        lookup: function(event) {
            var items;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source, items ? this.process(items) : this);
        },
        process: function(items) {
            var that = this;
            return items = $.grep(items, function(item) {
                return that.matcher(item);
            }), items = this.sorter(items), items.length ? this.render(items.slice(0, this.options.items)).show() : this.shown ? this.hide() : this;
        },
        matcher: function(item) {
            return ~item
.toLowerCase().indexOf(this.query.toLowerCase());
        },
        sorter: function(items) {
            var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
            while (item = items.shift()) item.toLowerCase().indexOf(this.query.toLowerCase()) ? ~item.indexOf(this.query) ? caseSensitive.push(item) : caseInsensitive.push(item) : beginswith.push(item);
            return beginswith.concat(caseSensitive, caseInsensitive);
        },
        highlighter: function(item) {
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return item.replace(new RegExp("(" + query + ")", "ig"), function($1, match) {
                return "<strong>" + match + "</strong>";
            });
        },
        render: function(items) {
            var that = this;
            return items = $(items).map(function(i, item) {
                return i = $(that.options.item).attr("data-value", item), i.find("a").html(that.highlighter(item)), i[0];
            
}), items.first().addClass("active"), this.$menu.html(items), this;
        },
        next: function(event) {
            var active = this.$menu.find(".active").removeClass("active"), next = active.next();
            next.length || (next = $(this.$menu.find("li")[0])), next.addClass("active");
        },
        prev: function(event) {
            var active = this.$menu.find(".active").removeClass("active"), prev = active.prev();
            prev.length || (prev = this.$menu.find("li").last()), prev.addClass("active");
        },
        listen: function() {
            this.$element.on("focus", $.proxy(this.focus, this)).on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", $.proxy(this.keydown, this)), this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this)).on("mouseleave", "li", $.proxy(this.mouseleave, 
this));
        },
        eventSupported: function(eventName) {
            var isSupported = eventName in this.$element;
            return isSupported || (this.$element.setAttribute(eventName, "return;"), isSupported = typeof this.$element[eventName] == "function"), isSupported;
        },
        move: function(e) {
            if (!this.shown) return;
            switch (e.keyCode) {
              case 9:
              case 13:
              case 27:
                e.preventDefault();
                break;
              case 38:
                e.preventDefault(), this.prev();
                break;
              case 40:
                e.preventDefault(), this.next();
            }
            e.stopPropagation();
        },
        keydown: function(e) {
            this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [ 40, 38, 9, 13, 27 ]), this.move(e);
        },
        keypress: function(e) {
            if (this.suppressKeyPressRepeat) return;
            this.move(e);
        
},
        keyup: function(e) {
            switch (e.keyCode) {
              case 40:
              case 38:
              case 16:
              case 17:
              case 18:
                break;
              case 9:
              case 13:
                if (!this.shown) return;
                this.select();
                break;
              case 27:
                if (!this.shown) return;
                this.hide();
                break;
              default:
                this.lookup();
            }
            e.stopPropagation(), e.preventDefault();
        },
        focus: function(e) {
            this.focused = !0;
        },
        blur: function(e) {
            this.focused = !1, !this.mousedover && this.shown && this.hide();
        },
        click: function(e) {
            e.stopPropagation(), e.preventDefault(), this.select(), this.$element.focus();
        },
        mouseenter: function(e) {
            this.mousedover = !0, this.$menu.find(".active"
).removeClass("active"), $(e.currentTarget).addClass("active");
        },
        mouseleave: function(e) {
            this.mousedover = !1, !this.focused && this.shown && this.hide();
        }
    };
    var old = $.fn.typeahead;
    $.fn.typeahead = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("typeahead"), options = typeof option == "object" && option;
            data || $this.data("typeahead", data = new Typeahead(this, options)), typeof option == "string" && data[option]();
        });
    }, $.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, $.fn.typeahead.Constructor = Typeahead, $.fn.typeahead.noConflict = function() {
        return $.fn.typeahead = old, this;
    }, $(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
        var $this = 
$(this);
        if ($this.data("typeahead")) return;
        $this.typeahead($this.data());
    });
}(window.jQuery);;