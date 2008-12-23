/*
 * platformSelector: a jQuery plugin
 *
 * platformSelector is a simple jQuery plugin that adds classes to the body
 * element representing the browser's environment.  It adds classes for browser
 * type, browser version, operating system, rendering engine and JS-enabled.
 *
 * For full documentation, visit:
 * http://github.com/alexrabarts/jquery-platformselector
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008 Stateless Systems (http://statelesssystems.com)
 *
 * @author   Alex Rabarts (alexrabarts -at- gmail -dawt- com)
 * @requires jQuery v1.2 or later
 * @version  0.1.1
 */

(function ($) {
  function t(str, test) { return str.indexOf(test) !== -1; }
  function uaIs(test) { return t(ua, test); }

  var ua = navigator.userAgent.toLowerCase();

  var ie = (!uaIs('opera') && !uaIs('webtv') && (/msie (\d+)/.test(ua))) ? 'ie ie_' + RegExp.$1 : '';

  var os =
    (uaIs('x11') || uaIs('linux')) ? 'linux' :
    uaIs('mac')                    ? 'mac'   :
    uaIs('win')                    ? 'win'   : '';

  var classNames = [ie, os, 'js'];

  var agents = ua.split(' ');

  $.each(agents, function () {
    if (!this.match(/(\w+)\/([^\s]+)/)) {
      return;
    }

    var agent   = RegExp.$1;
    var fullVersion = RegExp.$2.replace(/[\/\.]/g, '_');
    var majorVersion = fullVersion.replace(/_.*/, '');

    classNames  = classNames.concat([agent, agent + '_' + fullVersion, agent + '_' + majorVersion]);
  });

  // Safari splits the user agent into Safairi/<build> and Version/<version> so rename Version -> Safari
  if ($.inArray('safari', classNames) !== -1 && $.inArray('version', classNames) !== -1) {
    classNames = $.map(classNames, function (c) {
      return c.replace('version', 'safari');
    });
  }

  // Chrome incorrectly identifies itself as Safari
  if ($.inArray('chrome', classNames) !== -1) {
    classNames = $.map(classNames, function (c) {
      return c.match(/^safari/) ? null : c;
    });
  }

  var engineVersion = (
    (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0,'0'])[1] // From jQuery 1.2.6
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
    if (seen[c] || c.match(/^mozilla/)) { // Mozilla so abused it's pretty much useless
      return null;
    } else {
      seen[c] = true;
      return c;
    }
  }).join(' ');

  var html = $('html');
  html.addClass(classNames); // Add to the html element now to avoid any FOUC

  $(function () {
    html.removeAttr('class');
    $('body').addClass(classNames);
  });
})(jQuery);
