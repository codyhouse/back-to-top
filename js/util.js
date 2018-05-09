'use strict';

var util = {
  /**
   * @function
   * @description
   * @param {String}
   * @param {String}
   */
  elementInViewport: function(el, offsetToTop) {
    var top = el.offsetTop,
      left = el.offsetLeft,
      width = el.offsetWidth,
      height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    if (typeof offsetToTop !== 'undefined') {
      top -= offsetToTop;
    }

    if (window.pageXOffset !== null) {
      return (
        top < window.pageYOffset + window.innerHeight &&
        left < window.pageXOffset + window.innerWidth &&
        top + height > window.pageYOffset &&
        left + width > window.pageXOffset
      );
    }

    if (document.compatMode === 'CSS1Compat') {
      return (
        top <
          window.document.documentElement.scrollTop +
            window.document.documentElement.clientHeight &&
        left <
          window.document.documentElement.scrollLeft +
            window.document.documentElement.clientWidth &&
        top + height > window.document.documentElement.scrollTop &&
        left + width > window.document.documentElement.scrollLeft
      );
    }
  },
};

module.exports = util;
