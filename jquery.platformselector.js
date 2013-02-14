/*
 * platformSelector: a jQuery plugin
 *
 * For full documentation, visit:
 * http://github.com/alexrabarts/jquery-platformselector
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function ($) {
  $.extend($, {
    platformSelector: function (options) {
      options = options || {userAgent: navigator.userAgent};

      function uaIs(test) { return ua.indexOf(test) !== -1; }

      function isMobile() {
        var knownMobileDevices = [
          'mobile',
          'ipod',
          'iphone',
          'ipad',
          'android',
          'blackberry',
          'webos',
          'symbian',
          'windows phone',
          'smartphone',
          'j2me'
        ];

        var mobile = false;

        $.each(knownMobileDevices, function () {
          if (uaIs(this)) {
            mobile = true;
            return false;
          }
        });

        return mobile;
      }

      var ua = options.userAgent.toLowerCase();

      var ie = (
        !uaIs('opera') &&
        !uaIs('webtv') &&
        (/msie (\d+)/.test(ua))
      ) ? 'ie ie_' + RegExp.$1 : '';

      var os =
        uaIs('ipod')                   ? 'ios ipod'   :
        uaIs('iphone')                 ? 'ios iphone' :
        uaIs('ipad')                   ? 'ios ipad'   :
        uaIs('android')                ? 'android'    :
        uaIs('blackberry')             ? 'blackberry' :
        uaIs('symbian')                ? 'symbian'    :
        (uaIs('x11') || uaIs('linux')) ? 'linux'      :
        uaIs('mac')                    ? 'mac'        :
        uaIs('win')                    ? 'win'        : '';

      var classNames = [ie, os, 'js'];

      var agents = ua.split(' ');

      if (isMobile()) {
        classNames.push('mobile');
      }

      $.each(agents, function () {
        if (!this.match(/(\w+)\/([^\s]+)/)) {
          return;
        }

        var agent        = RegExp.$1;
        var fullVersion  = RegExp.$2.replace(/[\/\.]/g, '_');
        var majorVersion = fullVersion.replace(/_.*/, '');

        classNames = classNames.concat(
          [agent, agent + '_' + fullVersion, agent + '_' + majorVersion]
        );
      });

      // Safari and Opera split the user agent into Safari/<build> and
      // Version/<version> so rename Version -> (Safari|Opera)
      $.each(['safari', 'opera'], function (index, browser) {
        if (
          $.inArray(browser, classNames) !== -1 &&
          $.inArray('version', classNames) !== -1
        ) {
          classNames = $.map(classNames, function (c) {
            return c.replace('version', browser);
          });
        }
      });

      // Chrome incorrectly identifies itself as Safari
      if ($.inArray('chrome', classNames) !== -1) {
        classNames = $.map(classNames, function (c) {
          return c.match(/^safari/) ? null : c;
        });
      }

      var engineVersion = (
        // From jQuery 1.2.6
        (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0,'0'])[1]
      ).replace(/\./g, '_');

      $.each(['opera', 'applewebkit', 'gecko'], function () {
        if ($.inArray(String(this), classNames) !== -1) {
          classNames.push(this + '_' + engineVersion);
          return false;
        }
      });

      // Deduplicate.  $.unique is only for DOM elements :-(
      var seen = {};
      classNames = $.map(classNames, function (c) {
        // Mozilla so abused it's pretty much useless
        if (seen[c] || c.match(/^mozilla/)) {
          return null;
        } else {
          seen[c] = true;
          return c;
        }
      }).join(' ');

      // Add to the html element now to avoid any FOUC
      var html = $('html');
      html.addClass(classNames);

      $(function () {
        // Remove our platform specific classes
        html.removeClass(classNames);
        
        // Check whether html element had preexisting classes
        if (!html.attr('class'))
          html.removeAttr('class');
        
        // Add our platform specific classes to body
        $('body').addClass(classNames);
      });
    }
  });

  $.platformSelector();
})(jQuery);
