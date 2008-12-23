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
 * @version  0.1
 */

(function ($) {
  function t(str, test) { return str.indexOf(test) !== -1; }
  function uaIs(test) { return t(ua, test); }

  var ua   = navigator.userAgent.toLowerCase();

  var browser =
    (!uaIs('opera') && !uaIs('webtv') && (/msie (\d)/.test(ua))) ? 'ie ie' + RegExp.$1   :
    /opera[\/\s](\d\d?)/.test(ua)                          ? 'opera opera' + RegExp.$1   :
    (/safari/.test(ua) && (/iphone/.test(ua)))             ? 'safari iphone'             :
    (/safari/.test(ua) && (/version\/(\d)/.test(ua)))      ? 'safari safari' + RegExp.$1 :
    uaIs('safari/')                                        ? 'safari'                    :
    /firefox.(\d)/.test(ua)                                ? 'ff ff' + RegExp.$1            : '';

  var os =
    (uaIs('x11') || uaIs('linux')) ? 'linux' :
    uaIs('mac')                    ? 'mac'   :
    uaIs('win')                    ? 'win'   : '';

  var engine =
    t(browser, 'ie')     ? 'trident' :
    t(browser, 'opera')  ? 'opera'   :
    t(browser, 'safari') ? 'webkit'  :
    t(browser, 'ff')     ? 'gecko'   :
    uaIs('trident')      ? 'trident' :
    uaIs('opera')        ? 'opera'   :
    uaIs('webkit')       ? 'webkit'  :
    uaIs('gecko')        ? 'gecko'   : '';

  var engine_version = (
    (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0,'0'])[1] // From jQuery 1.2.6
  ).replace(/\./g, '_');

  var classNames = $.unique([browser, os, engine, engine + engine_version, 'js']).join(' ');

  var html = $('html');
  html.addClass(classNames); // Add to the html element now to avoid any FOUC
  // Move the classes to the body on dom ready since class is not valid on the html element
  $(function () {
    html.removeAttr('class');
    $('body').addClass(classNames);
  });
})(jQuery);
