(function ($) {
    $.fn.zcSlide = function(options) {
    	var t = $(this);	
    	var settings = $.extend({
    		delay: 6000,
    		auto: true
    	}, options);

		function findMinWidth() {
			var w = $(t).find('.slide-item').map(function() {
			   return $(this).outerWidth(); 
			}).get();
			return Math.min.apply(null, w);
		}
		function findMinHeight() {
			var h = $(t).find('.slide-item').map(function() {
				return $(this).outerHeight();
			}).get();
			return Math.min.apply(null, h);
		}
    	var minWidth = findMinWidth(),
			minHeight = findMinHeight(),
			slideCount = $(t).find('.slide-item').length,
			wrapperWidth = slideCount * minWidth;
		function setTransformX() {
			var setTx = $(t).find('.slide-wrapper').css('transform').split(', ')[4];
			if (setTx === undefined) {
				setTx = 0;
			}
			setTx = parseInt(setTx);
			return setTx;
		}
		function newTransformX(newTx) {
			if (newTx < (-wrapperWidth + minWidth)) {
				newTx = -wrapperWidth + minWidth;
			}
			if (newTx > 0) {
				newTx = 0;
			}
			return newTx;
		}
		function next() {
			var setX = setTransformX();
			var newX = setX - minWidth;
			move(newX);
		}
		function prev() {
			var setX = setTransformX();
			var newX = minWidth + setX;
			move(newX);
		}
		function move(moveX) {
			var newX = newTransformX(moveX);
			$(t).find('.slide-wrapper').css({'transform': 'translateX(' + newX + 'px)'});
		}
		function loop() {
			var loopInterval = setInterval(function(){
				var setX = setTransformX();
				var newX = setX - minWidth;
				newX = newTransformX(newX);

				if (newX === (-wrapperWidth + minWidth)) {
					newX = 0;
				}
				$(t).find('.slide-wrapper').css({'transform': 'translateX(' + newX + 'px)'});
			}, settings.delay);
			$(t).find('.zc-next, .zc-prev').click(function() {
				clearInterval(loopInterval);
			});
		}
		if (settings.auto === true) {
			loop();
		}
		$(t).find('.slide-container, .slide-item').css({'width': minWidth, 'height': minHeight});
		$(t).find('.slide-wrapper').css({'width': wrapperWidth});
		$(t).find('.zc-next').click(function() {
			next();
		});
		$(t).find('.zc-prev').click(function() {
			prev();
		});
    };
}(jQuery));


$('.layout-flex-slideshow').zcSlide();
