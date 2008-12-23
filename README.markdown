# platformSelector: a jQuery plugin

platformSelector is a simple jQuery plugin that adds classes to the body
element representing the browser's environment.  It adds classes  parsed
from the user agent string, which generally represents informtaiton such
as browser type, browser version, operating system and rendering engine.

## Usage

There's no need to call a function - just include the plugin and it will
self-execute.

Once installed, you can access the classes via CSS or a script.  For example,
you might want to display some information only to your IE6 users (requesting
they upgrade, perhaps :-).  You could achieve this with the following styles:

  <pre>
    #upgrade { display: none; }
    .ie_6 #upgrade { display: block; }
  </pre>

The plugin is also useful for self-documenting CSS hacks. e.g:

  <pre>
    .panel { margin-left: 0; }
    .ie .panel { margin-left: -5px }
  </pre>
  
### Notes on implementation

Obviously the plugin requires JavaScript be enabled in order to work.  Another
limitation is that the implementation relies on parsing of the user agent
string.  These limitations mean that the plugin is not guaranteed to work in
all cases.  Additionally, new browser versions or platforms may break existing
functionality.

For these reasons, it is recommended that this plugin <em>only</em> be used for
non-critical functionality and minor CSS tweaks (a few pixels here and there)
If you are experiencing a major CSS display bug then you are much better off
finding the root source of that problem than patching it with this plugin.

### Examples of Classes Added

The plugin attempts to parse both major and full version numbers, which allows
you to target platforms at various levels of granularity.  The class
<code>js</code> is also always added, indicating that JavaScript is enabled.

<dl>
  <dt>Firefox 3.0.4 / Mac OSX Leopard</dt>
  <dd><code>mac js gecko gecko_2008102920 firefox firefox_3_0_4 firefox_3 gecko_1_9_0_4</code></dd>

  <dt>Safari 3.2 / Mac OSX Leopard</dt>
  <dd><code>mac js applewebkit applewebkit_525_26_2 applewebkit_525 version version_3_2 version_3 safari safari_525_26_12 safari_525</code></dd>

  <dt>Microsoft Internet Explorer 6 / Windows XP</dt>
  <dd><code>ie ie_6 win js</code></dd>

  <dt>Microsoft Internet Explorer 7 / Windows XP</dt>
  <dd><code>ie ie_7 win js</code></dd>

  <dt>Firefox 2.0 / Windows XP</dt>
  <dd><code>win js gecko gecko_20080404 firefox firefox_2_0_0_14 firefox_2 gecko_1_8_1_14</code></dd>

  <dt>Safari 3.2 / Windows XP</dt>
  <dd><code>win js applewebkit applewebkit_525_27_1 applewebkit_525 safari safari_3_2_1 safari_3 safari_525_27_1 safari_525</code></dd>

  <dt>Chrome 1.0 / Windows XP</dt>
  <dd><code>win js applewebkit applewebkit_525_19 applewebkit_525 chrome chrome_1_0_154_36 chrome_1</code></dd>
</dl>

# Licensing

Licensed under the MIT:
http://www.opensource.org/licenses/mit-license.php

Copyright (c) 2008 Stateless Systems (http://statelesssystems.com)
