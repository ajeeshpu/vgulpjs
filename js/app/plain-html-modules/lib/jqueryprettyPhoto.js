(function($) {
    $.prettyPhoto = {
        version: "3.1.4"
    }, $.fn.prettyPhoto = function(pp_settings) {
        pp_settings = jQuery.extend({
            hook: "rel",
            animation_speed: "fast",
            ajaxcallback: function() {},
            slideshow: 5e3,
            autoplay_slideshow: !1,
            opacity: .8,
            show_title: !0,
            allow_resize: !0,
            allow_expand: !0,
            default_width: 500,
            default_height: 344,
            counter_separator_label: "/",
            theme: "pp_default",
            horizontal_padding: 20,
            hideflash: !1,
            wmode: "opaque",
            autoplay: !0,
            modal: !1,
            deeplinking: !0,
            overlay_gallery: !0,
            overlay_gallery_max: 30,
            keyboard_shortcuts: !0,
            changepicturecallback: function() {},
            callback: function() {},
            ie6_fallback: !0,
            markup: '<div class="pp_pic_holder">       <div class="ppt">&nbsp;</div>       <div class="pp_top">        <div class="pp_left"></div>        <div class="pp_middle"></div>        <div class="pp_right"></div>       </div>       <div class="pp_content_container">        <div class="pp_left">        <div class="pp_right">         <div class="pp_content">          <div class="pp_loaderIcon"></div>          <div class="pp_fade">           <a href="#" class="pp_expand" title="Expand the image">Expand</a>           <div class="pp_hoverContainer">            <a class="pp_next" href="#">next</a>            <a class="pp_previous" href="#">previous</a>           </div>           <div id="pp_full_res"></div>           <div class="pp_details">            <div class="pp_nav">             <a href="#" class="pp_arrow_previous">Previous</a>             <p class="currentTextHolder">0/0</p>             <a href="#" class="pp_arrow_next">Next</a>            </div>            <p class="pp_description"></p>            <div class="pp_social">{pp_social}</div>            <a class="pp_close" href="#">Close</a>           </div>          </div>         </div>        </div>        </div>       </div>       <div class="pp_bottom">        <div class="pp_left"></div>        <div class="pp_middle"></div>        <div class="pp_right"></div>       </div>      </div>      <div class="pp_overlay"></div>'
,
            gallery_markup: '<div class="pp_gallery">         <a href="#" class="pp_arrow_previous">Previous</a>         <div>          <ul>           {gallery}          </ul>         </div>         <a href="#" class="pp_arrow_next">Next</a>        </div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>'
,
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: "",
            social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
        }, pp_settings);
        var matchedObjects = this, percentBased = !1, pp_dimensions, pp_open, pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth, windowHeight = $(
window).height(), windowWidth = $(window).width(), pp_slideshow;
        doresize = !0, scroll_pos = _get_scroll(), $(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function() {
            _center_overlay(), _resize_overlay();
        }), pp_settings.keyboard_shortcuts && $(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function(e) {
            if (typeof $pp_pic_holder != "undefined" && $pp_pic_holder.is(":visible")) switch (e.keyCode) {
              case 37:
                $.prettyPhoto.changePage("previous"), e.preventDefault();
                break;
              case 39:
                $.prettyPhoto.changePage("next"), e.preventDefault();
                break;
              case 27:
                settings.modal || $.prettyPhoto.close(), e.preventDefault();
            }
        }), $.prettyPhoto.initialize = function() {
            return settings = pp_settings, settings.theme == "pp_default" && (settings.horizontal_padding = 16), settings
.ie6_fallback && $.browser.msie && parseInt($.browser.version) == 6 && (settings.theme = "light_square"), theRel = $(this).attr(settings.hook), galleryRegExp = /\[(?:.*)\]/, isSet = galleryRegExp.exec(theRel) ? !0 : !1, pp_images = isSet ? jQuery.map(matchedObjects, function(n, i) {
                if ($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr("href");
            }) : $.makeArray($(this).attr("href")), pp_titles = isSet ? jQuery.map(matchedObjects, function(n, i) {
                if ($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).find("img").attr("alt") ? $(n).find("img").attr("alt") : "";
            }) : $.makeArray($(this).find("img").attr("alt")), pp_descriptions = isSet ? jQuery.map(matchedObjects, function(n, i) {
                if ($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr("title") ? $(n).attr("title") : "";
            }) : $.makeArray($(this).attr("title")), pp_images.length > settings.overlay_gallery_max && (settings
.overlay_gallery = !1), set_position = jQuery.inArray($(this).attr("href"), pp_images), rel_index = isSet ? set_position : $("a[" + settings.hook + "^='" + theRel + "']").index($(this)), _build_overlay(this), settings.allow_resize && $(window).bind("scroll.prettyphoto", function() {
                _center_overlay();
            }), $.prettyPhoto.open(), !1;
        }, $.prettyPhoto.open = function(event) {
            return typeof settings == "undefined" && (settings = pp_settings, $.browser.msie && $.browser.version == 6 && (settings.theme = "light_square"), pp_images = $.makeArray(arguments[0]), pp_titles = arguments[1] ? $.makeArray(arguments[1]) : $.makeArray(""), pp_descriptions = arguments[2] ? $.makeArray(arguments[2]) : $.makeArray(""), isSet = pp_images.length > 1 ? !0 : !1, set_position = arguments[3] ? arguments[3] : 0, _build_overlay(event.target)), $.browser.msie && $.browser.version == 6 && $("select").css("visibility", "hidden"), settings.hideflash && $("object,embed,iframe[src*=youtube],iframe[src*=vimeo]"
).css("visibility", "hidden"), _checkPosition($(pp_images).size()), $(".pp_loaderIcon").show(), settings.deeplinking && setHashtag(), settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href)), $pp_pic_holder.find(".pp_social").html(facebook_like_link)), $ppt.is(":hidden") && $ppt.css("opacity", 0).show(), $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity), $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + $(pp_images).size()), typeof pp_descriptions[set_position] != "undefined" && pp_descriptions[set_position] != "" ? $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position])) : $pp_pic_holder.find(".pp_description").hide(), movie_width = parseFloat(getParam("width", pp_images[set_position])) ? getParam("width", pp_images[set_position]) : settings.default_width.toString(), movie_height = parseFloat(getParam("height"
, pp_images[set_position])) ? getParam("height", pp_images[set_position]) : settings.default_height.toString(), percentBased = !1, movie_height.indexOf("%") != -1 && (movie_height = parseFloat($(window).height() * parseFloat(movie_height) / 100 - 150), percentBased = !0), movie_width.indexOf("%") != -1 && (movie_width = parseFloat($(window).width() * parseFloat(movie_width) / 100 - 150), percentBased = !0), $pp_pic_holder.fadeIn(function() {
                settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined" ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html("&nbsp;"), imgPreloader = "", skipInjection = !1;
                switch (_getFileType(pp_images[set_position])) {
                  case "image":
                    imgPreloader = new Image, nextImage = new Image, isSet && set_position < $(pp_images).size() - 1 && (nextImage.src = pp_images[set_position + 1]), prevImage = new Image, isSet && pp_images[set_position - 1] && (
prevImage.src = pp_images[set_position - 1]), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]), imgPreloader.onload = function() {
                        pp_dimensions = _fitToViewport(imgPreloader.width, imgPreloader.height), _showContent();
                    }, imgPreloader.onerror = function() {
                        alert("Image cannot be loaded. Make sure the path is correct and image exist."), $.prettyPhoto.close();
                    }, imgPreloader.src = pp_images[set_position];
                    break;
                  case "youtube":
                    pp_dimensions = _fitToViewport(movie_width, movie_height), movie_id = getParam("v", pp_images[set_position]), movie_id == "" && (movie_id = pp_images[set_position].split("youtu.be/"), movie_id = movie_id[1], movie_id.indexOf("?") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("?"))), movie_id.indexOf("&") > 0 && (movie_id = movie_id.substr(0, movie_id
.indexOf("&")))), movie = "http://www.youtube.com/embed/" + movie_id, getParam("rel", pp_images[set_position]) ? movie += "?rel=" + getParam("rel", pp_images[set_position]) : movie += "?rel=1", settings.autoplay && (movie += "&autoplay=1"), toInject = settings.iframe_markup.replace(/{width}/g, pp_dimensions.width).replace(/{height}/g, pp_dimensions.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                    break;
                  case "vimeo":
                    pp_dimensions = _fitToViewport(movie_width, movie_height), movie_id = pp_images[set_position];
                    var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)/, match = movie_id.match(regExp);
                    movie = "http://player.vimeo.com/video/" + match[2] + "?title=0&amp;byline=0&amp;portrait=0", settings.autoplay && (movie += "&autoplay=1;"), vimeo_width = pp_dimensions.width + "/embed/?moog_width=" + pp_dimensions.width, toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width
).replace(/{height}/g, pp_dimensions.height).replace(/{path}/g, movie);
                    break;
                  case "quicktime":
                    pp_dimensions = _fitToViewport(movie_width, movie_height), pp_dimensions.height += 15, pp_dimensions.contentHeight += 15, pp_dimensions.containerHeight += 15, toInject = settings.quicktime_markup.replace(/{width}/g, pp_dimensions.width).replace(/{height}/g, pp_dimensions.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                    break;
                  case "flash":
                    pp_dimensions = _fitToViewport(movie_width, movie_height), flash_vars = pp_images[set_position], flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length), filename = pp_images[set_position], filename = filename.substring(0, filename.indexOf("?")), toInject = settings.flash_markup.replace(/{width}/g, pp_dimensions
.width).replace(/{height}/g, pp_dimensions.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                    break;
                  case "iframe":
                    pp_dimensions = _fitToViewport(movie_width, movie_height), frame_url = pp_images[set_position], frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1), toInject = settings.iframe_markup.replace(/{width}/g, pp_dimensions.width).replace(/{height}/g, pp_dimensions.height).replace(/{path}/g, frame_url);
                    break;
                  case "ajax":
                    doresize = !1, pp_dimensions = _fitToViewport(movie_width, movie_height), doresize = !0, skipInjection = !0, $.get(pp_images[set_position], function(responseHTML) {
                        toInject = settings.inline_markup.replace(/{content}/g, responseHTML), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, _showContent();
                    });
                    break;
                  
case "custom":
                    pp_dimensions = _fitToViewport(movie_width, movie_height), toInject = settings.custom_markup;
                    break;
                  case "inline":
                    myClone = $(pp_images[set_position]).clone().append('<br clear="all" />').css({
                        width: settings.default_width
                    }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($("body")).show(), doresize = !1, pp_dimensions = _fitToViewport($(myClone).width(), $(myClone).height()), doresize = !0, $(myClone).remove(), toInject = settings.inline_markup.replace(/{content}/g, $(pp_images[set_position]).html());
                }
                !imgPreloader && !skipInjection && ($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, _showContent());
            }), !1;
        }, $.prettyPhoto.changePage = function(direction) {
            currentGalleryPage = 0, direction == "previous" ? (set_position--, set_position < 0 && 
(set_position = $(pp_images).size() - 1)) : direction == "next" ? (set_position++, set_position > $(pp_images).size() - 1 && (set_position = 0)) : set_position = direction, rel_index = set_position, doresize || (doresize = !0), settings.allow_expand && $(".pp_contract").removeClass("pp_contract").addClass("pp_expand"), _hideContent(function() {
                $.prettyPhoto.open();
            });
        }, $.prettyPhoto.changeGalleryPage = function(direction) {
            direction == "next" ? (currentGalleryPage++, currentGalleryPage > totalPage && (currentGalleryPage = 0)) : direction == "previous" ? (currentGalleryPage--, currentGalleryPage < 0 && (currentGalleryPage = totalPage)) : currentGalleryPage = direction, slide_speed = direction == "next" || direction == "previous" ? settings.animation_speed : 0, slide_to = currentGalleryPage * itemsPerPage * itemWidth, $pp_gallery.find("ul").animate({
                left: -slide_to
            }, slide_speed);
        }, $.prettyPhoto.startSlideshow = 
function() {
            typeof pp_slideshow == "undefined" ? ($pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function() {
                return $.prettyPhoto.stopSlideshow(), !1;
            }), pp_slideshow = setInterval($.prettyPhoto.startSlideshow, settings.slideshow)) : $.prettyPhoto.changePage("next");
        }, $.prettyPhoto.stopSlideshow = function() {
            $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function() {
                return $.prettyPhoto.startSlideshow(), !1;
            }), clearInterval(pp_slideshow), pp_slideshow = undefined;
        }, $.prettyPhoto.close = function() {
            if ($pp_overlay.is(":animated")) return;
            $.prettyPhoto.stopSlideshow(), $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden"), $("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function() {
                $(this).remove
();
            }), $pp_overlay.fadeOut(settings.animation_speed, function() {
                $.browser.msie && $.browser.version == 6 && $("select").css("visibility", "visible"), settings.hideflash && $("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible"), $(this).remove(), $(window).unbind("scroll.prettyphoto"), clearHashtag(), settings.callback(), doresize = !0, pp_open = !1, delete settings;
            });
        };
        function _showContent() {
            $(".pp_loaderIcon").hide(), projectedTop = scroll_pos.scrollTop + (windowHeight / 2 - pp_dimensions.containerHeight / 2), projectedTop < 0 && (projectedTop = 0), $ppt.fadeTo(settings.animation_speed, 1), $pp_pic_holder.find(".pp_content").animate({
                height: pp_dimensions.contentHeight,
                width: pp_dimensions.contentWidth
            }, settings.animation_speed), $pp_pic_holder.animate({
                top: projectedTop,
                left: windowWidth / 2 - pp_dimensions
.containerWidth / 2 < 0 ? 0 : windowWidth / 2 - pp_dimensions.containerWidth / 2,
                width: pp_dimensions.containerWidth
            }, settings.animation_speed, function() {
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(pp_dimensions.height).width(pp_dimensions.width), $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed), isSet && _getFileType(pp_images[set_position]) == "image" ? $pp_pic_holder.find(".pp_hoverContainer").show() : $pp_pic_holder.find(".pp_hoverContainer").hide(), settings.allow_expand && (pp_dimensions.resized ? $("a.pp_expand,a.pp_contract").show() : $("a.pp_expand").hide()), settings.autoplay_slideshow && !pp_slideshow && !pp_open && $.prettyPhoto.startSlideshow(), settings.changepicturecallback(), pp_open = !0;
            }), _insert_gallery(), pp_settings.ajaxcallback();
        }
        function _hideContent(callback) {
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility"
, "hidden"), $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function() {
                $(".pp_loaderIcon").show(), callback();
            });
        }
        function _checkPosition(setCount) {
            setCount > 1 ? $(".pp_nav").show() : $(".pp_nav").hide();
        }
        function _fitToViewport(width, height) {
            resized = !1, _getDimensions(width, height), imageWidth = width, imageHeight = height;
            if ((pp_containerWidth > windowWidth || pp_containerHeight > windowHeight) && doresize && settings.allow_resize && !percentBased) {
                resized = !0, fitting = !1;
                while (!fitting) pp_containerWidth > windowWidth ? (imageWidth = windowWidth - 200, imageHeight = height / width * imageWidth) : pp_containerHeight > windowHeight ? (imageHeight = windowHeight - 200, imageWidth = width / height * imageHeight) : fitting = !0, pp_containerHeight = imageHeight, pp_containerWidth = imageWidth;
                _getDimensions
(imageWidth, imageHeight), (pp_containerWidth > windowWidth || pp_containerHeight > windowHeight) && _fitToViewport(pp_containerWidth, pp_containerHeight);
            }
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(pp_containerHeight),
                containerWidth: Math.floor(pp_containerWidth) + settings.horizontal_padding * 2,
                contentHeight: Math.floor(pp_contentHeight),
                contentWidth: Math.floor(pp_contentWidth),
                resized: resized
            };
        }
        function _getDimensions(width, height) {
            width = parseFloat(width), height = parseFloat(height), $pp_details = $pp_pic_holder.find(".pp_details"), $pp_details.width(width), detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom")), $pp_details = $pp_details.clone().addClass(settings.theme).width(width).appendTo
($("body")).css({
                position: "absolute",
                top: -1e4
            }), detailsHeight += $pp_details.height(), detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight, $.browser.msie && $.browser.version == 7 && (detailsHeight += 8), $pp_details.remove(), $pp_title = $pp_pic_holder.find(".ppt"), $pp_title.width(width), titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom")), $pp_title = $pp_title.clone().appendTo($("body")).css({
                position: "absolute",
                top: -1e4
            }), titleHeight += $pp_title.height(), $pp_title.remove(), pp_contentHeight = height + detailsHeight, pp_contentWidth = width, pp_containerHeight = pp_contentHeight + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height(), pp_containerWidth = width;
        }
        function _getFileType(itemSrc) {
            return itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i
) ? "youtube" : itemSrc.match(/vimeo\.com/i) ? "vimeo" : itemSrc.match(/\b.mov\b/i) ? "quicktime" : itemSrc.match(/\b.swf\b/i) ? "flash" : itemSrc.match(/\biframe=true\b/i) ? "iframe" : itemSrc.match(/\bajax=true\b/i) ? "ajax" : itemSrc.match(/\bcustom=true\b/i) ? "custom" : itemSrc.substr(0, 1) == "#" ? "inline" : "image";
        }
        function _center_overlay() {
            if (doresize && typeof $pp_pic_holder != "undefined") {
                scroll_pos = _get_scroll(), contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width(), projectedTop = windowHeight / 2 + scroll_pos.scrollTop - contentHeight / 2, projectedTop < 0 && (projectedTop = 0);
                if (contentHeight > windowHeight) return;
                $pp_pic_holder.css({
                    top: projectedTop,
                    left: windowWidth / 2 + scroll_pos.scrollLeft - contentwidth / 2
                });
            }
        }
        function _get_scroll() {
            if (self.pageYOffset
) return {
                scrollTop: self.pageYOffset,
                scrollLeft: self.pageXOffset
            };
            if (document.documentElement && document.documentElement.scrollTop) return {
                scrollTop: document.documentElement.scrollTop,
                scrollLeft: document.documentElement.scrollLeft
            };
            if (document.body) return {
                scrollTop: document.body.scrollTop,
                scrollLeft: document.body.scrollLeft
            };
        }
        function _resize_overlay() {
            windowHeight = $(window).height(), windowWidth = $(window).width(), typeof $pp_overlay != "undefined" && $pp_overlay.height($(document).height()).width(windowWidth);
        }
        function _insert_gallery() {
            isSet && settings.overlay_gallery && _getFileType(pp_images[set_position]) == "image" && settings.ie6_fallback && (!$.browser.msie || parseInt($.browser.version) != 6) ? (itemWidth = 57, navWidth = settings.theme == "facebook" || 
settings.theme == "pp_default" ? 50 : 30, itemsPerPage = Math.floor((pp_dimensions.containerWidth - 100 - navWidth) / itemWidth), itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length, totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1, totalPage == 0 ? (navWidth = 0, $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()) : $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show(), galleryWidth = itemsPerPage * itemWidth, fullGalleryWidth = pp_images.length * itemWidth, $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected"), goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage, $.prettyPhoto.changeGalleryPage(goToPage), $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")) : $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave"
);
        }
        function _build_overlay(caller) {
            settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))), settings.markup = settings.markup.replace("{pp_social}", ""), $("body").append(settings.markup), $pp_pic_holder = $(".pp_pic_holder"), $ppt = $(".ppt"), $pp_overlay = $("div.pp_overlay");
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0, toInject = "";
                for (var i = 0; i < pp_images.length; i++) pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi) ? (classname = "", img_src = pp_images[i]) : (classname = "default", img_src = ""), toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject), $pp_pic_holder.find("#pp_full_res").after(toInject), $pp_gallery = $(".pp_pic_holder .pp_gallery"), $pp_gallery_li = 
$pp_gallery.find("li"), $pp_gallery.find(".pp_arrow_next").click(function() {
                    return $.prettyPhoto.changeGalleryPage("next"), $.prettyPhoto.stopSlideshow(), !1;
                }), $pp_gallery.find(".pp_arrow_previous").click(function() {
                    return $.prettyPhoto.changeGalleryPage("previous"), $.prettyPhoto.stopSlideshow(), !1;
                }), $pp_pic_holder.find(".pp_content").hover(function() {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn();
                }, function() {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut();
                }), itemWidth = 57, $pp_gallery_li.each(function(i) {
                    $(this).find("a").click(function() {
                        return $.prettyPhoto.changePage(i), $.prettyPhoto.stopSlideshow(), !1;
                    });
                });
            }
            settings.slideshow && ($pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>'
), $pp_pic_holder.find(".pp_nav .pp_play").click(function() {
                return $.prettyPhoto.startSlideshow(), !1;
            })), $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme), $pp_overlay.css({
                opacity: 0,
                height: $(document).height(),
                width: $(window).width()
            }).bind("click", function() {
                settings.modal || $.prettyPhoto.close();
            }), $("a.pp_close").bind("click", function() {
                return $.prettyPhoto.close(), !1;
            }), settings.allow_expand && $("a.pp_expand").bind("click", function(e) {
                return $(this).hasClass("pp_expand") ? ($(this).removeClass("pp_expand").addClass("pp_contract"), doresize = !1) : ($(this).removeClass("pp_contract").addClass("pp_expand"), doresize = !0), _hideContent(function() {
                    $.prettyPhoto.open();
                }), !1;
            }), $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous"
).bind("click", function() {
                return $.prettyPhoto.changePage("previous"), $.prettyPhoto.stopSlideshow(), !1;
            }), $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function() {
                return $.prettyPhoto.changePage("next"), $.prettyPhoto.stopSlideshow(), !1;
            }), _center_overlay();
        }
        return !pp_alreadyInitialized && getHashtag() && (pp_alreadyInitialized = !0, hashIndex = getHashtag(), hashRel = hashIndex, hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1), hashRel = hashRel.substring(0, hashRel.indexOf("/")), setTimeout(function() {
            $("a[" + pp_settings.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click");
        }, 50)), this.unbind("click.prettyphoto").bind("click.prettyphoto", $.prettyPhoto.initialize);
    };
    function getHashtag() {
        return url = location.href, hashtag = url.indexOf("#prettyPhoto") !== -1 ? decodeURI(url.substring
(url.indexOf("#prettyPhoto") + 1, url.length)) : !1, hashtag;
    }
    function setHashtag() {
        if (typeof theRel == "undefined") return;
        location.hash = theRel + "/" + rel_index + "/";
    }
    function clearHashtag() {
        location.href.indexOf("#prettyPhoto") !== -1 && (location.hash = "prettyPhoto");
    }
    function getParam(name, url) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)", regex = new RegExp(regexS), results = regex.exec(url);
        return results == null ? "" : results[1];
    }
})(jQuery);

var pp_alreadyInitialized = !1;;