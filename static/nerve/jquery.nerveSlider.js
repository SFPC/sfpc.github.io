// Thanks to jQuery TouchPunch for the mobile drag hack
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);
// Nerve Slider shuffle script
jQuery.fn.nerveShuffle=function(){for(var b,a=0;a<this.length;a++)b=Math.floor(Math.random()*this.length),$(this[a]).before($(this[b]));return this};

/*
Copyright (C) 2013, Ryan Bruzan - Nerve Slider
v9.4
*/

var nsVersion = 9.4;

(function($) {

	$.fn.nerveSlider = function(userOptions) {
		var options = $.extend({
			sliderWidth: "1200px",
			sliderHeight: "500px",
			sliderHeightAdaptable: false,
			sliderFullscreen: false,
			sliderAutoPlay: true,
			waitForLoad: false,
			slideTransition: "slide",
			slideTransitionDirection: "left",
			slideTransitionSpeed: 1000,
			slideTransitionDelay: 5000,
			slideTransitionEasing: "swing",
			slideTransitionStart: function(){},
			slideTransitionComplete: function(){},
			slideImageScaleMode: "fill",
			slideShuffle: false,
			slideReverse: false,
			startOnSlide: 1,
			showFilmstrip: false,
			showCaptions: true,
			simultaneousCaptions: false,
			showTimer: true,
			timerStartWidth: "0%",
			timerEndWidth: "100%",
			showPause: true,
			showArrows: true,
			showDots: true,
			showLoadingOverlay: true,
			sliderTheme: "light",
			slidesDraggable: true,
			slidesDragLimitFactor: 5,
			allowKeyboardEvents: true,
			sliderResizable: false,
			sliderKeepAspectRatio: true,
			preDelay: 0
		}, userOptions);
		

		return $(this).each(function(){
			var self = this;
			
			$(self).wrap("<div class='ns_parentReader'></div>");
			$(self).data("preservedhtml", $(self).parent().html());
			$(self).unwrap();
			
			$(self).before("<!-- Nerve Slider, nerveslider.builtbyevolve.com -->");
			$(self).addClass("ns_nerveSlider");
			var nsOriginalTheme = options.sliderTheme;
			$(self).addClass(nsOriginalTheme);
			if (options.sliderHeightAdaptable === true) {$(self).addClass("heightAdaptable");};
			var sliderPaused = false;
			options.sliderWidth = ""+options.sliderWidth+"";
			options.sliderHeight = ""+options.sliderHeight+"";
			
			var tdirection;
			var dragaxis;
			if (options.slideTransitionDirection == "left") {
				tdirection = "left";
				dragaxis = "x";
				$(self).addClass("ns_horizontal");
			}
			else if (options.slideTransitionDirection == "right") {
				tdirection = "right";
				dragaxis = "x";
				$(self).addClass("ns_horizontal");
			} else if (options.slideTransitionDirection == "up") {
				tdirection = "top";
				dragaxis = "y";
				$(self).addClass("ns_vertical");
			} else if (options.slideTransitionDirection == "down") {
				tdirection = "bottom";
				dragaxis = "y";
				$(self).addClass("ns_vertical");
				};
			var transarray = {};
			
			var currentSlideDelay = options.slideTransitionDelay;
	
			function donextslide(){
				$(self).find(".ns_caption").stop().fadeOut(options.slideTransitionSpeed/4, "swing");
				$(self).find(".ns_timer").stop();
				if (options.slideTransition == "slide") {
					// SLIDE TRANSITION
					if (!$(self).find(".ns_selected").hasClass("ns_lastSlide")) {
						if ($(self).find(".ns_selected").hasClass("ns_firstSlide")) {
							$(self).find(".ns_slidesTrack, .ns_caption").stop(true, true);
						} else {
							$(self).find(".ns_slidesTrack").stop(false, false);
						};
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").next(".ns_dot").addClass("ns_selected");
						$(self).find(".ns_slideContainer.ns_selected").toggleClass("ns_selected").next(".ns_slideContainer").addClass("ns_selected");
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						options.slideTransitionStart();
						transarray[tdirection] = ($(self).find(".ns_selected").data("positionleft")*-1)+"%";
						$(self).find(".ns_slidesTrack").animate(transarray, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
					} else {
						$(self).find(".ns_slidesTrack").stop(false, false);
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").parent().find(".ns_dot:first-child").addClass("ns_selected");
						$(self).find(".ns_slideContainer.ns_selected").toggleClass("ns_selected").parent().find(".ns_firstSlide").addClass("ns_selected");
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_firstSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_decoy.ns_fs .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						options.slideTransitionStart();
						transarray[tdirection] = ($(self).find(".ns_decoy.ns_fs").data("positionleft")*-1)+"%";
						$(self).find(".ns_slidesTrack").animate(transarray, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							$(self).find(".ns_slidesTrack").css(tdirection,0+"%"); 
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_firstSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
					};
				} else if (options.slideTransition == "fade") {
					//FADE TRANSITION
					if (!$(self).find(".ns_selected").hasClass("ns_lastSlide")) {
						$(self).find(".ns_selected").stop(true, false);
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").next(".ns_dot").addClass("ns_selected");
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":0}, options.slideTransitionSpeed, options.slideTransitionEasing).toggleClass("ns_selected").next(".ns_slideContainer").addClass("ns_selected");
						$(self).find(".ns_slideContainer").each(function(){$(this).css({"z-index":$(this).data("originalZIndex")})});
						$(self).find(".ns_slideContainer.ns_selected").css({"z-index": 45});
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						options.slideTransitionStart();
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":1}, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
					} else {
						$(self).find(".ns_selected").stop(true, false);
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").parent().find(".ns_dot:first-child").addClass("ns_selected");
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":0}, options.slideTransitionSpeed, options.slideTransitionEasing).toggleClass("ns_selected").parent().find(".ns_firstSlide").addClass("ns_selected");
						$(self).find(".ns_slideContainer").each(function(){$(this).css({"z-index":$(this).data("originalZIndex")})});
						$(self).find(".ns_slideContainer.ns_selected").css({"z-index": 45});
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_firstSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_decoy.ns_fs .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						options.slideTransitionStart();
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":1}, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_firstSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
						};
					};
					$(self).data("selectedSlide",$(self).find(".ns_slideContainer.ns_selected"));
				};
					
			function doprevslide(){
				$(self).find(".ns_caption").stop().fadeOut(options.slideTransitionSpeed/4, "swing");
				$(self).find(".ns_timer").stop();
				if (options.slideTransition == "slide") {
					if (!$(self).find(".ns_selected").hasClass("ns_firstSlide")) {
						$(self).find(".ns_slidesTrack").stop(false, false);
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").prev(".ns_dot").addClass("ns_selected");
						$(self).find(".ns_slideContainer.ns_selected").toggleClass("ns_selected").prev(".ns_slideContainer").addClass("ns_selected");
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						options.slideTransitionStart();
						transarray[tdirection] = ($(self).find(".ns_selected").data("positionleft")*-1)+"%";
						$(self).find(".ns_slidesTrack").animate(transarray, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
					} else {
						$(self).find(".ns_slidesTrack").stop(false, false);
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_slideContainer.ns_selected").toggleClass("ns_selected").parent().find(".ns_lastSlide").addClass("ns_selected");
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_lastSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						transarray[tdirection] = ($(self).find(".ns_decoy.ns_fs").data("positionleft")*-1)+"%";
						$(self).find(".ns_slidesTrack").css(transarray);
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").parent().find(".ns_dot:last-child").addClass("ns_selected");
						options.slideTransitionStart();
						transarray[tdirection] = ($(self).find(".ns_lastSlide").data("positionleft")*-1)+"%";
						$(self).find(".ns_slidesTrack").animate(transarray, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_lastSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
						};
				} else if (options.slideTransition == "fade") {
					//FADE TRANSITION
					if (!$(self).find(".ns_selected").hasClass("ns_firstSlide")) {
						$(self).find(".ns_selected").stop(true, false);
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").prev(".ns_dot").addClass("ns_selected");
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":0}, options.slideTransitionSpeed, options.slideTransitionEasing).toggleClass("ns_selected").prev(".ns_slideContainer").addClass("ns_selected");
						$(self).find(".ns_slideContainer").each(function(){$(this).css({"z-index":$(this).data("originalZIndex")})});
						$(self).find(".ns_slideContainer.ns_selected").css({"z-index": 45});
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						options.slideTransitionStart();
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":1}, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
					} else {
						$(self).find(".ns_selected").stop(true, false);
						$(self).find(".ns_timer").stop();
						$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
							$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
							});
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(self).find(".ns_dots .ns_dot.ns_selected").toggleClass("ns_selected").parent().find(".ns_dot:last-child").addClass("ns_selected");
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":0}, options.slideTransitionSpeed, options.slideTransitionEasing).toggleClass("ns_selected").parent().find(".ns_lastSlide").addClass("ns_selected");
						$(self).find(".ns_slideContainer").each(function(){$(this).css({"z-index":$(this).data("originalZIndex")})});
						$(self).find(".ns_slideContainer.ns_selected").css({"z-index": 45});
						if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
							currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
						} else {
							currentSlideDelay = options.slideTransitionDelay;
							};
						if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
						} else {
							$(self).removeClass("light");
							$(self).removeClass("dark");
							$(self).addClass(nsOriginalTheme);
							};
						if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_lastSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
						options.slideTransitionStart();
						$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":1}, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
							if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
							$(self).find(".ns_slideContainer.ns_lastSlide .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							options.slideTransitionComplete();
							});
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
						};
					};
					$(self).data("selectedSlide",$(self).find(".ns_slideContainer.ns_selected"));
				};
					
			function jumptoslide(thejumpposition, numberofdotclicked){
				$(self).find(".ns_caption").stop().fadeOut(options.slideTransitionSpeed/4, "swing");
				$(self).find(".ns_timer").stop();
				$(self).find(".ns_slidesTrack").stop(false, false);
				$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
					$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
					});
				$(self).find(".ns_dots .ns_dot.ns_selected, .ns_slideContainer.ns_selected").toggleClass("ns_selected");
				$(self).find(".ns_slideContainer").eq(numberofdotclicked).addClass("ns_selected");
				$(self).find(".ns_dots .ns_dot").eq(numberofdotclicked).addClass("ns_selected");
				if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
					currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
				} else {
					currentSlideDelay = options.slideTransitionDelay;
					};
				if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
					$(self).removeClass("light");
					$(self).removeClass("dark");
					$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
				} else {
					$(self).removeClass("light");
					$(self).removeClass("dark");
					$(self).addClass(nsOriginalTheme);
					};
				if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
				options.slideTransitionStart();
				transarray[tdirection] = thejumpposition;
				$(self).find(".ns_slidesTrack").animate(transarray, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
					if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
					$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
					if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
					options.slideTransitionComplete();
					});
				if (options.sliderHeightAdaptable === true) {
					$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
					};
				$(self).data("selectedSlide",$(self).find(".ns_slideContainer.ns_selected"));
				};
					
			function pauseslide() {
				sliderPaused = true;
				$(self).find(".ns_pauseButton div, .ns_timer").stop(true,false);
				$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
					$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
					});
				$(self).find(".ns_pauseButton div").css({"background-position": "50% 100%"});
				$(self).find(".ns_pauseButton").one("click", resumeslide);
				$(self).data("paused",true);
				};
				
			function resumeslide() {
				sliderPaused = false;
				$(self).find(".ns_pauseButton div, .ns_timer").stop(true,true);
				$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
				$(self).find(".ns_pauseButton div").css({"background-position": "50% 0%"});
				if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
					currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
				} else {
					currentSlideDelay = options.slideTransitionDelay;
					};
				if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
				$(self).find(".ns_pauseButton").one("click", pauseslide);
				$(self).data("paused",false);
				};
				
			function togglepause() {
				if (sliderPaused == false) {
					pauseslide();
					$(self).data("paused",true);
				} else if (sliderPaused == true) {
					resumeslide();
					$(self).data("paused",false);
					};
				};

			function starttheslides() {
				if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
					currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
				} else {
					currentSlideDelay = options.slideTransitionDelay;
					};
				if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
					$(self).removeClass("light");
					$(self).removeClass("dark");
					$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
				} else {
					$(self).removeClass("light");
					$(self).removeClass("dark");
					$(self).addClass(nsOriginalTheme);
					};
				setTimeout(function(){
					if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
					}, options.preDelay);
				$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
				};
			
			$(self).css({"height":options.sliderHeight, "width":options.sliderWidth});
			
			if (options.sliderFullscreen === true){
				options.sliderWidth = "100%";
				options.sliderHeight = "100%";
				options.sliderResizable = true;
				$(self).css({
					"height":options.sliderHeight,
					"width":options.sliderWidth,
					"position":"fixed",
					"top":0,
					"right":0,
					"bottom":0,
					"left":0
					});
				};
			
			var aspectRatio = $(self).height() / $(self).width();
			var aspectRatio2 = $(self).width() / $(self).height();
			var crumbZIndex = 50;
			var crumbZIndex2 = -50;
			var sliderw = options.sliderWidth;
			var sliderh = options.sliderHeight;
			var widthHasPercentSymbol = sliderw.indexOf('%') >= 0;
			var heightHasPercentSymbol = sliderh.indexOf('%') >= 0;
			
			if ((widthHasPercentSymbol === true) || (heightHasPercentSymbol === true)) {
				options.sliderResizable = true;
				};
				
			if (options.slideShuffle === true) {
				$(self).find(">a,>img,>div").nerveShuffle();
				};
				
			if (options.slideReverse === true) {
				$(self).append($(self).find(">a,>img,>div").get().reverse());
				};
			
			$(self).find(">div").each(function(){
				$(this).addClass("ns_slideContainer");
				});
			$(self).find(">a").each(function(){
				var me = $(this);
				var goingto = me.attr("href");
				var goingtarget = me.attr("target");
				var goingrel = me.attr("rel");
				me.find(">img,>div").attr({"data-linkto": goingto, "data-linktarget": goingtarget, "data-linkrel": goingrel});
				me.find(">img,>div").unwrap();
				});
			$(self).find(">img,>a>img,>div>img,>div>a>img").each(function(){
				var me = $(this);
				if (me.parent().hasClass("ns_nerveSlider")){
					me.wrap("<div></div>");
					}
				me.parent().attr({"data-slidecaption": me.attr("data-slidecaption"), "data-linkto": me.attr("data-linkto"), "data-linktarget": me.attr("data-linktarget"), "data-linkrel": me.attr("data-linkrel"), "data-imagescalemode": me.attr("data-imagescalemode"), "data-slidetransitiondelay": me.attr("data-slidetransitiondelay"), "data-slidertheme": me.attr("data-slidertheme")});
				me.removeAttr("data-slidecaption");
				me.removeAttr("data-linkto");
				me.removeAttr("data-linktarget");
				me.removeAttr("data-linkrel");
				me.removeAttr("data-imagescalemode");
				me.removeAttr("data-slidetransitiondelay");
				me.removeAttr("data-slidertheme");
				});
			$(self).find(">div").each(function(){
				var iamsubject = $(this);
				iamsubject.addClass("ns_slideContainer");
				iamsubject.find(">img").addClass("ns_slideImage");
				if (options.showCaptions === true) {
					if (!iamsubject.attr("data-slidecaption") == "") {
						var captioncontent = iamsubject.attr("data-slidecaption");
						iamsubject.append("<div class='ns_caption'><div></div></div>");
						iamsubject.find(".ns_caption div").html(captioncontent);
						iamsubject.removeAttr("data-slidecaption");
						};
					};
				if (!iamsubject.attr("data-linkto") == "") {
					var linkplace = iamsubject.attr("data-linkto");
					var linkcontrol = iamsubject.attr("data-linktarget");
					var linkrel = iamsubject.attr("data-linkrel");
					iamsubject.find("img.ns_slideImage").wrap("<a href='"+linkplace+"'></a>");
					iamsubject.removeAttr("data-linkto");
					if(!iamsubject.attr("data-linktarget") == ""){
						iamsubject.find("a").attr("target", linkcontrol);
						iamsubject.removeAttr("data-linktarget");
						};
					if(!iamsubject.attr("data-linkrel") == ""){
						iamsubject.find("a").attr("rel", data-linkrel);
						iamsubject.removeAttr("data-linkrel");
						};
					};
				if (options.slideTransition == "slide") {
					$(this).data("positionleft", $(this).index()*100);
				} else if (options.slideTransition == "fade") {
					$(self).find(".ns_slideContainer:first").css({"position": "absolute", "top": 0, "left": 0, "z-index": 45, "opacity": 1});
					$(self).find(".ns_slideContainer:first").data("originalZIndex", 44);
					$(self).find(".ns_slideContainer:not(':first')").each(function(){
						$(this).css({"position": "absolute", "top": 0, "left": 0, "z-index": 44, "opacity": 0});
						$(this).data("originalZIndex", 44);
						});
					$(self).find(".ns_firstSlide").css("opacity",1);
					};
				});
			
			$(self).find(".ns_slideContainer:first-child").addClass("ns_selected");
			$(self).find(".ns_slideContainer:first-child").addClass("ns_firstSlide");
			$(self).find(".ns_slideContainer:last-child").addClass("ns_lastSlide");
			
			$(self).find(".ns_caption").each(function(){
				$(this).hide();
				});
			
			var numberofslides = $(self).find(".ns_slideContainer").size();
			if (numberofslides === 1) {
				options.sliderAutoPlay = false;
				};
			
			if (options.slideTransition == "slide") {
				$(self).find(".ns_firstSlide").clone().appendTo($(self)).removeClass("ns_firstSlide").removeClass("ns_selected").addClass("ns_decoy").addClass("ns_fs").data("positionleft", $(self).find(".ns_decoy.ns_fs").index()*100);
				$(self).find(".ns_lastSlide").clone().appendTo($(self)).removeClass("ns_lastSlide").removeClass("ns_selected").addClass("ns_decoy").addClass("ns_ls").data("positionleft", $(self).find(".ns_decoy.ns_ls").index()*100);
				if (options.slideTransitionDirection == "left") {
					$(self).find(".ns_decoy.ns_ls").addClass("left");
				} else if (options.slideTransitionDirection == "right") {
					$(self).find(".ns_decoy.ns_ls").addClass("right");
				} else if (options.slideTransitionDirection == "up") {
					$(self).find(".ns_decoy.ns_ls").addClass("up");
				} else if (options.slideTransitionDirection == "down") {
					$(self).find(".ns_decoy.ns_ls").addClass("down");
					};
				};
				
			if (options.slideTransitionDirection == "right") {
				$(self).find(".ns_slideContainer:not('.ns_decoy.ns_ls')").each(function(){
					$(this).css({"right": $(this).index()*200+"%"});
					});
			} else if (options.slideTransitionDirection == "down") {
				$(self).find(".ns_slideContainer:not('.ns_decoy.ns_ls')").each(function(){
					$(this).css({"bottom": $(this).index()*200+"%"});
					});
				};
			
			$(self).data("selectedSlide",$(self).find(".ns_slideContainer.ns_selected"));
			
			if((!options.showLoadingOverlay === false)){
				$(self).find(".ns_slideContainer").has(".ns_slideImage").each(function(){
					var container = $(this);
					container.find("img.ns_slideImage").css("opacity", 0);
					container.append("<div class='ns_loadSpinner'><div></div></div>");
					container.find(".ns_loadSpinner").show();
					container.find("img.ns_slideImage").bind('load', function() {
						container.find(".ns_loadSpinner").remove();
						container.find("img.ns_slideImage").animate({"opacity": 1}, options.slideTransitionSpeed);
						if (options.sliderHeightAdaptable === true) {
							$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
						}).each(function(){
							if(this.complete){$(this).load()};
						});
					});
				};
			$(self).find(".ns_slideContainer").each(function(){
				var container = $(this);
				container.find("img.ns_slideImage").error(function(){
					$(this).after("<div class='ns_dummyImage'><div></div></div>");
					container.find(".ns_dummyImage").show();
					$(this).remove();
					container.find(".ns_loadSpinner").remove();
					});
				});
			
			$(self).prepend("<div class='ns_slides'><div class='ns_slidesTrack'></div></div");
			$(self).find(".ns_slideContainer").each(function(){
				$(this).appendTo($(self).find(".ns_slides .ns_slidesTrack"));
				});
			
			$(self).append("<div class='ns_timer'></div>");
			if(options.showTimer === false){$(self).find(".ns_timer").css("bottom", $(self).find(".ns_timer").height()*-2)};
			$(self).find(".ns_timer").css("width", options.timerStartWidth)
			
			$(self).append("<div class='ns_prevButton'><div></div></div>");
			$(self).append("<div class='ns_nextButton'><div></div></div>");
			$(self).find(".ns_prevButton").click(doprevslide);
			$(self).find(".ns_nextButton").click(donextslide);
			if(options.showArrows === false){$(self).find(".ns_nextButton, .ns_prevButton").hide()};
			
			$(self).append("<div class='ns_pauseButton'><div></div></div>");
			if(options.sliderAutoPlay === true){$(self).find(".ns_pauseButton").one("click", pauseslide);};
			if(options.sliderAutoPlay === false){pauseslide()};
			if(options.showPause === false){$(self).find(".ns_pauseButton").hide()};
			
			$(self).append("<div class='ns_dots'></div>");
			for(var i=0; i<numberofslides; i++){
				$(self).find(".ns_dots").append("<div class='ns_dot'></div>");
				};
			var index = 0;
			$(self).find(".ns_dots .ns_dot").each(function(){
				$(this).attr("id", ++index-1);
				var mydotnumber = $(this).attr("id");
				$(this).attr("id", "ns_dot_"+mydotnumber);
				var mypuredotnumber = $(this).attr("id").replace("ns_dot_","");
				if (options.slideTransition == "slide") {
					$(this).data({"jumpposition": (mypuredotnumber*-100)+"%"});
					$(this).bind("click", function(){var me = $(this); dotwasclicked(me)});
				} else if (options.slideTransition == "fade") {
					$(this).bind("click", function(){var me = $(this); dotwasclicked2(me)});
					};
				});
			$(self).find(".ns_dots .ns_dot:first-child").addClass("ns_selected");
			function dotwasclicked(thedot){
				if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
				var jumppositionvariable = thedot.data("jumpposition");
				var mydotnumber = thedot.attr("id").replace("ns_dot_","");
				jumptoslide(jumppositionvariable, mydotnumber);
				$(self).find(".ns_dots .ns_dot.ns_selected").removeClass("ns_selected");
				thedot.addClass("ns_selected");
				};
			function dotwasclicked2(thedot){
				if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
				var mydotnumber = thedot.attr("id").replace("ns_dot_","");
				$(self).find(".ns_caption").stop().fadeOut(options.slideTransitionSpeed/4, "swing");
				$(self).find(".ns_timer").stop();
				$(self).find(".ns_selected").stop(false, false);
				$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
					$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
					});
				$(self).find(".ns_dots .ns_dot.ns_selected").removeClass("ns_selected");
				thedot.addClass("ns_selected");
				$(self).find(".ns_slideContainer.ns_selected").removeClass("ns_selected").animate({"opacity":0}, options.slideTransitionSpeed, options.slideTransitionEasing);
				$(self).find(".ns_slideContainer").eq(mydotnumber).addClass("ns_selected");
				$(self).find(".ns_slideContainer").each(function(){$(this).css({"z-index":$(this).data("originalZIndex")})});
				$(self).find(".ns_slideContainer.ns_selected").css({"z-index": 45});
				if (isNaN(parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10)) === false) {
					currentSlideDelay = parseInt($(self).find(".ns_slideContainer.ns_selected").attr("data-slidetransitiondelay"),10);
				} else {
					currentSlideDelay = options.slideTransitionDelay;
					};
				if ($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme") != null) {
					$(self).removeClass("light");
					$(self).removeClass("dark");
					$(self).addClass($(self).find(".ns_slideContainer.ns_selected").attr("data-slidertheme"));
				} else {
					$(self).removeClass("light");
					$(self).removeClass("dark");
					$(self).addClass(nsOriginalTheme);
					};

				if (options.simultaneousCaptions === true) {$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");};
				options.slideTransitionStart();
				$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":1}, options.slideTransitionSpeed, options.slideTransitionEasing, function(){
					if (sliderPaused === false){$(self).find(".ns_timer").animate({"width":options.timerEndWidth}, currentSlideDelay, "linear", function(){donextslide()});};
					$(self).find(".ns_slideContainer.ns_selected .ns_caption").fadeIn(options.slideTransitionSpeed/4, "swing");
					if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
					options.slideTransitionComplete();
					});
				if (options.sliderHeightAdaptable === true) {
					$(self).stop().animate({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())}, options.slideTransitionSpeed, options.slideTransitionEasing);
					};
				$(self).data("selectedSlide",$(self).find(".ns_slideContainer.ns_selected"));
				};
			if(options.showDots === false){$(self).find(".ns_dots").hide()};
			
			if ((options.startOnSlide>1) && (options.startOnSlide<=numberofslides)) {
				$(self).find(".ns_slideContainer.ns_selected,.ns_dot.ns_selected").removeClass("ns_selected");
				$(self).find(".ns_slideContainer").eq(options.startOnSlide-1).addClass("ns_selected");
				$(self).find(".ns_dot").eq(options.startOnSlide-1).addClass("ns_selected");
				if (options.slideTransition == "slide") {
					transarray[tdirection] = ($(self).find(".ns_selected").data("positionleft")*-1)+"%";
					$(self).find(".ns_slidesTrack").css(transarray);
					if (options.sliderHeightAdaptable === true) {$(self).css({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())});}
					$(self).find(".ns_caption").stop().fadeOut(0);
					$(self).find(".ns_slideContainer.ns_selected .ns_caption").stop().fadeIn(0);
				} else if (options.slideTransition == "fade") {
					$(self).find(".ns_slideContainer").animate({"opacity":0}, 0);
					$(self).find(".ns_slideContainer.ns_selected").animate({"opacity":1}, 0);
					if (options.sliderHeightAdaptable === true) {$(self).css({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())});}
					$(self).find(".ns_caption").stop().fadeOut(0);
					$(self).find(".ns_slideContainer.ns_selected .ns_caption").stop().fadeIn(0);
					}
				$(self).data("selectedSlide",$(self).find(".ns_slideContainer.ns_selected"));
				}
				
			function makedraggable(){
				var xpos;
				var ypos;
				var xdist;
				var ydist;
				var slidewidth;
				var slideheight;
				var limitfactor = options.slidesDragLimitFactor;
				$(self).find(".ns_slides").draggable({
					axis: dragaxis,
					scroll: false,
					start: function(event,ui){
						$(self).find(".ns_slideContainer, .ns_slides").stop(true,true);
						xpos = ui.position.left;
						ypos = ui.position.top;
						},
					stop: function(event,ui){
						slidewidth = $(self).width();
						slideheight = $(self).height();
						if (options.slideTransitionDirection == "left" || options.slideTransitionDirection == "up") {
							xdist = (ui.position.left - xpos)*-1;
							ydist = (ui.position.top - ypos)*-1;
						} else if (options.slideTransitionDirection == "right" || options.slideTransitionDirection == "down") {
							xdist = (ui.position.left - xpos);
							ydist = (ui.position.top - ypos);
							};
						if ((xdist>=slidewidth/limitfactor) || (ydist>=slideheight/limitfactor)) {
							$(self).find(".ns_timer").stop();
							$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
								$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
								});
							donextslide();
							$(self).find(".ns_slides").animate({"left": 0, "top":0}, options.slideTransitionSpeed, options.slideTransitionEasing);
						} else if (((xdist < 0) && (xdist <= (slidewidth/limitfactor)*-1)) || ((ydist < 0) && (ydist <= (slideheight/limitfactor)*-1))) {
							$(self).find(".ns_timer").stop();
							$(self).find(".ns_timer").fadeOut(options.slideTransitionSpeed/2, options.slideTransitionEasing, function(){
								$(self).find(".ns_timer").css({"width":options.timerStartWidth}).show().removeClass("ns_selected");
								});
							doprevslide();
							$(self).find(".ns_slides").animate({"left": 0, "top":0}, options.slideTransitionSpeed, options.slideTransitionEasing);
						} else {
							$(self).find(".ns_slides").animate({"left": 0, "top":0}, options.slideTransitionSpeed, options.slideTransitionEasing);
							};
						}
					});
				};
				
			if ((options.slidesDraggable === true) && (options.slideTransition != "fade")) {
				makedraggable();
				};

			if (options.allowKeyboardEvents === true){
				$(document).keydown(function(e){
					if (e.keyCode == 27) { // escape key
						togglepause();
						};
					if (e.keyCode == 37) { // left key
						doprevslide();
						};
					if (e.keyCode == 39) { // right key
						donextslide();
						};
					if (e.keyCode >= 97 && e.keyCode <= 105) { // 1-9 Numpad Keys
						$(self).find(".ns_dots .ns_dot").eq(e.keyCode-97).trigger("click");
						};
					if (e.keyCode == 96) { // 0 Numpad Key
						$(self).find(".ns_dots .ns_dot").eq(9).trigger("click");
						};
					});
				};

			if (options.showFilmstrip === true) {
				$(self).append("<div class='ns_filmstrip'></div>");
				var ns_filmstrip = $(self).find(".ns_filmstrip");
				$(self).find(".ns_slideContainer:not('.ns_decoy')").each(function(){
					var myimage = $(this).find("img").attr("src");
					ns_filmstrip.append("<img src='"+myimage+"' class='ns_fThumb'>");
					});
				ns_filmstrip.find("img.ns_fThumb").each(function(){
					$(this).bind("click", function(){
						$(self).find(".ns_dots .ns_dot").eq($(this).index()).trigger("click");
						});
					});
				};
			
			var scaleImagesInSlide;
			var currentscalemode;
			scaleImagesInSlide = function() {
				$(self).find(".ns_slideContainer").each(function(){
					if ($(this).attr("data-imagescalemode") != null) {
						currentscalemode = $(this).attr("data-imagescalemode");
					} else {
						currentscalemode = options.slideImageScaleMode;
						};
					if (currentscalemode == "fill") {
						// Fill mode
						var obj = $(this).find(">img.ns_slideImage, >a>img.ns_slideImage");
						obj.one("load", function() {
							var parentWidth = obj.parent().width();
							var parentHeight = obj.parent().height();
							var imageWidth = obj.width();
							var imageHeight = obj.height();
							var diff = imageWidth / parentWidth;

							if ((imageHeight / diff) < parentHeight) {
								obj.css({'width': 'auto', 'height': parentHeight});
								imageWidth = imageWidth / (imageHeight / parentHeight);
								imageHeight = parentHeight;
							} else {
								obj.css({'height': 'auto', 'width': parentWidth});
								imageWidth = parentWidth;
								imageHeight = imageHeight / diff;
								};

							var leftOffset = (imageWidth - parentWidth) / -2;
							var topOffset = (imageHeight - parentHeight) / -2;
							obj.css({'left': leftOffset, 'top': topOffset});
							}).each(function() {
							if(this.complete){$(this).trigger("load");};
							});
					} else if (currentscalemode == "fit") {
						// Fit mode
						var obj = $(this).find(">img.ns_slideImage, >a>img.ns_slideImage");
						obj.one("load", function() {
							var imageW = obj.width();
							var imageH = obj.height();
							var containerW = obj.parent().width();
							var containerH = obj.parent().height();
							var imageWHratio = imageW/imageH;
							var containerWHratio = containerW/containerH;
											
							if (containerWHratio>imageWHratio) {
								obj.css({height:"100%",width:"auto"});
								var marginLeft = (containerW-imageW)/2;
								obj.css({"margin-left":marginLeft});
							} else if(containerWHratio<imageWHratio) {
								obj.css({height:"auto",width:"100%"});
								var marginTop = Math.floor((containerH-imageH)/2);
								obj.css({"margin-top":marginTop});
								};
							}).each(function() {
								if(this.complete){$(this).trigger("load");};
							});
					} else if (currentscalemode == "stretch") {
						// Stretch mode
						var obj = $(this).find(">img.ns_slideImage, >a>img.ns_slideImage");
						obj.one("load", function() {
							$(this).css({
								"width": "100%",
								"height": "100%"
								});
							}).each(function() {
								if(this.complete){$(this).trigger("load");};
							});
					} else if (currentscalemode == "center") {
						// Center mode
						var obj = $(this).find(">img.ns_slideImage, >a>img.ns_slideImage");
						obj.one("load", function() {
							var parentWidth = obj.parent().width();
							var parentHeight = obj.parent().height();
							var imageWidth = obj.width();
							var imageHeight = obj.height();

							var leftOffset = (imageWidth - parentWidth) / -2;
							var topOffset = (imageHeight - parentHeight) / -2;
							obj.css({'left': leftOffset, 'top': topOffset});
						}).each(function() {
							if(this.complete){$(this).trigger("load");};
							});
						};
					});
				};
			if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
			
			$(self).append("<div class='ns_extras' style='display:none'></div>");
			$(self).find(".ns_extras").append("<div class='ns_imgButton'></div>");
			$(self).find(".ns_extras .ns_imgButton").bind("click", function(){
				if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};	
				});
			// For Nerve Slider analytics.  You may remove if necessary.
			$(self).find(".ns_extras").append("<img src='http://code.builtbyevolve.com/nerveSlider/log/pixel.php?a="+document.URL.replace("&","&amp;").replace("http://","[http]").replace("https://","[https]").replace(/\//gi,"[slash]")+"&v="+nsVersion+"' style='display:none;' class='ns_logImg'>"); // Store the ns_current URL
			$(self).find(".ns_extras .ns_logImg").bind('load',function(){$(this).remove();}).each(function(){if(this.complete){$(this).load()};}); // Remove leftover img
			// End of Nerve Slider analytics.
			
			if (options.sliderResizable === true) {
				var sliderw = options.sliderWidth;
				var sliderh = options.sliderHeight;
				var widthHasPercentSymbol = sliderw.indexOf('%') >= 0;
				var heightHasPercentSymbol = sliderh.indexOf('%') >= 0;
				if (options.sliderHeightAdaptable === false) {
					if ((widthHasPercentSymbol === false) && (heightHasPercentSymbol === false)) {
						$(self).css({"max-width": options.sliderWidth, "width": "100%"});
						$(window).resize(function(){
							if(options.sliderKeepAspectRatio === true){
								$(self).css({"height": $(self).width()*aspectRatio});
								};
							if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
							});
						$(window).trigger("resize");
						starttheslides();
					} else {
						// IF THERE'S A PERCENT FOR HEIGHT OR WIDTH
						if((widthHasPercentSymbol === true) && (heightHasPercentSymbol === false)){
							$(self).css({"width": options.sliderWidth});
							$(window).resize(function(){
								if(options.sliderKeepAspectRatio === true){
									$(self).css({"height": $(self).width()*aspectRatio});
								} else {
									$(self).css({"height": options.sliderHidth});
									};
								if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
								});
						} else if((heightHasPercentSymbol === true) && (widthHasPercentSymbol === false)){
							$(self).css({"height": options.sliderHeight});
							$(window).resize(function(){
								if(options.sliderKeepAspectRatio === true){
									$(self).css({"max-width": $(self).height()*aspectRatio2, "width": "100%"});
								} else {
									$(self).css({"max-width": options.sliderWidth, "width": "100%"});
									};
								if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
								});
						} else if((heightHasPercentSymbol === true) && (widthHasPercentSymbol === true)){
							$(self).css({"width": options.sliderWidth});
							$(self).css({"height": options.sliderHeight});
							$(window).resize(function(){
								if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
								});
							};
						if (options.sliderHeightAdaptable === false) {scaleImagesInSlide();};
						$(window).trigger("resize");
						starttheslides();
						};
				} else if (options.sliderHeightAdaptable === true) {
					if ((widthHasPercentSymbol === false) && (heightHasPercentSymbol === false)) {
						$(self).css({"max-width": options.sliderWidth, "width": "100%"});
						$(self).css({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())});
					} else {
						$(self).css({"width": options.sliderWidth});
						$(self).css({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())});
						};
					$(window).resize(function(){
						$(self).css({"height":Math.max($(self).find(".ns_slideContainer.ns_selected img.ns_slideImage").height(), $(self).find(".ns_slideContainer.ns_selected .ns_slideContent").outerHeight())});
						});
					starttheslides();
					};
			} else {
				if (options.waitForLoad === false) {
					starttheslides();
				} else {
					var imagesLoaded = 0;
					var alreadyStarted = false;
					$(self).find("img.ns_slideImage").bind('load', function() {
						if (($(self).find(".ns_loadSpinner").size() == 0) && (alreadyStarted === false)) {
							alreadyStarted = true;
							starttheslides();
							}
						}).each(function(){
							if(this.complete){$(this).load()};
							});
					}
				}
				
			$(self).data("selectedSlide",$(self).find(".ns_slideContainer.ns_selected"));
			if (sliderPaused == true) {
				$(self).data("paused",true);
			} else if (sliderPaused == false) {
				$(self).data("paused",false);
				};
			});
		};
	$.fn.startslider = $.fn.nerveSlider;
	})(jQuery);
	
(function($) {
	$.fn.nextSlide = function () {
		return $(this).each(function(){
			$(this).find(".ns_nextButton").trigger("click");
			});
		};
	})(jQuery);
	
(function($) {
	$.fn.prevSlide = function () {
		return $(this).each(function(){
			$(this).find(".ns_prevButton").trigger("click");
			});
		};
	})(jQuery);
	
(function($) {
	$.fn.gotoSlide = function (number) {
		var num = number;
		return $(this).each(function(num){
			$(this).find(".ns_dots .ns_dot").eq(number-1).trigger("click");
			});
		};
	})(jQuery);
	
(function($) {
	$.fn.togglePause = function () {
		return $(this).each(function(){
			$(this).find(".ns_pauseButton").trigger("click");
			});
		};
	})(jQuery);
	
(function($) {
	$.fn.fixImages = function () {
		return $(this).each(function(){
			$(this).find(".ns_extras .ns_imgButton").trigger("click");
			});
		};
	})(jQuery);
	
(function($) {
	$.fn.endNerveSlider = function () {
		return $(this).each(function(){
			var me = $(this);
			me.wrap("<div class='ns_parentWriter'></div>");
			me.parent().html(me.data("preservedhtml"));
			var me = $(".ns_parentWriter>div");
			me.unwrap();
			});
		};
	})(jQuery);