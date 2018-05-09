'use strict';

var util = require('./util');
var $window = $(window);
var conf = {
  backTop: $('.back-to-top'),
  offset: 300,
  offsetOpacity: 1200,
  scrollDuration: 700,
  scrolling: false,
  wrapper: $('.wrapper'),
  footer: $('footer'),
  offsetFooter: 40,
};

var backToTopHandlers = {
  init: function() {
    const _self = this;
    if (conf.backTop.length > 0) {
      _self.backToTopPosition(_self, 12);

      $window.on('resize', function() {
        _self.backToTopPosition(_self, 12);
      });

      //update back to top visibility on scrolling
      $window.on('scroll', function(event) {
        if (!conf.scrolling) {
          conf.scrolling = true;
          !window.requestAnimationFrame
            ? setTimeout(_self.checkBackToTop(), 250)
            : window.requestAnimationFrame(_self.checkBackToTop);
        }
        _self.fixButtonOnFooter();
      });

      //smooth scroll to top
      conf.backTop[0].addEventListener('click', function(event) {
        event.preventDefault();
        !window.requestAnimationFrame
          ? window.scrollTo(0, 0)
          : _self.scrollTop(conf.scrollDuration);
      });
    }
  },

  checkBackToTop: function() {
    var windowTop = window.scrollY || document.documentElement.scrollTop;
    windowTop > conf.offset
      ? conf.backTop.addClass('bttop--show')
      : conf.backTop.removeClass('bttop--show bttop--fade-out');
    windowTop > conf.offsetOpacity && conf.backTop.addClass('bttop--fade-out');

    conf.scrolling = false;
  },

  scrollTop: function(duration) {
    var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;

    Math.easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    var animateScroll = function(timestamp) {
      if (!currentTime) currentTime = timestamp;
      var progress = timestamp - currentTime;
      var val = Math.max(
        Math.easeInOutQuad(progress, start, -start, duration),
        0
      );
      window.scrollTo(0, val);
      if (progress < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
  },

  backToTopPosition: function(_self, parentOffset) {
    if (conf.wrapper.length > 0) {
      var position = conf.wrapper[0].offsetLeft;
      if (parentOffset) {
        position += parentOffset;
      }
      conf.backTop.css({ right: `${position}px` });
    }
  },

  fixButtonOnFooter: function() {
    if (conf.footer.length > 0) {
      if (util.elementInViewport(conf.footer[0])) {
        if (!conf.backTop.hasClass('sticky-back-to-top')) {
          conf.backTop.addClass('sticky-back-to-top');
          var buttonBottom =
            conf.footer[0].offsetTop -
            conf.backTop[0].offsetHeight -
            conf.offsetFooter;
          conf.backTop.css({ top: `${buttonBottom}px` });
        }
      } else {
        conf.backTop.removeClass('sticky-back-to-top');
        conf.backTop.css({ top: '' });
      }
    }
  },
};

module.exports = backToTopHandlers;
