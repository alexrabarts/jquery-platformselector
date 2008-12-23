# platformSelector: a jQuery plugin

platformSelector is a simple jQuery plugin that adds classes to the body
element representing the browser's environment.  It adds classes for browser
type, browser version, operating system, rendering engine and JS-enabled.

## Usage

There's no need to call a function - just include the plugin and it will
self-execute.

Once installed, you can access the classes via CSS or a script.  For example,
you might want to display some information only to your IE6 users (requesting
they upgrade, perhaps :-).  You could achieve this with the following styles:

  <pre>
    #upgrade { display: none; }
    .ie6 #upgrade { display: block; }
  </pre>

The plugin is also useful for self-documenting CSS hacks. e.g:

  <pre>
    .panel { margin-left: 0; }
    .ie .panel { margin-left: -5px }
  </pre>
  
### Notes on implementation

Obviously the plugin requires JavaScript be enabled in order to work.  Another
limitation is that the implementation relies on parsing of the user agent
string to determine the classes to add.  These limitations mean that the plugin
is not guaranteed to work in all cases.  Additionally, new browser versions or
platforms may break existing functionality.

For these reasons, it is recommended that this plugin <em>only</em> be used for
non-critical functionality and minor CSS tweaks (a few pixels here and there)
If you are experiencing a major CSS display bug then you are much better off
finding the root source of that problem than patching it with this plugin if
at all possible.

### Classes added to <code>body</code>

#### Browsers

<dl>
  <dt><code>ie ie&lt;version&gt;</code></dt>
  <dd>Microsoft Internet Explorer</dd>

  <dt><code>ff ff&lt;version&gt;</code></dt>
  <dd>Mozilla Firefox</dd>

  <dt><code>safari safari&lt;version&gt;</code></dt>
  <dd>Apple Safari</dd>

  <dt><code>safari iphone</code></dt>
  <dd>Apple iPhone</dd>

  <dt><code>opera opera&lt;version&gt;</code></dt>
  <dd>Opera</dd>
</dl>

#### Operating Systems

<dl>
  <dt><code>win</code></dt>
  <dd>Microsoft Windows</dd>

  <dt><code>mac</code></dt>
  <dd>Apple Macintosh</dd>

  <dt><code>linux</code></dt>
  <dd>Linux and UNIX variants</dd>
</dl>

#### Rendering Engine

<dl>
  <dt><code>trident trident&lt;version&gt;</code></dt>
  <dd>Trident (used by Internet Explorer)</dd>

  <dt><code>gecko gecko&lt;version&gt;</code></dt>
  <dd>Gecko (used by Firefox)</dd>

  <dt><code>webkit webkit&lt;version&gt;</code></dt>
  <dd>Webkit (used by Safari)</dd>

  <dt><code>opera opera&lt;version&gt;</code></dt>
  <dd>Opera</dd>
</dl>

#### JavaScript Enabled

The class <code>js</code> is added when the plugin executes.

## Tested On

  * Firefox 2.0.0.4 / Windows 2000
  * Firefox 2.0.0.19 / Ubuntu 8.04 LTS (Hardy Heron)
  * Firefox 3.1 / Windows XP
  * Firefox 1.5 / Windows 2000
  * Opera 10.00 / Ubuntu 8.04 LTS (Hardy Heron)
  * MSIE 6.0 / Windows XP
  * MSIE 7.0 / Windows XP
  * MSIE 8.0 / Windows XP
  * Safari 3.2.1 / Windows XP
  * Opera 9.63 / Windows XP
  * Opera 9.63 / Debian Testing (Lenny)
  * Opera 8.54 / Windows XP
  * Opera 10.00 / Windows XP

# Licensing

Licensed under the MIT:
http://www.opensource.org/licenses/mit-license.php

Copyright (c) 2008 Stateless Systems (http://statelesssystems.com)
