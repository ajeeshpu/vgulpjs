/* ==========================================================
 * bootstrap-carousel.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
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
 * ========================================================== */

!function($) {
    var Carousel = function(element, options) {
        this.$element = $(element), this.$indicators = this.$element.find(".carousel-indicators"), this.options = options, this.options.pause == "hover" && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this));
    };
    Carousel.prototype = {
        cycle: function(e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), this;
        },
        getActiveIndex: function() {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active);
        },
        to: function(pos) {
            var activeIndex = this.getActiveIndex(), that = this;
            if (pos > this.$items.length - 1 || pos < 0) return;
            return this.sliding ? 
this.$element.one("slid", function() {
                that.to(pos);
            }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]));
        },
        pause: function(e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition.end && (this.$element.trigger($.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this;
        },
        next: function() {
            if (this.sliding) return;
            return this.slide("next");
        },
        prev: function() {
            if (this.sliding) return;
            return this.slide("prev");
        },
        slide: function(type, next) {
            var $active = this.$element.find(".item.active"), $next = next || $active[type](), isCycling = this.interval, direction = type == "next" ? "left" : "right", fallback = type == "next" ? "first" : "last", that = this, e;
            
this.sliding = !0, isCycling && this.pause(), $next = $next.length ? $next : this.$element.find(".item")[fallback](), e = $.Event("slide", {
                relatedTarget: $next[0],
                direction: direction
            });
            if ($next.hasClass("active")) return;
            this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
                $nextIndicator && $nextIndicator.addClass("active");
            }));
            if ($.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return;
                $next.addClass(type), $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), this.$element.one($.support.transition.end, function() {
                    $next.removeClass([ type, direction ].join
(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")), that.sliding = !1, setTimeout(function() {
                        that.$element.trigger("slid");
                    }, 0);
                });
            } else {
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return;
                $active.removeClass("active"), $next.addClass("active"), this.sliding = !1, this.$element.trigger("slid");
            }
            return isCycling && this.cycle(), this;
        }
    };
    var old = $.fn.carousel;
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("carousel"), options = $.extend({}, $.fn.carousel.defaults, typeof option == "object" && option), action = typeof option == "string" ? option : options.slide;
            data || $this.data("carousel", data = new Carousel(this, options)), typeof option == "number" ? data.to(option) : action ? data
[action]() : options.interval && data.pause().cycle();
        });
    }, $.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
        return $.fn.carousel = old, this;
    }, $(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var $this = $(this), href, $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")), options = $.extend({}, $target.data(), $this.data()), slideIndex;
        $target.carousel(options), (slideIndex = $this.attr("data-slide-to")) && $target.data("carousel").pause().to(slideIndex).cycle(), e.preventDefault();
    });
}(window.jQuery);;