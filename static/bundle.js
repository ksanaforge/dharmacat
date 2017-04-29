(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
},{"hyphenate-style-name":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;

var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];
},{}],4:[function(require,module,exports){
'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createPrefixer;

var _getBrowserInformation = require('../utils/getBrowserInformation');

var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

var _getPrefixedKeyframes = require('../utils/getPrefixedKeyframes');

var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);

var _capitalizeString = require('../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
    return style;
  };

  return function () {
    /**
    * Instantiante a new prefixer
    * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
    * @param {string} keepUnprefixed - keeps unprefixed properties and values
    */
    function Prefixer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Prefixer);

      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

      this._userAgent = options.userAgent || defaultUserAgent;
      this._keepUnprefixed = options.keepUnprefixed || false;

      if (this._userAgent) {
        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
      }

      // Checks if the userAgent was resolved correctly
      if (this._browserInfo && this._browserInfo.cssPrefix) {
        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
      } else {
        this._useFallback = true;
        return false;
      }

      var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
      if (prefixData) {
        this._requiresPrefix = {};

        for (var property in prefixData) {
          if (prefixData[property] >= this._browserInfo.browserVersion) {
            this._requiresPrefix[property] = true;
          }
        }

        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
      } else {
        this._useFallback = true;
      }

      this._metaData = {
        browserVersion: this._browserInfo.browserVersion,
        browserName: this._browserInfo.browserName,
        cssPrefix: this._browserInfo.cssPrefix,
        jsPrefix: this._browserInfo.jsPrefix,
        keepUnprefixed: this._keepUnprefixed,
        requiresPrefix: this._requiresPrefix
      };
    }

    _createClass(Prefixer, [{
      key: 'prefix',
      value: function prefix(style) {
        // use static prefixer as fallback if userAgent can not be resolved
        if (this._useFallback) {
          return fallback(style);
        }

        // only add prefixes if needed
        if (!this._hasPropsRequiringPrefix) {
          return style;
        }

        return this._prefixStyle(style);
      }
    }, {
      key: '_prefixStyle',
      value: function _prefixStyle(style) {
        for (var property in style) {
          var value = style[property];

          // handle nested objects
          if ((0, _isObject2.default)(value)) {
            style[property] = this.prefix(value);
            // handle array values
          } else if (Array.isArray(value)) {
            var combinedValue = [];

            for (var i = 0, len = value.length; i < len; ++i) {
              var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
              (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
            }

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (combinedValue.length > 0) {
              style[property] = combinedValue;
            }
          } else {
            var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (_processedValue) {
              style[property] = _processedValue;
            }

            // add prefixes to properties
            if (this._requiresPrefix.hasOwnProperty(property)) {
              style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
              if (!this._keepUnprefixed) {
                delete style[property];
              }
            }
          }
        }

        return style;
      }

      /**
      * Returns a prefixed version of the style object using all vendor prefixes
      * @param {Object} styles - Style object that gets prefixed properties added
      * @returns {Object} - Style object with prefixed properties and values
      */

    }], [{
      key: 'prefixAll',
      value: function prefixAll(styles) {
        return fallback(styles);
      }
    }]);

    return Prefixer;
  }();
}
module.exports = exports['default'];
},{"../utils/addNewValuesOnly":31,"../utils/capitalizeString":32,"../utils/getBrowserInformation":33,"../utils/getPrefixedKeyframes":34,"../utils/isObject":36,"../utils/prefixValue":38}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: [],
  prefixMap: { "chrome": { "appearance": 59, "userSelect": 53, "textEmphasisPosition": 59, "textEmphasis": 59, "textEmphasisStyle": 59, "textEmphasisColor": 59, "boxDecorationBreak": 59, "clipPath": 54, "maskImage": 59, "maskMode": 59, "maskRepeat": 59, "maskPosition": 59, "maskClip": 59, "maskOrigin": 59, "maskSize": 59, "maskComposite": 59, "mask": 59, "maskBorderSource": 59, "maskBorderMode": 59, "maskBorderSlice": 59, "maskBorderWidth": 59, "maskBorderOutset": 59, "maskBorderRepeat": 59, "maskBorder": 59, "maskType": 59, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 10.1, "userSelect": 10.1, "backdropFilter": 10.1, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 10.1, "clipPath": 10.1, "maskImage": 10.1, "maskMode": 10.1, "maskRepeat": 10.1, "maskPosition": 10.1, "maskClip": 10.1, "maskOrigin": 10.1, "maskSize": 10.1, "maskComposite": 10.1, "mask": 10.1, "maskBorderSource": 10.1, "maskBorderMode": 10.1, "maskBorderSlice": 10.1, "maskBorderWidth": 10.1, "maskBorderOutset": 10.1, "maskBorderRepeat": 10.1, "maskBorder": 10.1, "maskType": 10.1, "textDecorationStyle": 10.1, "textDecorationSkip": 10.1, "textDecorationLine": 10.1, "textDecorationColor": 10.1, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10.1, "flowInto": 10.1, "flowFrom": 10.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 10.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 54, "userSelect": 54, "textAlignLast": 48, "tabSize": 54, "hyphens": 42, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 44, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 44, "textEmphasis": 44, "textEmphasisStyle": 44, "textEmphasisColor": 44, "boxDecorationBreak": 44, "clipPath": 41, "maskImage": 44, "maskMode": 44, "maskRepeat": 44, "maskPosition": 44, "maskClip": 44, "maskOrigin": 44, "maskSize": 44, "maskComposite": 44, "mask": 44, "maskBorderSource": 44, "maskBorderMode": 44, "maskBorderSlice": 44, "maskBorderWidth": 44, "maskBorderOutset": 44, "maskBorderRepeat": 44, "maskBorder": 44, "maskType": 44, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 15, "wrapFlow": 15, "wrapThrough": 15, "wrapMargin": 15, "scrollSnapType": 15, "scrollSnapPointsX": 15, "scrollSnapPointsY": 15, "scrollSnapDestination": 15, "scrollSnapCoordinate": 15, "hyphens": 15, "flowInto": 15, "flowFrom": 15, "breakBefore": 15, "breakAfter": 15, "breakInside": 15, "regionFragment": 15, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 10, "userSelect": 10, "backdropFilter": 10, "fontKerning": 10, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "boxDecorationBreak": 10, "clipPath": 10, "maskImage": 10, "maskMode": 10, "maskRepeat": 10, "maskPosition": 10, "maskClip": 10, "maskOrigin": 10, "maskSize": 10, "maskComposite": 10, "mask": 10, "maskBorderSource": 10, "maskBorderMode": 10, "maskBorderSlice": 10, "maskBorderWidth": 10, "maskBorderOutset": 10, "maskBorderRepeat": 10, "maskBorder": 10, "maskType": 10, "textSizeAdjust": 10, "textDecorationStyle": 10, "textDecorationSkip": 10, "textDecorationLine": 10, "textDecorationColor": 10, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10, "flowInto": 10, "flowFrom": 10, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 10, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 53, "userSelect": 53, "fontKerning": 4.4, "textEmphasisPosition": 53, "textEmphasis": 53, "textEmphasisStyle": 53, "textEmphasisColor": 53, "boxDecorationBreak": 53, "clipPath": 53, "maskImage": 53, "maskMode": 53, "maskRepeat": 53, "maskPosition": 53, "maskClip": 53, "maskOrigin": 53, "maskSize": 53, "maskComposite": 53, "mask": 53, "maskBorderSource": 53, "maskBorderMode": 53, "maskBorderSlice": 53, "maskBorderWidth": 53, "maskBorderOutset": 53, "maskBorderRepeat": 53, "maskBorder": 53, "maskType": 53, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 53, "breakBefore": 53, "breakInside": 53, "columnCount": 53, "columnFill": 53, "columnGap": 53, "columnRule": 53, "columnRuleColor": 53, "columnRuleStyle": 53, "columnRuleWidth": 53, "columns": 53, "columnSpan": 53, "columnWidth": 53 }, "and_chr": { "appearance": 55, "textEmphasisPosition": 55, "textEmphasis": 55, "textEmphasisStyle": 55, "textEmphasisColor": 55, "boxDecorationBreak": 55, "maskImage": 55, "maskMode": 55, "maskRepeat": 55, "maskPosition": 55, "maskClip": 55, "maskOrigin": 55, "maskSize": 55, "maskComposite": 55, "mask": 55, "maskBorderSource": 55, "maskBorderMode": 55, "maskBorderSlice": 55, "maskBorderWidth": 55, "maskBorderOutset": 55, "maskBorderRepeat": 55, "maskBorder": 55, "maskType": 55, "textDecorationStyle": 55, "textDecorationSkip": 55, "textDecorationLine": 55, "textDecorationColor": 55 }, "and_uc": { "flex": 11, "flexBasis": 11, "flexDirection": 11, "flexGrow": 11, "flexFlow": 11, "flexShrink": 11, "flexWrap": 11, "alignContent": 11, "alignItems": 11, "alignSelf": 11, "justifyContent": 11, "order": 11, "transition": 11, "transitionDelay": 11, "transitionDuration": 11, "transitionProperty": 11, "transitionTimingFunction": 11, "transform": 11, "transformOrigin": 11, "transformOriginX": 11, "transformOriginY": 11, "backfaceVisibility": 11, "perspective": 11, "perspectiveOrigin": 11, "transformStyle": 11, "transformOriginZ": 11, "animation": 11, "animationDelay": 11, "animationDirection": 11, "animationFillMode": 11, "animationDuration": 11, "animationIterationCount": 11, "animationName": 11, "animationPlayState": 11, "animationTimingFunction": 11, "appearance": 11, "userSelect": 11, "fontKerning": 11, "textEmphasisPosition": 11, "textEmphasis": 11, "textEmphasisStyle": 11, "textEmphasisColor": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "filter": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "fontFeatureSettings": 11, "columnCount": 11, "columnFill": 11, "columnGap": 11, "columnRule": 11, "columnRuleColor": 11, "columnRuleStyle": 11, "columnRuleWidth": 11, "columns": 11, "columnSpan": 11, "columnWidth": 11 }, "op_mini": {} }
};
module.exports = exports["default"];
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPrefixer = require('./createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _crossFade = require('./plugins/crossFade');

var _crossFade2 = _interopRequireDefault(_crossFade);

var _filter = require('./plugins/filter');

var _filter2 = _interopRequireDefault(_filter);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _imageSet = require('./plugins/imageSet');

var _imageSet2 = _interopRequireDefault(_imageSet);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

var _static = require('../static');

var _static2 = _interopRequireDefault(_static);

var _dynamicData = require('./dynamicData');

var _dynamicData2 = _interopRequireDefault(_dynamicData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

var Prefixer = (0, _createPrefixer2.default)({
  prefixMap: _dynamicData2.default.prefixMap,
  plugins: plugins
}, _static2.default);
exports.default = Prefixer;
module.exports = exports['default'];
},{"../static":19,"./createPrefixer":5,"./dynamicData":6,"./plugins/crossFade":8,"./plugins/cursor":9,"./plugins/filter":10,"./plugins/flex":11,"./plugins/flexboxOld":12,"./plugins/gradient":13,"./plugins/imageSet":14,"./plugins/position":15,"./plugins/sizing":16,"./plugins/transition":17}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function crossFade(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
    return (0, _getPrefixedValue2.default)(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grabValues = {
  grab: true,
  grabbing: true
};


var zoomValues = {
  'zoom-in': true,
  'zoom-out': true
};

function cursor(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable browser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }

  if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
    return (0, _getPrefixedValue2.default)(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  flex: true,
  'inline-flex': true
};
function flex(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};


var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
var properties = Object.keys(alternativeProps).concat(otherProps);

function flexboxOld(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    delete requiresPrefix[property];

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property];
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
function gradient(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageSet(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
    return (0, _getPrefixedValue2.default)(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function position(property, value, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};

var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

// TODO: chrome & opera support it
function sizing(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":35}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = transition;

var _hyphenateProperty = require('css-in-js-utils/lib/hyphenateProperty');

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};

var requiresPrefixDashCased = void 0;

function transition(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var _ret = function () {
      // memoize the prefix array for later use
      if (!requiresPrefixDashCased) {
        requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
          return (0, _hyphenateProperty2.default)(prop);
        });
      }

      // only split multi values, not cubic beziers
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      requiresPrefixDashCased.forEach(function (prop) {
        multipleValues.forEach(function (val, index) {
          if (val.indexOf(prop) > -1 && prop !== 'order') {
            multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
          }
        });
      });

      return {
        v: multipleValues.join(',')
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/hyphenateProperty":2}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;

var _prefixProperty = require('../utils/prefixProperty');

var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  function prefixAll(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefixAll(value);
        // handle array values
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (_processedValue) {
          style[property] = _processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  }

  return prefixAll;
}
module.exports = exports['default'];
},{"../utils/addNewValuesOnly":31,"../utils/isObject":36,"../utils/prefixProperty":37,"../utils/prefixValue":38}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPrefixer = require('./createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _staticData = require('./staticData');

var _staticData2 = _interopRequireDefault(_staticData);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _crossFade = require('./plugins/crossFade');

var _crossFade2 = _interopRequireDefault(_crossFade);

var _filter = require('./plugins/filter');

var _filter2 = _interopRequireDefault(_filter);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _imageSet = require('./plugins/imageSet');

var _imageSet2 = _interopRequireDefault(_imageSet);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

exports.default = (0, _createPrefixer2.default)({
  prefixMap: _staticData2.default.prefixMap,
  plugins: plugins
});
module.exports = exports['default'];
},{"./createPrefixer":18,"./plugins/crossFade":20,"./plugins/cursor":21,"./plugins/filter":22,"./plugins/flex":23,"./plugins/flexboxOld":24,"./plugins/gradient":25,"./plugins/imageSet":26,"./plugins/position":27,"./plugins/sizing":28,"./plugins/transition":29,"./staticData":30}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: true,
  'inline-flex': true
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value];
  }
}
module.exports = exports['default'];
},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];
},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];
},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = require('css-in-js-utils/lib/hyphenateProperty');

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _capitalizeString = require('../../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap);
    // if the property is already prefixed
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];
},{"../../utils/capitalizeString":32,"css-in-js-utils/lib/hyphenateProperty":2,"css-in-js-utils/lib/isPrefixedValue":3}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: [],
  prefixMap: { "appearance": ["Webkit", "Moz"], "userSelect": ["Webkit", "Moz", "ms"], "textEmphasisPosition": ["Webkit"], "textEmphasis": ["Webkit"], "textEmphasisStyle": ["Webkit"], "textEmphasisColor": ["Webkit"], "boxDecorationBreak": ["Webkit"], "clipPath": ["Webkit"], "maskImage": ["Webkit"], "maskMode": ["Webkit"], "maskRepeat": ["Webkit"], "maskPosition": ["Webkit"], "maskClip": ["Webkit"], "maskOrigin": ["Webkit"], "maskSize": ["Webkit"], "maskComposite": ["Webkit"], "mask": ["Webkit"], "maskBorderSource": ["Webkit"], "maskBorderMode": ["Webkit"], "maskBorderSlice": ["Webkit"], "maskBorderWidth": ["Webkit"], "maskBorderOutset": ["Webkit"], "maskBorderRepeat": ["Webkit"], "maskBorder": ["Webkit"], "maskType": ["Webkit"], "textDecorationStyle": ["Webkit"], "textDecorationSkip": ["Webkit"], "textDecorationLine": ["Webkit"], "textDecorationColor": ["Webkit"], "filter": ["Webkit"], "fontFeatureSettings": ["Webkit"], "breakAfter": ["Webkit", "Moz", "ms"], "breakBefore": ["Webkit", "Moz", "ms"], "breakInside": ["Webkit", "Moz", "ms"], "columnCount": ["Webkit", "Moz"], "columnFill": ["Webkit", "Moz"], "columnGap": ["Webkit", "Moz"], "columnRule": ["Webkit", "Moz"], "columnRuleColor": ["Webkit", "Moz"], "columnRuleStyle": ["Webkit", "Moz"], "columnRuleWidth": ["Webkit", "Moz"], "columns": ["Webkit", "Moz"], "columnSpan": ["Webkit", "Moz"], "columnWidth": ["Webkit", "Moz"], "flex": ["Webkit"], "flexBasis": ["Webkit"], "flexDirection": ["Webkit"], "flexGrow": ["Webkit"], "flexFlow": ["Webkit"], "flexShrink": ["Webkit"], "flexWrap": ["Webkit"], "alignContent": ["Webkit"], "alignItems": ["Webkit"], "alignSelf": ["Webkit"], "justifyContent": ["Webkit"], "order": ["Webkit"], "transform": ["Webkit"], "transformOrigin": ["Webkit"], "transformOriginX": ["Webkit"], "transformOriginY": ["Webkit"], "backfaceVisibility": ["Webkit"], "perspective": ["Webkit"], "perspectiveOrigin": ["Webkit"], "transformStyle": ["Webkit"], "transformOriginZ": ["Webkit"], "animation": ["Webkit"], "animationDelay": ["Webkit"], "animationDirection": ["Webkit"], "animationFillMode": ["Webkit"], "animationDuration": ["Webkit"], "animationIterationCount": ["Webkit"], "animationName": ["Webkit"], "animationPlayState": ["Webkit"], "animationTimingFunction": ["Webkit"], "backdropFilter": ["Webkit"], "fontKerning": ["Webkit"], "scrollSnapType": ["Webkit", "ms"], "scrollSnapPointsX": ["Webkit", "ms"], "scrollSnapPointsY": ["Webkit", "ms"], "scrollSnapDestination": ["Webkit", "ms"], "scrollSnapCoordinate": ["Webkit", "ms"], "shapeImageThreshold": ["Webkit"], "shapeImageMargin": ["Webkit"], "shapeImageOutside": ["Webkit"], "hyphens": ["Webkit", "Moz", "ms"], "flowInto": ["Webkit", "ms"], "flowFrom": ["Webkit", "ms"], "regionFragment": ["Webkit", "ms"], "textAlignLast": ["Moz"], "tabSize": ["Moz"], "wrapFlow": ["ms"], "wrapThrough": ["ms"], "wrapMargin": ["ms"], "gridTemplateColumns": ["ms"], "gridTemplateRows": ["ms"], "gridTemplateAreas": ["ms"], "gridTemplate": ["ms"], "gridAutoColumns": ["ms"], "gridAutoRows": ["ms"], "gridAutoFlow": ["ms"], "grid": ["ms"], "gridRowStart": ["ms"], "gridColumnStart": ["ms"], "gridRowEnd": ["ms"], "gridRow": ["ms"], "gridColumn": ["ms"], "gridColumnEnd": ["ms"], "gridColumnGap": ["ms"], "gridRowGap": ["ms"], "gridArea": ["ms"], "gridGap": ["ms"], "textSizeAdjust": ["Webkit", "ms"], "transitionDelay": ["Webkit"], "transitionDuration": ["Webkit"], "transitionProperty": ["Webkit"], "transitionTimingFunction": ["Webkit"] }
};
module.exports = exports["default"];
},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
module.exports = exports["default"];
},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];
},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBrowserInformation;

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixByBrowser = {
  chrome: 'Webkit',
  safari: 'Webkit',
  ios: 'Webkit',
  android: 'Webkit',
  phantom: 'Webkit',
  opera: 'Webkit',
  webos: 'Webkit',
  blackberry: 'Webkit',
  bada: 'Webkit',
  tizen: 'Webkit',
  chromium: 'Webkit',
  vivaldi: 'Webkit',
  firefox: 'Moz',
  seamoney: 'Moz',
  sailfish: 'Moz',
  msie: 'ms',
  msedge: 'ms'
};


var browserByCanIuseAlias = {
  chrome: 'chrome',
  chromium: 'chrome',
  safari: 'safari',
  firfox: 'firefox',
  msedge: 'edge',
  opera: 'opera',
  vivaldi: 'opera',
  msie: 'ie'
};

function getBrowserName(browserInfo) {
  if (browserInfo.firefox) {
    return 'firefox';
  }

  if (browserInfo.mobile || browserInfo.tablet) {
    if (browserInfo.ios) {
      return 'ios_saf';
    } else if (browserInfo.android) {
      return 'android';
    } else if (browserInfo.opera) {
      return 'op_mini';
    }
  }

  for (var browser in browserByCanIuseAlias) {
    if (browserInfo.hasOwnProperty(browser)) {
      return browserByCanIuseAlias[browser];
    }
  }
}

/**
 * Uses bowser to get default browser browserInformation such as version and name
 * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
 * @param {string} userAgent - userAgent that gets evaluated
 */
function getBrowserInformation(userAgent) {
  var browserInfo = _bowser2.default._detect(userAgent);

  for (var browser in prefixByBrowser) {
    if (browserInfo.hasOwnProperty(browser)) {
      var prefix = prefixByBrowser[browser];

      browserInfo.jsPrefix = prefix;
      browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
      break;
    }
  }

  browserInfo.browserName = getBrowserName(browserInfo);

  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  if (browserInfo.version) {
    browserInfo.browserVersion = parseFloat(browserInfo.version);
  } else {
    browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
  }

  browserInfo.osVersion = parseFloat(browserInfo.osversion);

  // iOS forces all browsers to use Safari under the hood
  // as the Safari version seems to match the iOS version
  // we just explicitely use the osversion instead
  // https://github.com/rofrischmann/inline-style-prefixer/issues/72
  if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
    browserInfo.browserName = 'and_chr';
  }

  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // Samsung browser are basically build on Chrome > 44
  // https://github.com/rofrischmann/inline-style-prefixer/issues/102
  if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
    browserInfo.browserName = 'and_chr';
    browserInfo.browserVersion = 44;
  }

  return browserInfo;
}
module.exports = exports['default'];
},{"bowser":1}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedKeyframes;
function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
  var prefixedKeyframes = 'keyframes';

  if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
    return cssPrefix + prefixedKeyframes;
  }
  return prefixedKeyframes;
}
module.exports = exports['default'];
},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedValue;
function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
  if (keepUnprefixed) {
    return [prefixedValue, value];
  }
  return prefixedValue;
}
module.exports = exports["default"];
},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
module.exports = exports["default"];
},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;

var _capitalizeString = require('./capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];
},{"./capitalizeString":32}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData);

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];
},{}],39:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobx"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["mobx", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["mobxReact"] = factory(require("mobx"), require("react"), require("react-dom"));
	else
		root["mobxReact"] = factory(root["mobx"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PropTypes = exports.propTypes = exports.inject = exports.Provider = exports.useStaticRendering = exports.trackComponents = exports.componentByNodeRegistery = exports.renderReporter = exports.Observer = exports.observer = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _observer = __webpack_require__(1);

	Object.defineProperty(exports, 'observer', {
	  enumerable: true,
	  get: function get() {
	    return _observer.observer;
	  }
	});
	Object.defineProperty(exports, 'Observer', {
	  enumerable: true,
	  get: function get() {
	    return _observer.Observer;
	  }
	});
	Object.defineProperty(exports, 'renderReporter', {
	  enumerable: true,
	  get: function get() {
	    return _observer.renderReporter;
	  }
	});
	Object.defineProperty(exports, 'componentByNodeRegistery', {
	  enumerable: true,
	  get: function get() {
	    return _observer.componentByNodeRegistery;
	  }
	});
	Object.defineProperty(exports, 'trackComponents', {
	  enumerable: true,
	  get: function get() {
	    return _observer.trackComponents;
	  }
	});
	Object.defineProperty(exports, 'useStaticRendering', {
	  enumerable: true,
	  get: function get() {
	    return _observer.useStaticRendering;
	  }
	});

	var _Provider = __webpack_require__(8);

	Object.defineProperty(exports, 'Provider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Provider).default;
	  }
	});

	var _inject = __webpack_require__(6);

	Object.defineProperty(exports, 'inject', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_inject).default;
	  }
	});

	var _mobx = __webpack_require__(2);

	var mobx = _interopRequireWildcard(_mobx);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactNative = __webpack_require__(9);

	var _propTypes = __webpack_require__(10);

	var propTypes = _interopRequireWildcard(_propTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TARGET_LIB_NAME = void 0;
	if (true) TARGET_LIB_NAME = 'mobx-react';
	if (false) TARGET_LIB_NAME = 'mobx-react/native';
	if (false) TARGET_LIB_NAME = 'mobx-react/custom';

	if (!mobx) throw new Error(TARGET_LIB_NAME + ' requires the MobX package');
	if (!_react2.default) throw new Error(TARGET_LIB_NAME + ' requires React to be available');

	if (("browser") === 'browser' && typeof _reactDom.unstable_batchedUpdates === "function") mobx.extras.setReactionScheduler(_reactDom.unstable_batchedUpdates);
	if (false) mobx.extras.setReactionScheduler(_reactNative.unstable_batchedUpdates);

	exports.propTypes = propTypes;
	exports.PropTypes = propTypes;
	exports.default = module.exports;

	/* DevTool support */

	if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ? 'undefined' : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === 'object') {
	  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(module.exports, mobx);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Observer = exports.renderReporter = exports.componentByNodeRegistery = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.trackComponents = trackComponents;
	exports.useStaticRendering = useStaticRendering;
	exports.observer = observer;

	var _mobx = __webpack_require__(2);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _EventEmitter = __webpack_require__(5);

	var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	var _inject = __webpack_require__(6);

	var _inject2 = _interopRequireDefault(_inject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * dev tool support
	 */
	var isDevtoolsEnabled = false;

	var isUsingStaticRendering = false;

	var warnedAboutObserverInjectDeprecation = false;

	// WeakMap<Node, Object>;
	var componentByNodeRegistery = exports.componentByNodeRegistery = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
	var renderReporter = exports.renderReporter = new _EventEmitter2.default();

	function findDOMNode(component) {
	  if (_reactDom2.default) return _reactDom2.default.findDOMNode(component);
	  return null;
	}

	function reportRendering(component) {
	  var node = findDOMNode(component);
	  if (node && componentByNodeRegistery) componentByNodeRegistery.set(node, component);

	  renderReporter.emit({
	    event: 'render',
	    renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
	    totalTime: Date.now() - component.__$mobRenderStart,
	    component: component,
	    node: node
	  });
	}

	function trackComponents() {
	  if (typeof WeakMap === "undefined") throw new Error("[mobx-react] tracking components is not supported in this browser.");
	  if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
	}

	function useStaticRendering(useStaticRendering) {
	  isUsingStaticRendering = useStaticRendering;
	}

	/**
	 * Utilities
	 */

	function patch(target, funcName) {
	  var runMixinFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var base = target[funcName];
	  var mixinFunc = reactiveMixin[funcName];
	  if (!base) {
	    target[funcName] = mixinFunc;
	  } else {
	    target[funcName] = runMixinFirst === true ? function () {
	      mixinFunc.apply(this, arguments);
	      base.apply(this, arguments);
	    } : function () {
	      base.apply(this, arguments);
	      mixinFunc.apply(this, arguments);
	    };
	  }
	}

	function isObjectShallowModified(prev, next) {
	  if (null == prev || null == next || (typeof prev === 'undefined' ? 'undefined' : _typeof(prev)) !== "object" || (typeof next === 'undefined' ? 'undefined' : _typeof(next)) !== "object") {
	    return prev !== next;
	  }
	  var keys = Object.keys(prev);
	  if (keys.length !== Object.keys(next).length) {
	    return true;
	  }
	  var key = void 0;
	  for (var i = keys.length - 1; i >= 0, key = keys[i]; i--) {
	    if (next[key] !== prev[key]) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * ReactiveMixin
	 */
	var reactiveMixin = {
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    if (isUsingStaticRendering === true) return;
	    // Generate friendly name for debugging
	    var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || "<component>";
	    var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;

	    /**
	     * If props are shallowly modified, react will render anyway,
	     * so atom.reportChanged() should not result in yet another re-render
	     */
	    var skipRender = false;
	    /**
	     * forceUpdate will re-assign this.props. We don't want that to cause a loop,
	     * so detect these changes
	     */
	    var isForcingUpdate = false;

	    function makePropertyObservableReference(propName) {
	      var valueHolder = this[propName];
	      var atom = new _mobx.Atom("reactive " + propName);
	      Object.defineProperty(this, propName, {
	        configurable: true, enumerable: true,
	        get: function get() {
	          atom.reportObserved();
	          return valueHolder;
	        },
	        set: function set(v) {
	          if (!isForcingUpdate && isObjectShallowModified(valueHolder, v)) {
	            valueHolder = v;
	            skipRender = true;
	            atom.reportChanged();
	            skipRender = false;
	          } else {
	            valueHolder = v;
	          }
	        }
	      });
	    }

	    // make this.props an observable reference, see #124
	    makePropertyObservableReference.call(this, "props");
	    // make state an observable reference
	    makePropertyObservableReference.call(this, "state");

	    // wire up reactive render
	    var baseRender = this.render.bind(this);
	    var reaction = null;
	    var isRenderingPending = false;

	    var initialRender = function initialRender() {
	      reaction = new _mobx.Reaction(initialName + '#' + rootNodeID + '.render()', function () {
	        if (!isRenderingPending) {
	          // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
	          // This unidiomatic React usage but React will correctly warn about this so we continue as usual
	          // See #85 / Pull #44
	          isRenderingPending = true;
	          if (typeof _this.componentWillReact === "function") _this.componentWillReact(); // TODO: wrap in action?
	          if (_this.__$mobxIsUnmounted !== true) {
	            // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
	            // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
	            // However, people also claim this migth happen during unit tests..
	            var hasError = true;
	            try {
	              isForcingUpdate = true;
	              if (!skipRender) _react2.default.Component.prototype.forceUpdate.call(_this);
	              hasError = false;
	            } finally {
	              isForcingUpdate = false;
	              if (hasError) reaction.dispose();
	            }
	          }
	        }
	      });
	      reactiveRender.$mobx = reaction;
	      _this.render = reactiveRender;
	      return reactiveRender();
	    };

	    var reactiveRender = function reactiveRender() {
	      isRenderingPending = false;
	      var rendering = undefined;
	      reaction.track(function () {
	        if (isDevtoolsEnabled) {
	          _this.__$mobRenderStart = Date.now();
	        }
	        rendering = _mobx.extras.allowStateChanges(false, baseRender);
	        if (isDevtoolsEnabled) {
	          _this.__$mobRenderEnd = Date.now();
	        }
	      });
	      return rendering;
	    };

	    this.render = initialRender;
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (isUsingStaticRendering === true) return;
	    this.render.$mobx && this.render.$mobx.dispose();
	    this.__$mobxIsUnmounted = true;
	    if (isDevtoolsEnabled) {
	      var node = findDOMNode(this);
	      if (node && componentByNodeRegistery) {
	        componentByNodeRegistery.delete(node);
	      }
	      renderReporter.emit({
	        event: 'destroy',
	        component: this,
	        node: node
	      });
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    if (isDevtoolsEnabled) {
	      reportRendering(this);
	    }
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (isDevtoolsEnabled) {
	      reportRendering(this);
	    }
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    if (isUsingStaticRendering) {
	      console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
	    }
	    // update on any state changes (as is the default)
	    if (this.state !== nextState) {
	      return true;
	    }
	    // update if props are shallowly not equal, inspired by PureRenderMixin
	    // we could return just 'false' here, and avoid the `skipRender` checks etc
	    // however, it is nicer if lifecycle events are triggered like usually,
	    // so we return true here if props are shallowly modified.
	    return isObjectShallowModified(this.props, nextProps);
	  }
	};

	/**
	 * Observer function / decorator
	 */
	function observer(arg1, arg2) {
	  if (typeof arg1 === "string") {
	    throw new Error("Store names should be provided as array");
	  }
	  if (Array.isArray(arg1)) {
	    // component needs stores
	    if (!warnedAboutObserverInjectDeprecation) {
	      warnedAboutObserverInjectDeprecation = true;
	      console.warn('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
	    }
	    if (!arg2) {
	      // invoked as decorator
	      return function (componentClass) {
	        return observer(arg1, componentClass);
	      };
	    } else {
	      return _inject2.default.apply(null, arg1)(observer(arg2));
	    }
	  }
	  var componentClass = arg1;

	  if (componentClass.isMobxInjector === true) {
	    console.warn('Mobx observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\'');
	  }

	  // Stateless function component:
	  // If it is function but doesn't seem to be a react class constructor,
	  // wrap it to a react class automatically
	  if (typeof componentClass === "function" && (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !_react2.default.Component.isPrototypeOf(componentClass)) {

	    return observer(_react2.default.createClass({
	      displayName: componentClass.displayName || componentClass.name,
	      propTypes: componentClass.propTypes,
	      contextTypes: componentClass.contextTypes,
	      getDefaultProps: function getDefaultProps() {
	        return componentClass.defaultProps;
	      },
	      render: function render() {
	        return componentClass.call(this, this.props, this.context);
	      }
	    }));
	  }

	  if (!componentClass) {
	    throw new Error("Please pass a valid component to 'observer'");
	  }

	  var target = componentClass.prototype || componentClass;
	  mixinLifecycleEvents(target);
	  componentClass.isMobXReactObserver = true;
	  return componentClass;
	}

	function mixinLifecycleEvents(target) {
	  patch(target, "componentWillMount", true);
	  ["componentDidMount", "componentWillUnmount", "componentDidUpdate"].forEach(function (funcName) {
	    patch(target, funcName);
	  });
	  if (!target.shouldComponentUpdate) {
	    target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
	  }
	}

	// TODO: support injection somehow as well?
	var Observer = exports.Observer = observer(function (_ref) {
	  var children = _ref.children;
	  return children();
	});

	Observer.propTypes = {
	  children: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
	  function EventEmitter() {
	    _classCallCheck(this, EventEmitter);

	    this.listeners = [];
	  }

	  _createClass(EventEmitter, [{
	    key: "on",
	    value: function on(cb) {
	      var _this = this;

	      this.listeners.push(cb);
	      return function () {
	        var index = _this.listeners.indexOf(cb);
	        if (index !== -1) _this.listeners.splice(index, 1);
	      };
	    }
	  }, {
	    key: "emit",
	    value: function emit(data) {
	      this.listeners.forEach(function (fn) {
	        return fn(data);
	      });
	    }
	  }]);

	  return EventEmitter;
	}();

	exports.default = EventEmitter;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = inject;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(7);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _observer = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var injectorContextTypes = {
	  mobxStores: _react.PropTypes.object
	};
	Object.seal(injectorContextTypes);

	var proxiedInjectorProps = {
	  contextTypes: {
	    get: function get() {
	      return injectorContextTypes;
	    },
	    set: function set(_) {
	      console.warn("Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`");
	    },
	    configurable: true,
	    enumerable: false
	  },
	  isMobxInjector: {
	    value: true,
	    writable: true,
	    configurable: true,
	    enumerable: true
	  }
	};

	/**
	 * Store Injection
	 */
	function createStoreInjector(grabStoresFn, component, injectNames) {
	  var displayName = "inject-" + (component.displayName || component.name || component.constructor && component.constructor.name || "Unknown");
	  if (injectNames) displayName += "-with-" + injectNames;

	  var Injector = _react2.default.createClass({
	    displayName: displayName,
	    storeRef: function storeRef(instance) {
	      this.wrappedInstance = instance;
	    },
	    render: function render() {
	      // Optimization: it might be more efficient to apply the mapper function *outside* the render method
	      // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
	      // See this test: 'using a custom injector is not too reactive' in inject.js
	      var newProps = {};
	      for (var key in this.props) {
	        if (this.props.hasOwnProperty(key)) {
	          newProps[key] = this.props[key];
	        }
	      }var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {};
	      for (var _key in additionalProps) {
	        newProps[_key] = additionalProps[_key];
	      }
	      newProps.ref = this.storeRef;

	      return _react2.default.createElement(component, newProps);
	    }
	  });

	  // Static fields from component should be visible on the generated Injector
	  (0, _hoistNonReactStatics2.default)(Injector, component);

	  Injector.wrappedComponent = component;
	  Object.defineProperties(Injector, proxiedInjectorProps);

	  return Injector;
	}

	function grabStoresByName(storeNames) {
	  return function (baseStores, nextProps) {
	    storeNames.forEach(function (storeName) {
	      if (storeName in nextProps) // prefer props over stores
	        return;
	      if (!(storeName in baseStores)) throw new Error("MobX observer: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
	      nextProps[storeName] = baseStores[storeName];
	    });
	    return nextProps;
	  };
	}

	/**
	 * higher order component that injects stores to a child.
	 * takes either a varargs list of strings, which are stores read from the context,
	 * or a function that manually maps the available stores from the context to props:
	 * storesToProps(mobxStores, props, context) => newProps
	 */
	function inject() /* fn(stores, nextProps) or ...storeNames */{
	  var _arguments = arguments;

	  var grabStoresFn = void 0;
	  if (typeof arguments[0] === "function") {
	    grabStoresFn = arguments[0];
	    return function (componentClass) {
	      var injected = createStoreInjector(grabStoresFn, componentClass);
	      injected.isMobxInjector = false; // supress warning
	      // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
	      // see #111
	      injected = (0, _observer.observer)(injected);
	      injected.isMobxInjector = true; // restore warning
	      return injected;
	    };
	  } else {
	    var _ret = function () {
	      var storeNames = [];
	      for (var i = 0; i < _arguments.length; i++) {
	        storeNames[i] = _arguments[i];
	      }grabStoresFn = grabStoresByName(storeNames);
	      return {
	        v: function v(componentClass) {
	          return createStoreInjector(grabStoresFn, componentClass, storeNames.join("-"));
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var specialReactKeys = { children: true, key: true, ref: true };

	var Provider = (_temp = _class = function (_Component) {
	  _inherits(Provider, _Component);

	  function Provider() {
	    _classCallCheck(this, Provider);

	    return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
	  }

	  _createClass(Provider, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.Children.only(this.props.children);
	    }
	  }, {
	    key: "getChildContext",
	    value: function getChildContext() {
	      var stores = {};
	      // inherit stores
	      var baseStores = this.context.mobxStores;
	      if (baseStores) for (var key in baseStores) {
	        stores[key] = baseStores[key];
	      }
	      // add own stores
	      for (var _key in this.props) {
	        if (!specialReactKeys[_key] && _key !== "suppressChangedStoreWarning") stores[_key] = this.props[_key];
	      }return {
	        mobxStores: stores
	      };
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      // Maybe this warning is too aggressive?
	      if (Object.keys(nextProps).length !== Object.keys(this.props).length) console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");
	      if (!nextProps.suppressChangedStoreWarning) for (var key in nextProps) {
	        if (!specialReactKeys[key] && this.props[key] !== nextProps[key]) console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
	      }
	    }
	  }]);

	  return Provider;
	}(_react.Component), _class.contextTypes = {
	  mobxStores: _react.PropTypes.object
	}, _class.childContextTypes = {
	  mobxStores: _react.PropTypes.object.isRequired
	}, _temp);
	exports.default = Provider;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = null


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.objectOrObservableObject = exports.arrayOrObservableArrayOf = exports.arrayOrObservableArray = exports.observableObject = exports.observableMap = exports.observableArrayOf = exports.observableArray = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _mobx = __webpack_require__(2);

	// Copied from React.PropTypes
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
	      rest[_key - 6] = arguments[_key];
	    }

	    return (0, _mobx.untracked)(function () {
	      componentName = componentName || '<<anonymous>>';
	      propFullName = propFullName || propName;
	      if (props[propName] == null) {
	        if (isRequired) {
	          var actual = props[propName] === null ? 'null' : 'undefined';
	          return new Error('The ' + location + ' `' + propFullName + '` is marked as required ' + 'in `' + componentName + '`, but its value is `' + actual + '`.');
	        }
	        return null;
	      } else {
	        return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
	      }
	    });
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	  return chainedCheckType;
	}

	// Copied from React.PropTypes
	function isSymbol(propType, propValue) {
	  // Native Symbol.
	  if (propType === 'symbol') {
	    return true;
	  }

	  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	  if (propValue['@@toStringTag'] === 'Symbol') {
	    return true;
	  }

	  // Fallback for non-spec compliant Symbols which are polyfilled.
	  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	    return true;
	  }

	  return false;
	}

	// Copied from React.PropTypes
	function getPropType(propValue) {
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  if (isSymbol(propType, propValue)) {
	    return 'symbol';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// Copied from React.PropTypes
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
	  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
	    return (0, _mobx.untracked)(function () {
	      if (allowNativeType) {
	        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
	      }
	      var mobxChecker = void 0;
	      switch (mobxType) {
	        case 'Array':
	          mobxChecker = _mobx.isObservableArray;break;
	        case 'Object':
	          mobxChecker = _mobx.isObservableObject;break;
	        case 'Map':
	          mobxChecker = _mobx.isObservableMap;break;
	        default:
	          throw new Error('Unexpected mobxType: ' + mobxType);
	      }
	      var propValue = props[propName];
	      if (!mobxChecker(propValue)) {
	        var preciseType = getPreciseType(propValue);
	        var nativeTypeExpectationMessage = allowNativeType ? ' or javascript `' + mobxType.toLowerCase() + '`' : '';
	        return new Error('Invalid prop `' + propFullName + '` of type `' + preciseType + '` supplied to' + ' `' + componentName + '`, expected `mobx.Observable' + mobxType + '`' + nativeTypeExpectationMessage + '.');
	      }
	      return null;
	    });
	  });
	}

	function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
	  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
	    for (var _len2 = arguments.length, rest = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
	      rest[_key2 - 5] = arguments[_key2];
	    }

	    return (0, _mobx.untracked)(function () {
	      if (typeof typeChecker !== 'function') {
	        return new Error('Property `' + propFullName + '` of component `' + componentName + '` has ' + 'invalid PropType notation.');
	      }
	      var error = createObservableTypeCheckerCreator(allowNativeType, 'Array')(props, propName, componentName);
	      if (error instanceof Error) return error;
	      var propValue = props[propName];
	      for (var i = 0; i < propValue.length; i++) {
	        error = typeChecker.apply(undefined, [propValue, i, componentName, location, propFullName + '[' + i + ']'].concat(rest));
	        if (error instanceof Error) return error;
	      }
	      return null;
	    });
	  });
	}

	var observableArray = exports.observableArray = createObservableTypeCheckerCreator(false, 'Array');
	var observableArrayOf = exports.observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
	var observableMap = exports.observableMap = createObservableTypeCheckerCreator(false, 'Map');
	var observableObject = exports.observableObject = createObservableTypeCheckerCreator(false, 'Object');
	var arrayOrObservableArray = exports.arrayOrObservableArray = createObservableTypeCheckerCreator(true, 'Array');
	var arrayOrObservableArrayOf = exports.arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
	var objectOrObservableObject = exports.objectOrObservableObject = createObservableTypeCheckerCreator(true, 'Object');

/***/ }
/******/ ])
});
;
},{"mobx":40,"react":"react","react-dom":"react-dom"}],40:[function(require,module,exports){
(function (global){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
registerGlobals();
exports.extras = {
    allowStateChanges: allowStateChanges,
    deepEqual: deepEqual,
    getAtom: getAtom,
    getDebugName: getDebugName,
    getDependencyTree: getDependencyTree,
    getAdministration: getAdministration,
    getGlobalState: getGlobalState,
    getObserverTree: getObserverTree,
    isComputingDerivation: isComputingDerivation,
    isSpyEnabled: isSpyEnabled,
    onReactionError: onReactionError,
    resetGlobalState: resetGlobalState,
    shareGlobalState: shareGlobalState,
    spyReport: spyReport,
    spyReportEnd: spyReportEnd,
    spyReportStart: spyReportStart,
    setReactionScheduler: setReactionScheduler
};
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx(module.exports);
}
module.exports.default = module.exports;
var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
    var actionName = (args && args.length === 1) ? args[0] : (value.name || key || "<unnamed action>");
    var wrappedAction = action(actionName, value);
    addHiddenProp(target, key, wrappedAction);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, true);
var boundActionDecorator = createClassPropertyDecorator(function (target, key, value) {
    defineBoundAction(target, key, value);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, false);
var action = function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator(arg1);
    return namedActionDecorator(arg2).apply(null, arguments);
};
exports.action = action;
action.bound = function boundAction(arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
        var action_1 = createAction("<not yet bound action>", arg1);
        action_1.autoBind = true;
        return action_1;
    }
    return boundActionDecorator.apply(null, arguments);
};
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor && typeof descriptor.value === "function") {
            descriptor.value = createAction(name, descriptor.value);
            descriptor.enumerable = false;
            descriptor.configurable = true;
            return descriptor;
        }
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function runInAction(arg1, arg2, arg3) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    var scope = typeof arg1 === "function" ? arg2 : arg3;
    invariant(typeof fn === "function", getMessage("m002"));
    invariant(fn.length === 0, getMessage("m003"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    return executeAction(actionName, fn, scope, undefined);
}
exports.runInAction = runInAction;
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
exports.isAction = isAction;
function defineBoundAction(target, propertyName, fn) {
    var res = function () {
        return executeAction(propertyName, fn, target, arguments);
    };
    res.isMobxAction = true;
    addHiddenProp(target, propertyName, res);
}
function autorun(arg1, arg2, arg3) {
    var name, view, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        view = arg2;
        scope = arg3;
    }
    else {
        name = arg1.name || ("Autorun@" + getNextId());
        view = arg1;
        scope = arg2;
    }
    invariant(typeof view === "function", getMessage("m004"));
    invariant(isAction(view) === false, getMessage("m005"));
    if (scope)
        view = view.bind(scope);
    var reaction = new Reaction(name, function () {
        this.track(reactionRunner);
    });
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
exports.autorun = autorun;
function when(arg1, arg2, arg3, arg4) {
    var name, predicate, effect, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        predicate = arg2;
        effect = arg3;
        scope = arg4;
    }
    else {
        name = ("When@" + getNextId());
        predicate = arg1;
        effect = arg2;
        scope = arg3;
    }
    var disposer = autorun(name, function (r) {
        if (predicate.call(scope)) {
            r.dispose();
            var prevUntracked = untrackedStart();
            effect.call(scope);
            untrackedEnd(prevUntracked);
        }
    });
    return disposer;
}
exports.when = when;
function autorunAsync(arg1, arg2, arg3, arg4) {
    var name, func, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        func = arg2;
        delay = arg3;
        scope = arg4;
    }
    else {
        name = arg1.name || ("AutorunAsync@" + getNextId());
        func = arg1;
        delay = arg2;
        scope = arg3;
    }
    invariant(isAction(func) === false, getMessage("m006"));
    if (delay === void 0)
        delay = 1;
    if (scope)
        func = func.bind(scope);
    var isScheduled = false;
    var r = new Reaction(name, function () {
        if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                if (!r.isDisposed)
                    r.track(reactionRunner);
            }, delay);
        }
    });
    function reactionRunner() { func(r); }
    r.schedule();
    return r.getDisposer();
}
exports.autorunAsync = autorunAsync;
function reaction(expression, effect, arg3) {
    if (arguments.length > 3) {
        fail(getMessage("m007"));
    }
    if (isModifierDescriptor(expression)) {
        fail(getMessage("m008"));
    }
    var opts;
    if (typeof arg3 === "object") {
        opts = arg3;
    }
    else {
        opts = {};
    }
    opts.name = opts.name || expression.name || effect.name || ("Reaction@" + getNextId());
    opts.fireImmediately = arg3 === true || opts.fireImmediately === true;
    opts.delay = opts.delay || 0;
    opts.compareStructural = opts.compareStructural || opts.struct || false;
    effect = action(opts.name, opts.context ? effect.bind(opts.context) : effect);
    if (opts.context) {
        expression = expression.bind(opts.context);
    }
    var firstTime = true;
    var isScheduled = false;
    var nextValue;
    var r = new Reaction(opts.name, function () {
        if (opts.delay < 1) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                reactionRunner();
            }, opts.delay);
        }
    });
    function reactionRunner() {
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var v = expression(r);
            changed = valueDidChange(opts.compareStructural, nextValue, v);
            nextValue = v;
        });
        if (firstTime && opts.fireImmediately)
            effect(nextValue, r);
        if (!firstTime && changed === true)
            effect(nextValue, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
exports.reaction = reaction;
function createComputedDecorator(compareStructural) {
    return createClassPropertyDecorator(function (target, name, _, __, originalDescriptor) {
        invariant(typeof originalDescriptor !== "undefined", getMessage("m009"));
        invariant(typeof originalDescriptor.get === "function", getMessage("m010"));
        var adm = asObservableObject(target, "");
        defineComputedProperty(adm, name, originalDescriptor.get, originalDescriptor.set, compareStructural, false);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined)
            return undefined;
        return observable.get();
    }, function (name, value) {
        this.$mobx.values[name].set(value);
    }, false, false);
}
var computedDecorator = createComputedDecorator(false);
var computedStructDecorator = createComputedDecorator(true);
var computed = (function computed(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        return computedDecorator.apply(null, arguments);
    }
    invariant(typeof arg1 === "function", getMessage("m011"));
    invariant(arguments.length < 3, getMessage("m012"));
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.setter = typeof arg2 === "function" ? arg2 : opts.setter;
    return new ComputedValue(arg1, opts.context, opts.compareStructural || opts.struct || false, opts.name || arg1.name || "", opts.setter);
});
exports.computed = computed;
computed.struct = computedStructDecorator;
function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    var objectCache = {};
    var resetId = globalState.resetId;
    var Transformer = (function (_super) {
        __extends(Transformer, _super);
        function Transformer(sourceIdentifier, sourceObject) {
            var _this = _super.call(this, function () { return transformer(sourceObject); }, undefined, false, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined) || this;
            _this.sourceIdentifier = sourceIdentifier;
            _this.sourceObject = sourceObject;
            return _this;
        }
        Transformer.prototype.onBecomeUnobserved = function () {
            var lastValue = this.value;
            _super.prototype.onBecomeUnobserved.call(this);
            delete objectCache[this.sourceIdentifier];
            if (onCleanup)
                onCleanup(lastValue, this.sourceObject);
        };
        return Transformer;
    }(ComputedValue));
    return function (object) {
        if (resetId !== globalState.resetId) {
            objectCache = {};
            resetId = globalState.resetId;
        }
        var identifier = getMemoizationId(object);
        var reactiveTransformer = objectCache[identifier];
        if (reactiveTransformer)
            return reactiveTransformer.get();
        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
        return reactiveTransformer.get();
    };
}
exports.createTransformer = createTransformer;
function getMemoizationId(object) {
    if (object === null || typeof object !== "object")
        throw new Error("[mobx] transform expected some kind of object, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = getNextId();
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}
function expr(expr, scope) {
    if (!isComputingDerivation())
        console.warn(getMessage("m013"));
    return computed(expr, { context: scope }).get();
}
exports.expr = expr;
function extendObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, deepEnhancer, properties);
}
exports.extendObservable = extendObservable;
function extendShallowObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, referenceEnhancer, properties);
}
exports.extendShallowObservable = extendShallowObservable;
function extendObservableHelper(target, defaultEnhancer, properties) {
    invariant(arguments.length >= 2, getMessage("m014"));
    invariant(typeof target === "object", getMessage("m015"));
    invariant(!(isObservableMap(target)), getMessage("m016"));
    properties.forEach(function (propSet) {
        invariant(typeof propSet === "object", getMessage("m017"));
        invariant(!isObservable(propSet), getMessage("m018"));
    });
    var adm = asObservableObject(target);
    var definedProps = {};
    for (var i = properties.length - 1; i >= 0; i--) {
        var propSet = properties[i];
        for (var key in propSet)
            if (definedProps[key] !== true && hasOwnProperty(propSet, key)) {
                definedProps[key] = true;
                if (target === propSet && !isPropertyConfigurable(target, key))
                    continue;
                var descriptor = Object.getOwnPropertyDescriptor(propSet, key);
                defineObservablePropertyFromDescriptor(adm, key, descriptor, defaultEnhancer);
            }
    }
    return target;
}
function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node))
        result.observers = getObservers(node).map(nodeToObserverTree);
    return result;
}
function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
exports.intercept = intercept;
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}
function isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
exports.isComputed = isComputed;
function isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableArray(value) || isObservableMap(value))
            throw new Error(getMessage("m019"));
        else if (isObservableObject(value)) {
            var o = value.$mobx;
            return o.values && !!o.values[property];
        }
        return false;
    }
    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
}
exports.isObservable = isObservable;
var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var deepStructDecorator = createDecoratorForEnhancer(deepStructEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
function createObservable(v) {
    if (v === void 0) { v = undefined; }
    if (typeof arguments[1] === "string")
        return deepDecorator.apply(null, arguments);
    invariant(arguments.length <= 1, getMessage("m021"));
    invariant(!isModifierDescriptor(v), getMessage("m020"));
    if (isObservable(v))
        return v;
    var res = deepEnhancer(v, undefined, undefined);
    if (res !== v)
        return res;
    return observable.box(v);
}
var IObservableFactories = (function () {
    function IObservableFactories() {
    }
    IObservableFactories.prototype.box = function (value, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("box");
        return new ObservableValue(value, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowBox = function (value, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowBox");
        return new ObservableValue(value, referenceEnhancer, name);
    };
    IObservableFactories.prototype.array = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        return new ObservableArray(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowArray = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowArray");
        return new ObservableArray(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.map = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        return new ObservableMap(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowMap = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowMap");
        return new ObservableMap(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.object = function (props, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("object");
        var res = {};
        asObservableObject(res, name);
        extendObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.shallowObject = function (props, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowObject");
        var res = {};
        asObservableObject(res, name);
        extendShallowObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.ref = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(referenceEnhancer, arguments[0]);
        }
        else {
            return refDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.shallow = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(shallowEnhancer, arguments[0]);
        }
        else {
            return shallowDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.deep = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(deepEnhancer, arguments[0]);
        }
        else {
            return deepDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.struct = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(deepStructEnhancer, arguments[0]);
        }
        else {
            return deepStructDecorator.apply(null, arguments);
        }
    };
    return IObservableFactories;
}());
exports.IObservableFactories = IObservableFactories;
var observable = createObservable;
exports.observable = observable;
Object.keys(IObservableFactories.prototype).forEach(function (key) { return observable[key] = IObservableFactories.prototype[key]; });
observable.deep.struct = observable.struct;
observable.ref.struct = function () {
    if (arguments.length < 2) {
        return createModifierDescriptor(refStructEnhancer, arguments[0]);
    }
    else {
        return refStructDecorator.apply(null, arguments);
    }
};
function incorrectlyUsedAsDecorator(methodName) {
    fail("Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}
function createDecoratorForEnhancer(enhancer) {
    invariant(!!enhancer, ":(");
    return createClassPropertyDecorator(function (target, name, baseValue, _, baseDescriptor) {
        assertPropertyConfigurable(target, name);
        invariant(!baseDescriptor || !baseDescriptor.get, getMessage("m022"));
        var adm = asObservableObject(target, undefined);
        defineObservableProperty(adm, name, baseValue, enhancer);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined)
            return undefined;
        return observable.get();
    }, function (name, value) {
        setPropertyValue(this, name, value);
    }, true, false);
}
function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
exports.observe = observe;
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}
function toJS(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = []; }
    function cache(value) {
        if (detectCycles)
            __alreadySeen.push([source, value]);
        return value;
    }
    if (isObservable(source)) {
        if (detectCycles && __alreadySeen === null)
            __alreadySeen = [];
        if (detectCycles && source !== null && typeof source === "object") {
            for (var i = 0, l = __alreadySeen.length; i < l; i++)
                if (__alreadySeen[i][0] === source)
                    return __alreadySeen[i][1];
        }
        if (isObservableArray(source)) {
            var res = cache([]);
            var toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
            res.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++)
                res[i] = toAdd[i];
            return res;
        }
        if (isObservableObject(source)) {
            var res = cache({});
            for (var key in source)
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
            return res;
        }
        if (isObservableMap(source)) {
            var res_1 = cache({});
            source.forEach(function (value, key) { return res_1[key] = toJS(value, detectCycles, __alreadySeen); });
            return res_1;
        }
        if (isObservableValue(source))
            return toJS(source.get(), detectCycles, __alreadySeen);
    }
    return source;
}
exports.toJS = toJS;
function transaction(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    deprecated(getMessage("m023"));
    return runInTransaction.apply(undefined, arguments);
}
exports.transaction = transaction;
function runInTransaction(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    return executeAction("", action);
}
function log(msg) {
    console.log(msg);
    return msg;
}
function whyRun(thing, prop) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation;
            if (!thing)
                return log(getMessage("m024"));
            break;
        case 2:
            thing = getAtom(thing, prop);
            break;
    }
    thing = getAtom(thing);
    if (isComputedValue(thing))
        return log(thing.whyRun());
    else if (isReaction(thing))
        return log(thing.whyRun());
    return fail(getMessage("m025"));
}
exports.whyRun = whyRun;
function createAction(actionName, fn) {
    invariant(typeof fn === "function", getMessage("m026"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    var res = function () {
        return executeAction(actionName, fn, this, arguments);
    };
    res.originalFn = fn;
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    try {
        return fn.apply(scope, args);
    }
    finally {
        endAction(runInfo);
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled() && !!actionName;
    var startTime = 0;
    if (notifySpy) {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: "action",
            name: actionName,
            fn: fn,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart();
    startBatch();
    var prevAllowStateChanges = allowStateChangesStart(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy)
        spyReportEnd({ time: Date.now() - runInfo.startTime });
}
function useStrict(strict) {
    invariant(globalState.trackingDerivation === null, getMessage("m028"));
    globalState.strictMode = strict;
    globalState.allowStateChanges = !strict;
}
exports.useStrict = useStrict;
function isStrictModeEnabled() {
    return globalState.strictMode;
}
exports.isStrictModeEnabled = isStrictModeEnabled;
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
var BaseAtom = (function () {
    function BaseAtom(name) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        this.name = name;
        this.isPendingUnobservation = true;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    BaseAtom.prototype.onBecomeUnobserved = function () {
    };
    BaseAtom.prototype.reportObserved = function () {
        reportObserved(this);
    };
    BaseAtom.prototype.reportChanged = function () {
        startBatch();
        propagateChanged(this);
        endBatch();
    };
    BaseAtom.prototype.toString = function () {
        return this.name;
    };
    return BaseAtom;
}());
exports.BaseAtom = BaseAtom;
var Atom = (function (_super) {
    __extends(Atom, _super);
    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
        if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.onBecomeObservedHandler = onBecomeObservedHandler;
        _this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
        _this.isPendingUnobservation = false;
        _this.isBeingTracked = false;
        return _this;
    }
    Atom.prototype.reportObserved = function () {
        startBatch();
        _super.prototype.reportObserved.call(this);
        if (!this.isBeingTracked) {
            this.isBeingTracked = true;
            this.onBecomeObservedHandler();
        }
        endBatch();
        return !!globalState.trackingDerivation;
    };
    Atom.prototype.onBecomeUnobserved = function () {
        this.isBeingTracked = false;
        this.onBecomeUnobservedHandler();
    };
    return Atom;
}(BaseAtom));
exports.Atom = Atom;
var isAtom = createInstanceofPredicate("Atom", BaseAtom);
var ComputedValue = (function () {
    function ComputedValue(derivation, scope, compareStructural, name, setter) {
        this.derivation = derivation;
        this.scope = scope;
        this.compareStructural = compareStructural;
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = [];
        this.newObserving = null;
        this.isPendingUnobservation = false;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = undefined;
        this.isComputing = false;
        this.isRunningSetter = false;
        this.name = name || "ComputedValue@" + getNextId();
        if (setter)
            this.setter = createAction(name + "-setter", setter);
    }
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        invariant(this.dependenciesState !== IDerivationState.NOT_TRACKING, getMessage("m029"));
        clearObserving(this);
        this.value = undefined;
    };
    ComputedValue.prototype.get = function () {
        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
        if (globalState.inBatch === 0) {
            startBatch();
            if (shouldCompute(this))
                this.value = this.computeValue(false);
            endBatch();
        }
        else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        var result = this.value;
        if (isCaughtException(result))
            throw result.cause;
        return result;
    };
    ComputedValue.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException(res))
            throw res.cause;
        return res;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled()) {
            spyReport({
                object: this.scope,
                type: "compute",
                fn: this.derivation
            });
        }
        var oldValue = this.value;
        var newValue = this.value = this.computeValue(true);
        return isCaughtException(newValue) || valueDidChange(this.compareStructural, newValue, oldValue);
    };
    ComputedValue.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        }
        else {
            try {
                res = this.derivation.call(this.scope);
            }
            catch (e) {
                res = new CaughtException(e);
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    };
    ;
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    ;
    ComputedValue.prototype.whyRun = function () {
        var isTracking = Boolean(globalState.trackingDerivation);
        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        var observers = unique(getObservers(this).map(function (dep) { return dep.name; }));
        return ("\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n" +
            (this.dependenciesState === IDerivationState.NOT_TRACKING ? getMessage("m032") :
                " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this.isComputing && isTracking) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n"));
    };
    return ComputedValue;
}());
ComputedValue.prototype[primitiveSymbol()] = ComputedValue.prototype.valueOf;
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState;
(function (IDerivationState) {
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
exports.IDerivationState = IDerivationState;
var CaughtException = (function () {
    function CaughtException(cause) {
        this.cause = cause;
    }
    return CaughtException;
}());
function isCaughtException(e) {
    return e instanceof CaughtException;
}
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE: return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE: return true;
        case IDerivationState.POSSIBLY_STALE: {
            var prevUntracked = untrackedStart();
            var obs = derivation.observing, l = obs.length;
            for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue(obj)) {
                    try {
                        obj.get();
                    }
                    catch (e) {
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                    if (derivation.dependenciesState === IDerivationState.STALE) {
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
            return false;
        }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null;
}
function checkIfStateModificationsAreAllowed(atom) {
    var hasObservers = atom.observers.length > 0;
    if (globalState.computationDepth > 0 && hasObservers)
        fail(getMessage("m031") + atom.name);
    if (!globalState.allowStateChanges && hasObservers)
        fail(getMessage(globalState.strictMode ? "m030a" : "m030b") + atom.name);
}
function trackDerivedFunction(derivation, f, context) {
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var result;
    try {
        result = f.call(context);
    }
    catch (e) {
        result = new CaughtException(e);
    }
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
function bindDependencies(derivation) {
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    derivation.newObserving = null;
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
    }
    observing.length = i0;
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
}
function clearObserving(derivation) {
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
    obs.length = 0;
}
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
exports.untracked = untracked;
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}
var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
var MobXGlobals = (function () {
    function MobXGlobals() {
        this.version = 5;
        this.trackingDerivation = null;
        this.computationDepth = 0;
        this.runId = 0;
        this.mobxGuid = 0;
        this.inBatch = 0;
        this.pendingUnobservations = [];
        this.pendingReactions = [];
        this.isRunningReactions = false;
        this.allowStateChanges = true;
        this.strictMode = false;
        this.resetId = 0;
        this.spyListeners = [];
        this.globalReactionErrorHandlers = [];
    }
    return MobXGlobals;
}());
var globalState = new MobXGlobals();
function shareGlobalState() {
    var global = getGlobal();
    var ownState = globalState;
    if (global.__mobservableTrackingStack || global.__mobservableViewStack)
        throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
    if (global.__mobxGlobal && global.__mobxGlobal.version !== ownState.version)
        throw new Error("[mobx] An incompatible version of mobx is already loaded.");
    if (global.__mobxGlobal)
        globalState = global.__mobxGlobal;
    else
        global.__mobxGlobal = ownState;
}
function getGlobalState() {
    return globalState;
}
function registerGlobals() {
}
function resetGlobalState() {
    globalState.resetId++;
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.strictMode;
}
function hasObservers(observable) {
    return observable.observers && observable.observers.length > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function invariantObservers(observable) {
    var list = observable.observers;
    var map = observable.observersIndexes;
    var l = list.length;
    for (var i = 0; i < l; i++) {
        var id = list[i].__mapid;
        if (i) {
            invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list");
        }
        else {
            invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldnt be held in map.");
        }
    }
    invariant(list.length === 0 || Object.keys(map).length === list.length - 1, "INTERNAL ERROR there is no junk in map");
}
function addObserver(observable, node) {
    var l = observable.observers.length;
    if (l) {
        observable.observersIndexes[node.__mapid] = l;
    }
    observable.observers[l] = node;
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
}
function removeObserver(observable, node) {
    if (observable.observers.length === 1) {
        observable.observers.length = 0;
        queueForUnobservation(observable);
    }
    else {
        var list = observable.observers;
        var map_1 = observable.observersIndexes;
        var filler = list.pop();
        if (filler !== node) {
            var index = map_1[node.__mapid] || 0;
            if (index) {
                map_1[filler.__mapid] = index;
            }
            else {
                delete map_1[filler.__mapid];
            }
            list[index] = filler;
        }
        delete map_1[node.__mapid];
    }
}
function queueForUnobservation(observable) {
    if (!observable.isPendingUnobservation) {
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable_1 = list[i];
            observable_1.isPendingUnobservation = false;
            if (observable_1.observers.length === 0) {
                observable_1.onBecomeUnobserved();
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
        }
    }
    else if (observable.observers.length === 0) {
        queueForUnobservation(observable);
    }
}
function invariantLOS(observable, msg) {
    var min = getObservers(observable).reduce(function (a, b) { return Math.min(a, b.dependenciesState); }, 2);
    if (min >= observable.lowestObserverState)
        return;
    throw new Error("lowestObserverState is wrong for " + msg + " because " + min + " < " + observable.lowestObserverState);
}
function propagateChanged(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            d.onBecomeStale();
        d.dependenciesState = IDerivationState.STALE;
    }
}
function propagateChangeConfirmed(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = IDerivationState.STALE;
        else if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            observable.lowestObserverState = IDerivationState.UP_TO_DATE;
    }
}
function propagateMaybeChanged(observable) {
    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            d.onBecomeStale();
        }
    }
}
var Reaction = (function () {
    function Reaction(name, onInvalidate) {
        if (name === void 0) { name = "Reaction@" + getNextId(); }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = [];
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                    spyReport({
                        object: this,
                        type: "scheduled-reaction"
                    });
                }
            }
            endBatch();
        }
    };
    Reaction.prototype.track = function (fn) {
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify) {
            startTime = Date.now();
            spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            clearObserving(this);
        }
        if (isCaughtException(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify) {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this;
        var messageToUser = getMessage("m037");
        console.error(message || messageToUser, error);
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                message: message,
                error: error,
                object: this
            });
        }
        globalState.globalReactionErrorHandlers.forEach(function (f) { return f(error, _this); });
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r.$mobx = this;
        r.onError = registerErrorHandler;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.whyRun = function () {
        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        return ("\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this._isRunning) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n");
    };
    return Reaction;
}());
exports.Reaction = Reaction;
function registerErrorHandler(handler) {
    invariant(this && this.$mobx && isReaction(this.$mobx), "Invalid `this`");
    invariant(!this.$mobx.errorHandler, "Only one onErrorHandler can be registered");
    this.$mobx.errorHandler = handler;
}
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations."
                + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0);
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}
function isSpyEnabled() {
    return !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (!globalState.spyListeners.length)
        return;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    var change = objectAssign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (change)
        spyReport(objectAssign({}, change, END_EVENT));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    globalState.spyListeners.push(listener);
    return once(function () {
        var idx = globalState.spyListeners.indexOf(listener);
        if (idx !== -1)
            globalState.spyListeners.splice(idx, 1);
    });
}
exports.spy = spy;
function hasInterceptors(interceptable) {
    return (interceptable.interceptors && interceptable.interceptors.length > 0);
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors)
            for (var i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
                if (!change)
                    break;
            }
        return change;
    }
    finally {
        untrackedEnd(prevU);
    }
}
function hasListeners(listenable) {
    return listenable.changeListeners && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}
function asReference(value) {
    deprecated("asReference is deprecated, use observable.ref instead");
    return observable.ref(value);
}
exports.asReference = asReference;
function asStructure(value) {
    deprecated("asStructure is deprecated. Use observable.struct, computed.struct or reaction options instead.");
    return observable.struct(value);
}
exports.asStructure = asStructure;
function asFlat(value) {
    deprecated("asFlat is deprecated, use observable.shallow instead");
    return observable.shallow(value);
}
exports.asFlat = asFlat;
function asMap(data) {
    deprecated("asMap is deprecated, use observable.map or observable.shallowMap instead");
    return observable.map(data || {});
}
exports.asMap = asMap;
function isModifierDescriptor(thing) {
    return typeof thing === "object" && thing !== null && thing.isMobxModifierDescriptor === true;
}
exports.isModifierDescriptor = isModifierDescriptor;
function createModifierDescriptor(enhancer, initialValue) {
    invariant(!isModifierDescriptor(initialValue), "Modifiers cannot be nested");
    return {
        isMobxModifierDescriptor: true,
        initialValue: initialValue,
        enhancer: enhancer
    };
}
function deepEnhancer(v, _, name) {
    if (isModifierDescriptor(v))
        fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (isObservable(v))
        return v;
    if (Array.isArray(v))
        return observable.array(v, name);
    if (isPlainObject(v))
        return observable.object(v, name);
    if (isES6Map(v))
        return observable.shallowMap(v, name);
    return v;
}
function shallowEnhancer(v, _, name) {
    if (isModifierDescriptor(v))
        fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (v === undefined || v === null)
        return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v))
        return v;
    if (Array.isArray(v))
        return observable.shallowArray(v, name);
    if (isPlainObject(v))
        return observable.shallowObject(v, name);
    if (isES6Map(v))
        return observable.shallowMap(v, name);
    return fail("The shallow modifier / decorator can only used in combination with arrays, objects and maps");
}
function referenceEnhancer(newValue) {
    return newValue;
}
function deepStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue))
        return oldValue;
    if (isObservable(v))
        return v;
    if (Array.isArray(v))
        return new ObservableArray(v, deepStructEnhancer, name);
    if (isES6Map(v))
        return new ObservableMap(v, deepStructEnhancer, name);
    if (isPlainObject(v)) {
        var res = {};
        asObservableObject(res, name);
        extendObservableHelper(res, deepStructEnhancer, [v]);
        return res;
    }
    return v;
}
function refStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue))
        return oldValue;
    return v;
}
var safariPrototypeSetterInheritanceBug = (function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", { set: function () { v = true; } });
    Object.create(p)["0"] = 1;
    return v === false;
})();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = (function () {
    function StubArray() {
    }
    return StubArray;
}());
StubArray.prototype = [];
var ObservableArrayAdministration = (function () {
    function ObservableArrayAdministration(name, enhancer, array, owned) {
        this.array = array;
        this.owned = owned;
        this.lastKnownLength = 0;
        this.interceptors = null;
        this.changeListeners = null;
        this.atom = new BaseAtom(name || ("ObservableArray@" + getNextId()));
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name + "[..]"); };
    }
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength)
            this.spliceWithArray(currentLength, 0, new Array(newLength - currentLength));
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
        this.lastKnownLength += delta;
        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE)
            reserveArrayBuffer(oldLength + delta + 1);
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this.atom);
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = [];
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.map(function (v) { return _this.enhancer(v, undefined); });
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta);
        var res = (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return res;
        var _a;
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "update",
            index: index, newValue: newValue, oldValue: oldValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "splice",
            index: index, removed: removed, added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    return ObservableArrayAdministration;
}());
var ObservableArray = (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(initialValues, enhancer, name, owned) {
        if (name === void 0) { name = "ObservableArray@" + getNextId(); }
        if (owned === void 0) { owned = false; }
        var _this = _super.call(this) || this;
        var adm = new ObservableArrayAdministration(name, enhancer, _this, owned);
        addHiddenFinalProp(_this, "$mobx", adm);
        if (initialValues && initialValues.length) {
            adm.updateArrayLength(0, initialValues.length);
            adm.values = initialValues.map(function (v) { return enhancer(v, undefined, name + "[..]"); });
            adm.notifyArraySplice(0, adm.values.slice(), EMPTY_ARRAY);
        }
        else {
            adm.values = [];
        }
        if (safariPrototypeSetterInheritanceBug) {
            Object.defineProperty(adm.array, "0", ENTRY_0);
        }
        return _this;
    }
    ObservableArray.prototype.intercept = function (handler) {
        return this.$mobx.intercept(handler);
    };
    ObservableArray.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        return this.$mobx.observe(listener, fireImmediately);
    };
    ObservableArray.prototype.clear = function () {
        return this.splice(0);
    };
    ObservableArray.prototype.concat = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        this.$mobx.atom.reportObserved();
        return Array.prototype.concat.apply(this.peek(), arrays.map(function (a) { return isObservableArray(a) ? a.peek() : a; }));
    };
    ObservableArray.prototype.replace = function (newItems) {
        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
    };
    ObservableArray.prototype.toJS = function () {
        return this.slice();
    };
    ObservableArray.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableArray.prototype.peek = function () {
        return this.$mobx.values;
    };
    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        this.$mobx.atom.reportObserved();
        var items = this.$mobx.values, l = items.length;
        for (var i = fromIndex; i < l; i++)
            if (predicate.call(thisArg, items[i], i, this))
                return items[i];
        return undefined;
    };
    ObservableArray.prototype.splice = function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return this.$mobx.spliceWithArray(index);
            case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
        }
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.pop = function () {
        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
    };
    ObservableArray.prototype.shift = function () {
        return this.splice(0, 1)[0];
    };
    ObservableArray.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.reverse = function () {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    };
    ObservableArray.prototype.remove = function (value) {
        var idx = this.$mobx.values.indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.move = function (fromIndex, toIndex) {
        function checkIndex(index) {
            if (index < 0) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
            }
            var length = this.$mobx.values.length;
            if (index >= length) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
            }
        }
        checkIndex.call(this, fromIndex);
        checkIndex.call(this, toIndex);
        if (fromIndex === toIndex) {
            return;
        }
        var oldItems = this.$mobx.values;
        var newItems;
        if (fromIndex < toIndex) {
            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
        }
        else {
            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
        }
        this.replace(newItems);
    };
    ObservableArray.prototype.toString = function () {
        this.$mobx.atom.reportObserved();
        return Array.prototype.toString.apply(this.$mobx.values, arguments);
    };
    ObservableArray.prototype.toLocaleString = function () {
        this.$mobx.atom.reportObserved();
        return Array.prototype.toLocaleString.apply(this.$mobx.values, arguments);
    };
    return ObservableArray;
}(StubArray));
declareIterator(ObservableArray.prototype, function () {
    return arrayAsIterator(this.slice());
});
makeNonEnumerable(ObservableArray.prototype, [
    "constructor",
    "intercept",
    "observe",
    "clear",
    "concat",
    "replace",
    "toJS",
    "toJSON",
    "peek",
    "find",
    "splice",
    "push",
    "pop",
    "shift",
    "unshift",
    "reverse",
    "sort",
    "remove",
    "move",
    "toString",
    "toLocaleString"
]);
Object.defineProperty(ObservableArray.prototype, "length", {
    enumerable: false,
    configurable: true,
    get: function () {
        return this.$mobx.getArrayLength();
    },
    set: function (newLength) {
        this.$mobx.setArrayLength(newLength);
    }
});
[
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some"
].forEach(function (funcName) {
    var baseFunc = Array.prototype[funcName];
    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
    addHiddenProp(ObservableArray.prototype, funcName, function () {
        this.$mobx.atom.reportObserved();
        return baseFunc.apply(this.$mobx.values, arguments);
    });
});
var ENTRY_0 = {
    configurable: true,
    enumerable: false,
    set: createArraySetter(0),
    get: createArrayGetter(0)
};
function createArrayBufferItem(index) {
    var set = createArraySetter(index);
    var get = createArrayGetter(index);
    Object.defineProperty(ObservableArray.prototype, "" + index, {
        enumerable: false,
        configurable: true,
        set: set, get: get
    });
}
function createArraySetter(index) {
    return function (newValue) {
        var adm = this.$mobx;
        var values = adm.values;
        if (index < values.length) {
            checkIfStateModificationsAreAllowed(adm.atom);
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: adm.array,
                    index: index, newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values.length) {
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
    };
}
function createArrayGetter(index) {
    return function () {
        var impl = this.$mobx;
        if (impl) {
            if (index < impl.values.length) {
                impl.atom.reportObserved();
                return impl.values[index];
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    };
}
function reserveArrayBuffer(max) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
        createArrayBufferItem(index);
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
}
reserveArrayBuffer(1000);
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
}
exports.isObservableArray = isObservableArray;
var ObservableMapMarker = {};
var ObservableMap = (function () {
    function ObservableMap(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer; }
        if (name === void 0) { name = "ObservableMap@" + getNextId(); }
        this.enhancer = enhancer;
        this.name = name;
        this.$mobx = ObservableMapMarker;
        this._data = {};
        this._hasMap = {};
        this._keys = new ObservableArray(undefined, referenceEnhancer, this.name + ".keys()", true);
        this.interceptors = null;
        this.changeListeners = null;
        this.merge(initialData);
    }
    ObservableMap.prototype._has = function (key) {
        return typeof this._data[key] !== "undefined";
    };
    ObservableMap.prototype.has = function (key) {
        if (!this.isValidKey(key))
            return false;
        key = "" + key;
        if (this._hasMap[key])
            return this._hasMap[key].get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        this.assertValidKey(key);
        key = "" + key;
        var hasKey = this._has(key);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        this.assertValidKey(key);
        key = "" + key;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "delete",
                object: this,
                oldValue: this._data[key].value,
                name: key
            } : null;
            if (notifySpy)
                spyReportStart(change);
            runInTransaction(function () {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable = _this._data[key];
                observable.setNewValue(undefined);
                _this._data[key] = undefined;
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        var entry = this._hasMap[key];
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = this._hasMap[key] = new ObservableValue(value, referenceEnhancer, this.name + "." + key + "?", false);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (name, newValue) {
        var observable = this._data[name];
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "update",
                object: this,
                oldValue: observable.value,
                name: name, newValue: newValue
            } : null;
            if (notifySpy)
                spyReportStart(change);
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (name, newValue) {
        var _this = this;
        runInTransaction(function () {
            var observable = _this._data[name] = new ObservableValue(newValue, _this.enhancer, _this.name + "." + name, false);
            newValue = observable.value;
            _this._updateHasMapEntry(name, true);
            _this._keys.push(name);
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: "add",
            object: this,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        key = "" + key;
        if (this.has(key))
            return this._data[key].get();
        return undefined;
    };
    ObservableMap.prototype.keys = function () {
        return arrayAsIterator(this._keys.slice());
    };
    ObservableMap.prototype.values = function () {
        return arrayAsIterator(this._keys.map(this.get, this));
    };
    ObservableMap.prototype.entries = function () {
        var _this = this;
        return arrayAsIterator(this._keys.map(function (key) { return [key, _this.get(key)]; }));
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.keys().forEach(function (key) { return callback.call(thisArg, _this.get(key), key, _this); });
    };
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        runInTransaction(function () {
            if (isPlainObject(other))
                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
            else if (Array.isArray(other))
                other.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    return _this.set(key, value);
                });
            else if (isES6Map(other))
                other.forEach(function (value, key) { return _this.set(key, value); });
            else if (other !== null && other !== undefined)
                fail("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        runInTransaction(function () {
            untracked(function () {
                _this.keys().forEach(_this.delete, _this);
            });
        });
    };
    ObservableMap.prototype.replace = function (values) {
        var _this = this;
        runInTransaction(function () {
            _this.clear();
            _this.merge(values);
        });
        return this;
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.toJS = function () {
        var _this = this;
        var res = {};
        this.keys().forEach(function (key) { return res[key] = _this.get(key); });
        return res;
    };
    ObservableMap.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableMap.prototype.isValidKey = function (key) {
        if (key === null || key === undefined)
            return false;
        if (typeof key === "string" || typeof key === "number" || typeof key === "boolean")
            return true;
        return false;
    };
    ObservableMap.prototype.assertValidKey = function (key) {
        if (!this.isValidKey(key))
            throw new Error("[mobx.map] Invalid key: '" + key + "', only strings, numbers and booleans are accepted as key in observable maps.");
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + "[{ " + this.keys().map(function (key) { return key + ": " + ("" + _this.get(key)); }).join(", ") + " }]";
    };
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        invariant(fireImmediately !== true, getMessage("m033"));
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}());
exports.ObservableMap = ObservableMap;
declareIterator(ObservableMap.prototype, function () {
    return this.entries();
});
function map(initialValues) {
    deprecated("`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead");
    return observable.map(initialValues);
}
exports.map = map;
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
exports.isObservableMap = isObservableMap;
var ObservableObjectAdministration = (function () {
    function ObservableObjectAdministration(target, name) {
        this.target = target;
        this.name = name;
        this.values = {};
        this.changeListeners = null;
        this.interceptors = null;
    }
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableObjectAdministration;
}());
function asObservableObject(target, name) {
    if (isObservableObject(target))
        return target.$mobx;
    invariant(Object.isExtensible(target), getMessage("m035"));
    if (!isPlainObject(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name)
        name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, name);
    addHiddenFinalProp(target, "$mobx", adm);
    return adm;
}
function defineObservablePropertyFromDescriptor(adm, propName, descriptor, defaultEnhancer) {
    if (adm.values[propName]) {
        invariant("value" in descriptor, "The property " + propName + " in " + adm.name + " is already observable, cannot redefine it as computed property");
        adm.target[propName] = descriptor.value;
        return;
    }
    if ("value" in descriptor) {
        if (isModifierDescriptor(descriptor.value)) {
            var modifierDescriptor = descriptor.value;
            defineObservableProperty(adm, propName, modifierDescriptor.initialValue, modifierDescriptor.enhancer);
        }
        else if (isAction(descriptor.value) && descriptor.value.autoBind === true) {
            defineBoundAction(adm.target, propName, descriptor.value.originalFn);
        }
        else if (isComputedValue(descriptor.value)) {
            defineComputedPropertyFromComputedValue(adm, propName, descriptor.value);
        }
        else {
            defineObservableProperty(adm, propName, descriptor.value, defaultEnhancer);
        }
    }
    else {
        defineComputedProperty(adm, propName, descriptor.get, descriptor.set, false, true);
    }
}
function defineObservableProperty(adm, propName, newValue, enhancer) {
    assertPropertyConfigurable(adm.target, propName);
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            object: adm.target,
            name: propName,
            type: "add",
            newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    var observable = adm.values[propName] = new ObservableValue(newValue, enhancer, adm.name + "." + propName, false);
    newValue = observable.value;
    Object.defineProperty(adm.target, propName, generateObservablePropConfig(propName));
    notifyPropertyAddition(adm, adm.target, propName, newValue);
}
function defineComputedProperty(adm, propName, getter, setter, compareStructural, asInstanceProperty) {
    if (asInstanceProperty)
        assertPropertyConfigurable(adm.target, propName);
    adm.values[propName] = new ComputedValue(getter, adm.target, compareStructural, adm.name + "." + propName, setter);
    if (asInstanceProperty) {
        Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
    }
}
function defineComputedPropertyFromComputedValue(adm, propName, computedValue) {
    var name = adm.name + "." + propName;
    computedValue.name = name;
    if (!computedValue.scope)
        computedValue.scope = adm.target;
    adm.values[propName] = computedValue;
    Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
}
var observablePropertyConfigs = {};
var computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            setPropertyValue(this, propName, v);
        }
    });
}
function generateComputedPropConfig(propName) {
    return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            return this.$mobx.values[propName].set(v);
        }
    });
}
function setPropertyValue(instance, name, newValue) {
    var adm = instance.$mobx;
    var observable = adm.values[name];
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            type: "update",
            object: instance,
            name: name, newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    newValue = observable.prepareNewValue(newValue);
    if (newValue !== UNCHANGED) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: "update",
            object: instance,
            oldValue: observable.value,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        observable.setNewValue(newValue);
        if (notify)
            notifyListeners(adm, change);
        if (notifySpy)
            spyReportEnd();
    }
}
function notifyPropertyAddition(adm, object, name, newValue) {
    var notify = hasListeners(adm);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
        type: "add",
        object: object, name: name, newValue: newValue
    } : null;
    if (notifySpy)
        spyReportStart(change);
    if (notify)
        notifyListeners(adm, change);
    if (notifySpy)
        spyReportEnd();
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        runLazyInitializers(thing);
        return isObservableObjectAdministration(thing.$mobx);
    }
    return false;
}
exports.isObservableObject = isObservableObject;
var UNCHANGED = {};
var ObservableValue = (function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, enhancer, name, notifySpy) {
        if (name === void 0) { name = "ObservableValue@" + getNextId(); }
        if (notifySpy === void 0) { notifySpy = true; }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.hasUnreportedChange = false;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled()) {
            spyReport({ type: "create", object: _this, newValue: _this.value });
        }
        return _this;
    }
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy) {
                spyReportStart({
                    type: "update",
                    object: this,
                    newValue: newValue, oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
            if (!change)
                return UNCHANGED;
            newValue = change.newValue;
        }
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.value !== newValue
            ? newValue
            : UNCHANGED;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
                type: "update",
                object: this,
                newValue: newValue,
                oldValue: oldValue
            });
        }
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.value;
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    return ObservableValue;
}(BaseAtom));
ObservableValue.prototype[primitiveSymbol()] = ObservableValue.prototype.valueOf;
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
exports.isBoxedObservable = isObservableValue;
function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, getMessage("m036"));
            return thing.$mobx.atom;
        }
        if (isObservableMap(thing)) {
            var anyThing = thing;
            if (property === undefined)
                return getAtom(anyThing._keys);
            var observable_2 = anyThing._data[property] || anyThing._hasMap[property];
            invariant(!!observable_2, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable_2;
        }
        runLazyInitializers(thing);
        if (isObservableObject(thing)) {
            if (!property)
                return fail("please specify a property");
            var observable_3 = thing.$mobx.values[property];
            invariant(!!observable_3, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable_3;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            return thing.$mobx;
        }
    }
    return fail("Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    invariant(thing, "Expecting some object");
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing))
        return thing;
    runLazyInitializers(thing);
    if (thing.$mobx)
        return thing.$mobx;
    invariant(false, "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing);
    return named.name;
}
function createClassPropertyDecorator(onInitialize, get, set, enumerable, allowCustomArguments) {
    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
        if (argLen === void 0) { argLen = 0; }
        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
        if (!descriptor) {
            var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function () {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true)
                        typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
                    }
                    else {
                        set.call(this, key, v);
                    }
                }
            };
            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
                Object.defineProperty(target, key, newDescriptor);
            }
            return newDescriptor;
        }
        else {
            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(target, "__mobxLazyInitializers", (target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice()) || []);
            }
            var value_1 = descriptor.value, initializer_1 = descriptor.initializer;
            target.__mobxLazyInitializers.push(function (instance) {
                onInitialize(instance, key, (initializer_1 ? initializer_1.call(instance) : value_1), customArgs, descriptor);
            });
            return {
                enumerable: enumerable, configurable: true,
                get: function () {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    set.call(this, key, v);
                }
            };
        }
    }
    if (allowCustomArguments) {
        return function () {
            if (quacksLikeADecorator(arguments))
                return classPropertyDecorator.apply(null, arguments);
            var outerArgs = arguments;
            var argLen = arguments.length;
            return function (target, key, descriptor) { return classPropertyDecorator(target, key, descriptor, outerArgs, argLen); };
        };
    }
    return classPropertyDecorator;
}
function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
    if (!hasOwnProperty(instance, "__mobxInitializedProps"))
        addHiddenProp(instance, "__mobxInitializedProps", {});
    instance.__mobxInitializedProps[key] = true;
    onInitialize(instance, key, v, customArgs, baseDescriptor);
}
function runLazyInitializers(instance) {
    if (instance.__mobxDidRunLazyInitializers === true)
        return;
    if (instance.__mobxLazyInitializers) {
        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) { return initializer(instance); });
    }
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
}
function iteratorSymbol() {
    return (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
}
var IS_ITERATING_MARKER = "__$$iterating";
function arrayAsIterator(array) {
    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
    var idx = -1;
    addHiddenFinalProp(array, "next", function next() {
        idx++;
        return {
            done: idx >= this.length,
            value: idx < this.length ? this[idx] : undefined
        };
    });
    return array;
}
function declareIterator(prototType, iteratorFactory) {
    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
}
var messages = {
    "m001": "It is not allowed to assign new values to @action fields",
    "m002": "`runInAction` expects a function",
    "m003": "`runInAction` expects a function without arguments",
    "m004": "autorun expects a function",
    "m005": "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m006": "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m007": "reaction only accepts 2 or 3 arguments. If migrating from MobX 2, please provide an options object",
    "m008": "wrapping reaction expression in `asReference` is no longer supported, use options object instead",
    "m009": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.",
    "m010": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'",
    "m011": "First argument to `computed` should be an expression. If using computed as decorator, don't pass it arguments",
    "m012": "computed takes one or two arguments if used as function",
    "m013": "[mobx.expr] 'expr' should only be used inside other reactive functions.",
    "m014": "extendObservable expected 2 or more arguments",
    "m015": "extendObservable expects an object as first argument",
    "m016": "extendObservable should not be used on maps, use map.merge instead",
    "m017": "all arguments of extendObservable should be objects",
    "m018": "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540",
    "m019": "[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.",
    "m020": "modifiers can only be used for individual object properties",
    "m021": "observable expects zero or one arguments",
    "m022": "@observable can not be used on getters, use @computed instead",
    "m023": "Using `transaction` is deprecated, use `runInAction` or `(@)action` instead.",
    "m024": "whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested its value.",
    "m025": "whyRun can only be used on reactions and computed values",
    "m026": "`action` can only be invoked on functions",
    "m028": "It is not allowed to set `useStrict` when a derivation is running",
    "m029": "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row",
    "m030a": "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: ",
    "m030b": "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ",
    "m031": "Computed values are not allowed to not cause side effects by changing observables that are already being observed. Tried to modify: ",
    "m032": "* This computation is suspended (not in use by any reaction) and won't run automatically.\n	Didn't expect this computation to be suspended at this point?\n	  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n	  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).",
    "m033": "`observe` doesn't support the fire immediately property for observable maps.",
    "m034": "`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead",
    "m035": "Cannot make the designated object observable; it is not extensible",
    "m036": "It is not possible to get index atoms from arrays",
    "m037": "Hi there! I'm sorry you have just run into an exception.\nIf your debugger ends up here, know that some reaction (like the render() of an observer component, autorun or reaction)\nthrew an exception and that mobx caught it, to avoid that it brings the rest of your application down.\nThe original cause of the exception (the code that caused this reaction to run (again)), is still in the stack.\n\nHowever, more interesting is the actual stack trace of the error itself.\nHopefully the error is an instanceof Error, because in that case you can inspect the original stack of the error from where it was thrown.\nSee `error.stack` property, or press the very subtle \"(...)\" link you see near the console.error message that probably brought you here.\nThat stack is more interesting than the stack of this console.error itself.\n\nIf the exception you see is an exception you created yourself, make sure to use `throw new Error(\"Oops\")` instead of `throw \"Oops\"`,\nbecause the javascript environment will only preserve the original stack trace in the first form.\n\nYou can also make sure the debugger pauses the next time this very same exception is thrown by enabling \"Pause on caught exception\".\n(Note that it might pause on many other, unrelated exception as well).\n\nIf that all doesn't help you out, feel free to open an issue https://github.com/mobxjs/mobx/issues!\n",
    "m038": "Missing items in this list?\n    1. Check whether all used values are properly marked as observable (use isObservable to verify)\n    2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n"
};
function getMessage(id) {
    return messages[id];
}
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function getGlobal() {
    return global;
}
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail(message, thing) {
    invariant(false, message, thing);
    throw "X";
}
function invariant(check, message, thing) {
    if (!check)
        throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
}
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
function once(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function () { };
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function joinStrings(things, limit, separator) {
    if (limit === void 0) { limit = 100; }
    if (separator === void 0) { separator = " - "; }
    if (!things)
        return "";
    var sliced = things.slice(0, limit);
    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function objectAssign() {
    var res = arguments[0];
    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        for (var key in source)
            if (hasOwnProperty(source, key)) {
                res[key] = source[key];
            }
    }
    return res;
}
function valueDidChange(compareStructural, oldValue, newValue) {
    if (typeof oldValue === 'number' && isNaN(oldValue)) {
        return typeof newValue !== 'number' || !isNaN(newValue);
    }
    return compareStructural
        ? !deepEqual(oldValue, newValue)
        : oldValue !== newValue;
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName);
}
function makeNonEnumerable(object, propNames) {
    for (var i = 0; i < propNames.length; i++) {
        addHiddenProp(object, propNames[i], object[propNames[i]]);
    }
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable(object, prop) {
    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
}
function getEnumerableKeys(obj) {
    var res = [];
    for (var key in obj)
        res.push(key);
    return res;
}
function deepEqual(a, b) {
    if (a === null && b === null)
        return true;
    if (a === undefined && b === undefined)
        return true;
    if (typeof a !== "object")
        return a === b;
    var aIsArray = isArrayLike(a);
    var aIsMap = isMapLike(a);
    if (aIsArray !== isArrayLike(b)) {
        return false;
    }
    else if (aIsMap !== isMapLike(b)) {
        return false;
    }
    else if (aIsArray) {
        if (a.length !== b.length)
            return false;
        for (var i = a.length - 1; i >= 0; i--)
            if (!deepEqual(a[i], b[i]))
                return false;
        return true;
    }
    else if (aIsMap) {
        if (a.size !== b.size)
            return false;
        var equals_1 = true;
        a.forEach(function (value, key) {
            equals_1 = equals_1 && deepEqual(b.get(key), value);
        });
        return equals_1;
    }
    else if (typeof a === "object" && typeof b === "object") {
        if (a === null || b === null)
            return false;
        if (isMapLike(a) && isMapLike(b)) {
            if (a.size !== b.size)
                return false;
            return deepEqual(observable.shallowMap(a).entries(), observable.shallowMap(b).entries());
        }
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length)
            return false;
        for (var prop in a) {
            if (!(prop in b))
                return false;
            if (!deepEqual(a[prop], b[prop]))
                return false;
        }
        return true;
    }
    return false;
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
exports.isArrayLike = isArrayLike;
function isMapLike(x) {
    return isES6Map(x) || isObservableMap(x);
}
function isES6Map(thing) {
    if (getGlobal().Map !== undefined && thing instanceof getGlobal().Map)
        return true;
    return false;
}
function primitiveSymbol() {
    return (typeof Symbol === "function" && Symbol.toPrimitive) || "@@toPrimitive";
}
function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? ("" + value) : value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],41:[function(require,module,exports){
var SplitPane = require('./lib/SplitPane');

module.exports = SplitPane;

},{"./lib/SplitPane":44}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

var Pane = function (_React$Component) {
    _inherits(Pane, _React$Component);

    function Pane(props) {
        _classCallCheck(this, Pane);

        var _this = _possibleConstructorReturn(this, (Pane.__proto__ || Object.getPrototypeOf(Pane)).call(this, props));

        _this.state = { size: _this.props.size };
        return _this;
    }

    _createClass(Pane, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                prefixer = _props.prefixer,
                split = _props.split,
                styleProps = _props.style;
            var size = this.state.size;

            var classes = ['Pane', split, className];

            var style = _extends({}, styleProps || {}, {
                flex: 1,
                position: 'relative',
                outline: 'none'
            });

            if (size !== undefined) {
                if (split === 'vertical') {
                    style.width = size;
                } else {
                    style.height = size;
                    style.display = 'flex';
                }
                style.flex = 'none';
            }

            return _react2.default.createElement('div', { className: classes.join(' '), style: prefixer.prefix(style) }, children);
        }
    }]);

    return Pane;
}(_react2.default.Component);

Pane.propTypes = {
    className: _react2.default.PropTypes.string.isRequired,
    children: _react2.default.PropTypes.node.isRequired,
    prefixer: _react2.default.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
    size: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    split: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']),
    style: _reactStyleProptype2.default
};

Pane.defaultProps = {
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT })
};

exports.default = Pane;
module.exports = exports['default'];

},{"inline-style-prefixer":7,"react":"react","react-style-proptype":46}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

var Resizer = function (_React$Component) {
    _inherits(Resizer, _React$Component);

    function Resizer() {
        _classCallCheck(this, Resizer);

        return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
    }

    _createClass(Resizer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                _onClick = _props.onClick,
                _onDoubleClick = _props.onDoubleClick,
                _onMouseDown = _props.onMouseDown,
                _onTouchEnd = _props.onTouchEnd,
                _onTouchStart = _props.onTouchStart,
                prefixer = _props.prefixer,
                resizerClassName = _props.resizerClassName,
                split = _props.split,
                style = _props.style;

            var classes = [resizerClassName, split, className];

            return _react2.default.createElement('span', {
                className: classes.join(' '),
                style: prefixer.prefix(style) || {},
                onMouseDown: function onMouseDown(event) {
                    return _onMouseDown(event);
                },
                onTouchStart: function onTouchStart(event) {
                    event.preventDefault();
                    _onTouchStart(event);
                },
                onTouchEnd: function onTouchEnd(event) {
                    event.preventDefault();
                    _onTouchEnd(event);
                }
                // eslint-disable-next-line no-static-element-interactions
                , onClick: function onClick(event) {
                    if (_onClick) {
                        event.preventDefault();
                        _onClick(event);
                    }
                },
                onDoubleClick: function onDoubleClick(event) {
                    if (_onDoubleClick) {
                        event.preventDefault();
                        _onDoubleClick(event);
                    }
                }
            });
        }
    }]);

    return Resizer;
}(_react2.default.Component);

Resizer.propTypes = {
    className: _react2.default.PropTypes.string.isRequired,
    onClick: _react2.default.PropTypes.func,
    onDoubleClick: _react2.default.PropTypes.func,
    onMouseDown: _react2.default.PropTypes.func.isRequired,
    onTouchStart: _react2.default.PropTypes.func.isRequired,
    onTouchEnd: _react2.default.PropTypes.func.isRequired,
    prefixer: _react2.default.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
    split: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']),
    style: _reactStyleProptype2.default,
    resizerClassName: _react2.default.PropTypes.string.isRequired
};

Resizer.defaultProps = {
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
    resizerClassName: 'Resizer'
};

exports.default = Resizer;
module.exports = exports['default'];

},{"inline-style-prefixer":7,"react":"react","react-style-proptype":46}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

var _Pane = require('./Pane');

var _Pane2 = _interopRequireDefault(_Pane);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

function unFocus(document, window) {
    if (document.selection) {
        document.selection.empty();
    } else {
        try {
            window.getSelection().removeAllRanges();
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
}

var SplitPane = function (_React$Component) {
    _inherits(SplitPane, _React$Component);

    function SplitPane() {
        _classCallCheck(this, SplitPane);

        var _this = _possibleConstructorReturn(this, (SplitPane.__proto__ || Object.getPrototypeOf(SplitPane)).call(this));

        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onMouseMove = _this.onMouseMove.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.onMouseUp = _this.onMouseUp.bind(_this);

        _this.state = {
            active: false,
            resized: false
        };
        return _this;
    }

    _createClass(SplitPane, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setSize(this.props, this.state);
            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('touchmove', this.onTouchMove);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setSize(props, this.state);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mouseup', this.onMouseUp);
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('touchmove', this.onTouchMove);
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
            this.onTouchStart(eventWithTouches);
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart(event) {
            var _props = this.props,
                allowResize = _props.allowResize,
                onDragStarted = _props.onDragStarted,
                split = _props.split;

            if (allowResize) {
                unFocus(document, window);
                var position = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
                if (typeof onDragStarted === 'function') {
                    onDragStarted();
                }
                this.setState({
                    active: true,
                    position: position
                });
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
            this.onTouchMove(eventWithTouches);
        }
    }, {
        key: 'onTouchMove',
        value: function onTouchMove(event) {
            var _props2 = this.props,
                allowResize = _props2.allowResize,
                maxSize = _props2.maxSize,
                minSize = _props2.minSize,
                onChange = _props2.onChange,
                split = _props2.split;
            var _state = this.state,
                active = _state.active,
                position = _state.position;

            if (allowResize && active) {
                unFocus(document, window);
                var isPrimaryFirst = this.props.primary === 'first';
                var ref = isPrimaryFirst ? this.pane1 : this.pane2;
                if (ref) {
                    var node = _reactDom2.default.findDOMNode(ref);

                    if (node.getBoundingClientRect) {
                        var width = node.getBoundingClientRect().width;
                        var height = node.getBoundingClientRect().height;
                        var current = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
                        var size = split === 'vertical' ? width : height;
                        var newPosition = isPrimaryFirst ? position - current : current - position;

                        var newMaxSize = maxSize;
                        if (maxSize !== undefined && maxSize <= 0) {
                            var splPane = this.splitPane;
                            if (split === 'vertical') {
                                newMaxSize = splPane.getBoundingClientRect().width + maxSize;
                            } else {
                                newMaxSize = splPane.getBoundingClientRect().height + maxSize;
                            }
                        }

                        var newSize = size - newPosition;

                        if (newSize < minSize) {
                            newSize = minSize;
                        } else if (maxSize !== undefined && newSize > newMaxSize) {
                            newSize = newMaxSize;
                        } else {
                            this.setState({
                                position: current,
                                resized: true
                            });
                        }

                        if (onChange) onChange(newSize);
                        this.setState({ draggedSize: newSize });
                        ref.setState({ size: newSize });
                    }
                }
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            var _props3 = this.props,
                allowResize = _props3.allowResize,
                onDragFinished = _props3.onDragFinished;
            var _state2 = this.state,
                active = _state2.active,
                draggedSize = _state2.draggedSize;

            if (allowResize && active) {
                if (typeof onDragFinished === 'function') {
                    onDragFinished(draggedSize);
                }
                this.setState({ active: false });
            }
        }
    }, {
        key: 'setSize',
        value: function setSize(props, state) {
            var primary = this.props.primary;

            var ref = primary === 'first' ? this.pane1 : this.pane2;
            var newSize = void 0;
            if (ref) {
                newSize = props.size || state && state.draggedSize || props.defaultSize || props.minSize;
                ref.setState({
                    size: newSize
                });
                if (props.size !== state.draggedSize) {
                    this.setState({
                        draggedSize: newSize
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props4 = this.props,
                allowResize = _props4.allowResize,
                children = _props4.children,
                className = _props4.className,
                defaultSize = _props4.defaultSize,
                minSize = _props4.minSize,
                onResizerClick = _props4.onResizerClick,
                onResizerDoubleClick = _props4.onResizerDoubleClick,
                paneStyle = _props4.paneStyle,
                pane1StyleProps = _props4.pane1Style,
                pane2StyleProps = _props4.pane2Style,
                primary = _props4.primary,
                prefixer = _props4.prefixer,
                resizerClassName = _props4.resizerClassName,
                resizerStyle = _props4.resizerStyle,
                size = _props4.size,
                split = _props4.split,
                styleProps = _props4.style;

            var disabledClass = allowResize ? '' : 'disabled';

            var style = _extends({}, styleProps || {}, {
                display: 'flex',
                flex: 1,
                height: '100%',
                position: 'absolute',
                outline: 'none',
                overflow: 'hidden',
                MozUserSelect: 'text',
                WebkitUserSelect: 'text',
                msUserSelect: 'text',
                userSelect: 'text'
            });

            if (split === 'vertical') {
                _extends(style, {
                    flexDirection: 'row',
                    left: 0,
                    right: 0
                });
            } else {
                _extends(style, {
                    bottom: 0,
                    flexDirection: 'column',
                    minHeight: '100%',
                    top: 0,
                    width: '100%'
                });
            }

            var classes = ['SplitPane', className, split, disabledClass];
            var pane1Style = prefixer.prefix(_extends({}, paneStyle || {}, pane1StyleProps || {}));
            var pane2Style = prefixer.prefix(_extends({}, paneStyle || {}, pane2StyleProps || {}));

            return _react2.default.createElement('div', {
                className: classes.join(' '),
                ref: function ref(node) {
                    _this2.splitPane = node;
                },
                style: prefixer.prefix(style)
            }, _react2.default.createElement(_Pane2.default, {
                className: 'Pane1',
                key: 'pane1',
                ref: function ref(node) {
                    _this2.pane1 = node;
                },
                size: primary === 'first' ? size || defaultSize || minSize : undefined,
                split: split,
                style: pane1Style
            }, children[0]), _react2.default.createElement(_Resizer2.default, {
                className: disabledClass,
                onClick: onResizerClick,
                onDoubleClick: onResizerDoubleClick,
                onMouseDown: this.onMouseDown,
                onTouchStart: this.onTouchStart,
                onTouchEnd: this.onMouseUp,
                key: 'resizer',
                ref: function ref(node) {
                    _this2.resizer = node;
                },
                resizerClassName: resizerClassName,
                split: split,
                style: resizerStyle || {}
            }), _react2.default.createElement(_Pane2.default, {
                className: 'Pane2',
                key: 'pane2',
                ref: function ref(node) {
                    _this2.pane2 = node;
                },
                size: primary === 'second' ? size || defaultSize || minSize : undefined,
                split: split,
                style: pane2Style
            }, children[1]));
        }
    }]);

    return SplitPane;
}(_react2.default.Component);

SplitPane.propTypes = {
    allowResize: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node).isRequired,
    className: _react2.default.PropTypes.string,
    primary: _react2.default.PropTypes.oneOf(['first', 'second']),
    minSize: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    maxSize: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    // eslint-disable-next-line react/no-unused-prop-types
    defaultSize: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    size: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    split: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']),
    onDragStarted: _react2.default.PropTypes.func,
    onDragFinished: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onResizerClick: _react2.default.PropTypes.func,
    onResizerDoubleClick: _react2.default.PropTypes.func,
    prefixer: _react2.default.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
    style: _reactStyleProptype2.default,
    resizerStyle: _reactStyleProptype2.default,
    paneStyle: _reactStyleProptype2.default,
    pane1Style: _reactStyleProptype2.default,
    pane2Style: _reactStyleProptype2.default,
    resizerClassName: _react2.default.PropTypes.string
};

SplitPane.defaultProps = {
    allowResize: true,
    minSize: 50,
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
    primary: 'first',
    split: 'vertical'
};

exports.default = SplitPane;
module.exports = exports['default'];

},{"./Pane":42,"./Resizer":43,"inline-style-prefixer":7,"react":"react","react-dom":"react-dom","react-style-proptype":46}],45:[function(require,module,exports){
// GENERATED DO NOT EDIT
module.exports = [
  "alignContent",
  "MozAlignContent",
  "WebkitAlignContent",
  "MSAlignContent",
  "OAlignContent",
  "alignItems",
  "MozAlignItems",
  "WebkitAlignItems",
  "MSAlignItems",
  "OAlignItems",
  "alignSelf",
  "MozAlignSelf",
  "WebkitAlignSelf",
  "MSAlignSelf",
  "OAlignSelf",
  "all",
  "MozAll",
  "WebkitAll",
  "MSAll",
  "OAll",
  "animation",
  "MozAnimation",
  "WebkitAnimation",
  "MSAnimation",
  "OAnimation",
  "animationDelay",
  "MozAnimationDelay",
  "WebkitAnimationDelay",
  "MSAnimationDelay",
  "OAnimationDelay",
  "animationDirection",
  "MozAnimationDirection",
  "WebkitAnimationDirection",
  "MSAnimationDirection",
  "OAnimationDirection",
  "animationDuration",
  "MozAnimationDuration",
  "WebkitAnimationDuration",
  "MSAnimationDuration",
  "OAnimationDuration",
  "animationFillMode",
  "MozAnimationFillMode",
  "WebkitAnimationFillMode",
  "MSAnimationFillMode",
  "OAnimationFillMode",
  "animationIterationCount",
  "MozAnimationIterationCount",
  "WebkitAnimationIterationCount",
  "MSAnimationIterationCount",
  "OAnimationIterationCount",
  "animationName",
  "MozAnimationName",
  "WebkitAnimationName",
  "MSAnimationName",
  "OAnimationName",
  "animationPlayState",
  "MozAnimationPlayState",
  "WebkitAnimationPlayState",
  "MSAnimationPlayState",
  "OAnimationPlayState",
  "animationTimingFunction",
  "MozAnimationTimingFunction",
  "WebkitAnimationTimingFunction",
  "MSAnimationTimingFunction",
  "OAnimationTimingFunction",
  "backfaceVisibility",
  "MozBackfaceVisibility",
  "WebkitBackfaceVisibility",
  "MSBackfaceVisibility",
  "OBackfaceVisibility",
  "background",
  "MozBackground",
  "WebkitBackground",
  "MSBackground",
  "OBackground",
  "backgroundAttachment",
  "MozBackgroundAttachment",
  "WebkitBackgroundAttachment",
  "MSBackgroundAttachment",
  "OBackgroundAttachment",
  "backgroundBlendMode",
  "MozBackgroundBlendMode",
  "WebkitBackgroundBlendMode",
  "MSBackgroundBlendMode",
  "OBackgroundBlendMode",
  "backgroundClip",
  "MozBackgroundClip",
  "WebkitBackgroundClip",
  "MSBackgroundClip",
  "OBackgroundClip",
  "backgroundColor",
  "MozBackgroundColor",
  "WebkitBackgroundColor",
  "MSBackgroundColor",
  "OBackgroundColor",
  "backgroundImage",
  "MozBackgroundImage",
  "WebkitBackgroundImage",
  "MSBackgroundImage",
  "OBackgroundImage",
  "backgroundOrigin",
  "MozBackgroundOrigin",
  "WebkitBackgroundOrigin",
  "MSBackgroundOrigin",
  "OBackgroundOrigin",
  "backgroundPosition",
  "MozBackgroundPosition",
  "WebkitBackgroundPosition",
  "MSBackgroundPosition",
  "OBackgroundPosition",
  "backgroundRepeat",
  "MozBackgroundRepeat",
  "WebkitBackgroundRepeat",
  "MSBackgroundRepeat",
  "OBackgroundRepeat",
  "backgroundSize",
  "MozBackgroundSize",
  "WebkitBackgroundSize",
  "MSBackgroundSize",
  "OBackgroundSize",
  "blockSize",
  "MozBlockSize",
  "WebkitBlockSize",
  "MSBlockSize",
  "OBlockSize",
  "border",
  "MozBorder",
  "WebkitBorder",
  "MSBorder",
  "OBorder",
  "borderBlockEnd",
  "MozBorderBlockEnd",
  "WebkitBorderBlockEnd",
  "MSBorderBlockEnd",
  "OBorderBlockEnd",
  "borderBlockEndColor",
  "MozBorderBlockEndColor",
  "WebkitBorderBlockEndColor",
  "MSBorderBlockEndColor",
  "OBorderBlockEndColor",
  "borderBlockEndStyle",
  "MozBorderBlockEndStyle",
  "WebkitBorderBlockEndStyle",
  "MSBorderBlockEndStyle",
  "OBorderBlockEndStyle",
  "borderBlockEndWidth",
  "MozBorderBlockEndWidth",
  "WebkitBorderBlockEndWidth",
  "MSBorderBlockEndWidth",
  "OBorderBlockEndWidth",
  "borderBlockStart",
  "MozBorderBlockStart",
  "WebkitBorderBlockStart",
  "MSBorderBlockStart",
  "OBorderBlockStart",
  "borderBlockStartColor",
  "MozBorderBlockStartColor",
  "WebkitBorderBlockStartColor",
  "MSBorderBlockStartColor",
  "OBorderBlockStartColor",
  "borderBlockStartStyle",
  "MozBorderBlockStartStyle",
  "WebkitBorderBlockStartStyle",
  "MSBorderBlockStartStyle",
  "OBorderBlockStartStyle",
  "borderBlockStartWidth",
  "MozBorderBlockStartWidth",
  "WebkitBorderBlockStartWidth",
  "MSBorderBlockStartWidth",
  "OBorderBlockStartWidth",
  "borderBottom",
  "MozBorderBottom",
  "WebkitBorderBottom",
  "MSBorderBottom",
  "OBorderBottom",
  "borderBottomColor",
  "MozBorderBottomColor",
  "WebkitBorderBottomColor",
  "MSBorderBottomColor",
  "OBorderBottomColor",
  "borderBottomLeftRadius",
  "MozBorderBottomLeftRadius",
  "WebkitBorderBottomLeftRadius",
  "MSBorderBottomLeftRadius",
  "OBorderBottomLeftRadius",
  "borderBottomRightRadius",
  "MozBorderBottomRightRadius",
  "WebkitBorderBottomRightRadius",
  "MSBorderBottomRightRadius",
  "OBorderBottomRightRadius",
  "borderBottomStyle",
  "MozBorderBottomStyle",
  "WebkitBorderBottomStyle",
  "MSBorderBottomStyle",
  "OBorderBottomStyle",
  "borderBottomWidth",
  "MozBorderBottomWidth",
  "WebkitBorderBottomWidth",
  "MSBorderBottomWidth",
  "OBorderBottomWidth",
  "borderCollapse",
  "MozBorderCollapse",
  "WebkitBorderCollapse",
  "MSBorderCollapse",
  "OBorderCollapse",
  "borderColor",
  "MozBorderColor",
  "WebkitBorderColor",
  "MSBorderColor",
  "OBorderColor",
  "borderImage",
  "MozBorderImage",
  "WebkitBorderImage",
  "MSBorderImage",
  "OBorderImage",
  "borderImageOutset",
  "MozBorderImageOutset",
  "WebkitBorderImageOutset",
  "MSBorderImageOutset",
  "OBorderImageOutset",
  "borderImageRepeat",
  "MozBorderImageRepeat",
  "WebkitBorderImageRepeat",
  "MSBorderImageRepeat",
  "OBorderImageRepeat",
  "borderImageSlice",
  "MozBorderImageSlice",
  "WebkitBorderImageSlice",
  "MSBorderImageSlice",
  "OBorderImageSlice",
  "borderImageSource",
  "MozBorderImageSource",
  "WebkitBorderImageSource",
  "MSBorderImageSource",
  "OBorderImageSource",
  "borderImageWidth",
  "MozBorderImageWidth",
  "WebkitBorderImageWidth",
  "MSBorderImageWidth",
  "OBorderImageWidth",
  "borderInlineEnd",
  "MozBorderInlineEnd",
  "WebkitBorderInlineEnd",
  "MSBorderInlineEnd",
  "OBorderInlineEnd",
  "borderInlineEndColor",
  "MozBorderInlineEndColor",
  "WebkitBorderInlineEndColor",
  "MSBorderInlineEndColor",
  "OBorderInlineEndColor",
  "borderInlineEndStyle",
  "MozBorderInlineEndStyle",
  "WebkitBorderInlineEndStyle",
  "MSBorderInlineEndStyle",
  "OBorderInlineEndStyle",
  "borderInlineEndWidth",
  "MozBorderInlineEndWidth",
  "WebkitBorderInlineEndWidth",
  "MSBorderInlineEndWidth",
  "OBorderInlineEndWidth",
  "borderInlineStart",
  "MozBorderInlineStart",
  "WebkitBorderInlineStart",
  "MSBorderInlineStart",
  "OBorderInlineStart",
  "borderInlineStartColor",
  "MozBorderInlineStartColor",
  "WebkitBorderInlineStartColor",
  "MSBorderInlineStartColor",
  "OBorderInlineStartColor",
  "borderInlineStartStyle",
  "MozBorderInlineStartStyle",
  "WebkitBorderInlineStartStyle",
  "MSBorderInlineStartStyle",
  "OBorderInlineStartStyle",
  "borderInlineStartWidth",
  "MozBorderInlineStartWidth",
  "WebkitBorderInlineStartWidth",
  "MSBorderInlineStartWidth",
  "OBorderInlineStartWidth",
  "borderLeft",
  "MozBorderLeft",
  "WebkitBorderLeft",
  "MSBorderLeft",
  "OBorderLeft",
  "borderLeftColor",
  "MozBorderLeftColor",
  "WebkitBorderLeftColor",
  "MSBorderLeftColor",
  "OBorderLeftColor",
  "borderLeftStyle",
  "MozBorderLeftStyle",
  "WebkitBorderLeftStyle",
  "MSBorderLeftStyle",
  "OBorderLeftStyle",
  "borderLeftWidth",
  "MozBorderLeftWidth",
  "WebkitBorderLeftWidth",
  "MSBorderLeftWidth",
  "OBorderLeftWidth",
  "borderRadius",
  "MozBorderRadius",
  "WebkitBorderRadius",
  "MSBorderRadius",
  "OBorderRadius",
  "borderRight",
  "MozBorderRight",
  "WebkitBorderRight",
  "MSBorderRight",
  "OBorderRight",
  "borderRightColor",
  "MozBorderRightColor",
  "WebkitBorderRightColor",
  "MSBorderRightColor",
  "OBorderRightColor",
  "borderRightStyle",
  "MozBorderRightStyle",
  "WebkitBorderRightStyle",
  "MSBorderRightStyle",
  "OBorderRightStyle",
  "borderRightWidth",
  "MozBorderRightWidth",
  "WebkitBorderRightWidth",
  "MSBorderRightWidth",
  "OBorderRightWidth",
  "borderSpacing",
  "MozBorderSpacing",
  "WebkitBorderSpacing",
  "MSBorderSpacing",
  "OBorderSpacing",
  "borderStyle",
  "MozBorderStyle",
  "WebkitBorderStyle",
  "MSBorderStyle",
  "OBorderStyle",
  "borderTop",
  "MozBorderTop",
  "WebkitBorderTop",
  "MSBorderTop",
  "OBorderTop",
  "borderTopColor",
  "MozBorderTopColor",
  "WebkitBorderTopColor",
  "MSBorderTopColor",
  "OBorderTopColor",
  "borderTopLeftRadius",
  "MozBorderTopLeftRadius",
  "WebkitBorderTopLeftRadius",
  "MSBorderTopLeftRadius",
  "OBorderTopLeftRadius",
  "borderTopRightRadius",
  "MozBorderTopRightRadius",
  "WebkitBorderTopRightRadius",
  "MSBorderTopRightRadius",
  "OBorderTopRightRadius",
  "borderTopStyle",
  "MozBorderTopStyle",
  "WebkitBorderTopStyle",
  "MSBorderTopStyle",
  "OBorderTopStyle",
  "borderTopWidth",
  "MozBorderTopWidth",
  "WebkitBorderTopWidth",
  "MSBorderTopWidth",
  "OBorderTopWidth",
  "borderWidth",
  "MozBorderWidth",
  "WebkitBorderWidth",
  "MSBorderWidth",
  "OBorderWidth",
  "bottom",
  "MozBottom",
  "WebkitBottom",
  "MSBottom",
  "OBottom",
  "boxDecorationBreak",
  "MozBoxDecorationBreak",
  "WebkitBoxDecorationBreak",
  "MSBoxDecorationBreak",
  "OBoxDecorationBreak",
  "boxShadow",
  "MozBoxShadow",
  "WebkitBoxShadow",
  "MSBoxShadow",
  "OBoxShadow",
  "boxSizing",
  "MozBoxSizing",
  "WebkitBoxSizing",
  "MSBoxSizing",
  "OBoxSizing",
  "breakAfter",
  "MozBreakAfter",
  "WebkitBreakAfter",
  "MSBreakAfter",
  "OBreakAfter",
  "breakBefore",
  "MozBreakBefore",
  "WebkitBreakBefore",
  "MSBreakBefore",
  "OBreakBefore",
  "breakInside",
  "MozBreakInside",
  "WebkitBreakInside",
  "MSBreakInside",
  "OBreakInside",
  "captionSide",
  "MozCaptionSide",
  "WebkitCaptionSide",
  "MSCaptionSide",
  "OCaptionSide",
  "caretColor",
  "MozCaretColor",
  "WebkitCaretColor",
  "MSCaretColor",
  "OCaretColor",
  "ch",
  "MozCh",
  "WebkitCh",
  "MSCh",
  "OCh",
  "clear",
  "MozClear",
  "WebkitClear",
  "MSClear",
  "OClear",
  "clip",
  "MozClip",
  "WebkitClip",
  "MSClip",
  "OClip",
  "clipPath",
  "MozClipPath",
  "WebkitClipPath",
  "MSClipPath",
  "OClipPath",
  "cm",
  "MozCm",
  "WebkitCm",
  "MSCm",
  "OCm",
  "color",
  "MozColor",
  "WebkitColor",
  "MSColor",
  "OColor",
  "columnCount",
  "MozColumnCount",
  "WebkitColumnCount",
  "MSColumnCount",
  "OColumnCount",
  "columnFill",
  "MozColumnFill",
  "WebkitColumnFill",
  "MSColumnFill",
  "OColumnFill",
  "columnGap",
  "MozColumnGap",
  "WebkitColumnGap",
  "MSColumnGap",
  "OColumnGap",
  "columnRule",
  "MozColumnRule",
  "WebkitColumnRule",
  "MSColumnRule",
  "OColumnRule",
  "columnRuleColor",
  "MozColumnRuleColor",
  "WebkitColumnRuleColor",
  "MSColumnRuleColor",
  "OColumnRuleColor",
  "columnRuleStyle",
  "MozColumnRuleStyle",
  "WebkitColumnRuleStyle",
  "MSColumnRuleStyle",
  "OColumnRuleStyle",
  "columnRuleWidth",
  "MozColumnRuleWidth",
  "WebkitColumnRuleWidth",
  "MSColumnRuleWidth",
  "OColumnRuleWidth",
  "columnSpan",
  "MozColumnSpan",
  "WebkitColumnSpan",
  "MSColumnSpan",
  "OColumnSpan",
  "columnWidth",
  "MozColumnWidth",
  "WebkitColumnWidth",
  "MSColumnWidth",
  "OColumnWidth",
  "columns",
  "MozColumns",
  "WebkitColumns",
  "MSColumns",
  "OColumns",
  "content",
  "MozContent",
  "WebkitContent",
  "MSContent",
  "OContent",
  "counterIncrement",
  "MozCounterIncrement",
  "WebkitCounterIncrement",
  "MSCounterIncrement",
  "OCounterIncrement",
  "counterReset",
  "MozCounterReset",
  "WebkitCounterReset",
  "MSCounterReset",
  "OCounterReset",
  "cursor",
  "MozCursor",
  "WebkitCursor",
  "MSCursor",
  "OCursor",
  "deg",
  "MozDeg",
  "WebkitDeg",
  "MSDeg",
  "ODeg",
  "direction",
  "MozDirection",
  "WebkitDirection",
  "MSDirection",
  "ODirection",
  "display",
  "MozDisplay",
  "WebkitDisplay",
  "MSDisplay",
  "ODisplay",
  "dpcm",
  "MozDpcm",
  "WebkitDpcm",
  "MSDpcm",
  "ODpcm",
  "dpi",
  "MozDpi",
  "WebkitDpi",
  "MSDpi",
  "ODpi",
  "dppx",
  "MozDppx",
  "WebkitDppx",
  "MSDppx",
  "ODppx",
  "em",
  "MozEm",
  "WebkitEm",
  "MSEm",
  "OEm",
  "emptyCells",
  "MozEmptyCells",
  "WebkitEmptyCells",
  "MSEmptyCells",
  "OEmptyCells",
  "ex",
  "MozEx",
  "WebkitEx",
  "MSEx",
  "OEx",
  "filter",
  "MozFilter",
  "WebkitFilter",
  "MSFilter",
  "OFilter",
  "flexBasis",
  "MozFlexBasis",
  "WebkitFlexBasis",
  "MSFlexBasis",
  "OFlexBasis",
  "flexDirection",
  "MozFlexDirection",
  "WebkitFlexDirection",
  "MSFlexDirection",
  "OFlexDirection",
  "flexFlow",
  "MozFlexFlow",
  "WebkitFlexFlow",
  "MSFlexFlow",
  "OFlexFlow",
  "flexGrow",
  "MozFlexGrow",
  "WebkitFlexGrow",
  "MSFlexGrow",
  "OFlexGrow",
  "flexShrink",
  "MozFlexShrink",
  "WebkitFlexShrink",
  "MSFlexShrink",
  "OFlexShrink",
  "flexWrap",
  "MozFlexWrap",
  "WebkitFlexWrap",
  "MSFlexWrap",
  "OFlexWrap",
  "float",
  "MozFloat",
  "WebkitFloat",
  "MSFloat",
  "OFloat",
  "font",
  "MozFont",
  "WebkitFont",
  "MSFont",
  "OFont",
  "fontFamily",
  "MozFontFamily",
  "WebkitFontFamily",
  "MSFontFamily",
  "OFontFamily",
  "fontFeatureSettings",
  "MozFontFeatureSettings",
  "WebkitFontFeatureSettings",
  "MSFontFeatureSettings",
  "OFontFeatureSettings",
  "fontKerning",
  "MozFontKerning",
  "WebkitFontKerning",
  "MSFontKerning",
  "OFontKerning",
  "fontLanguageOverride",
  "MozFontLanguageOverride",
  "WebkitFontLanguageOverride",
  "MSFontLanguageOverride",
  "OFontLanguageOverride",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "fontSizeAdjust",
  "MozFontSizeAdjust",
  "WebkitFontSizeAdjust",
  "MSFontSizeAdjust",
  "OFontSizeAdjust",
  "fontStretch",
  "MozFontStretch",
  "WebkitFontStretch",
  "MSFontStretch",
  "OFontStretch",
  "fontStyle",
  "MozFontStyle",
  "WebkitFontStyle",
  "MSFontStyle",
  "OFontStyle",
  "fontSynthesis",
  "MozFontSynthesis",
  "WebkitFontSynthesis",
  "MSFontSynthesis",
  "OFontSynthesis",
  "fontVariant",
  "MozFontVariant",
  "WebkitFontVariant",
  "MSFontVariant",
  "OFontVariant",
  "fontVariantAlternates",
  "MozFontVariantAlternates",
  "WebkitFontVariantAlternates",
  "MSFontVariantAlternates",
  "OFontVariantAlternates",
  "fontVariantCaps",
  "MozFontVariantCaps",
  "WebkitFontVariantCaps",
  "MSFontVariantCaps",
  "OFontVariantCaps",
  "fontVariantEastAsian",
  "MozFontVariantEastAsian",
  "WebkitFontVariantEastAsian",
  "MSFontVariantEastAsian",
  "OFontVariantEastAsian",
  "fontVariantLigatures",
  "MozFontVariantLigatures",
  "WebkitFontVariantLigatures",
  "MSFontVariantLigatures",
  "OFontVariantLigatures",
  "fontVariantNumeric",
  "MozFontVariantNumeric",
  "WebkitFontVariantNumeric",
  "MSFontVariantNumeric",
  "OFontVariantNumeric",
  "fontVariantPosition",
  "MozFontVariantPosition",
  "WebkitFontVariantPosition",
  "MSFontVariantPosition",
  "OFontVariantPosition",
  "fontWeight",
  "MozFontWeight",
  "WebkitFontWeight",
  "MSFontWeight",
  "OFontWeight",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "grad",
  "MozGrad",
  "WebkitGrad",
  "MSGrad",
  "OGrad",
  "grid",
  "MozGrid",
  "WebkitGrid",
  "MSGrid",
  "OGrid",
  "gridArea",
  "MozGridArea",
  "WebkitGridArea",
  "MSGridArea",
  "OGridArea",
  "gridAutoColumns",
  "MozGridAutoColumns",
  "WebkitGridAutoColumns",
  "MSGridAutoColumns",
  "OGridAutoColumns",
  "gridAutoFlow",
  "MozGridAutoFlow",
  "WebkitGridAutoFlow",
  "MSGridAutoFlow",
  "OGridAutoFlow",
  "gridAutoRows",
  "MozGridAutoRows",
  "WebkitGridAutoRows",
  "MSGridAutoRows",
  "OGridAutoRows",
  "gridColumn",
  "MozGridColumn",
  "WebkitGridColumn",
  "MSGridColumn",
  "OGridColumn",
  "gridColumnEnd",
  "MozGridColumnEnd",
  "WebkitGridColumnEnd",
  "MSGridColumnEnd",
  "OGridColumnEnd",
  "gridColumnGap",
  "MozGridColumnGap",
  "WebkitGridColumnGap",
  "MSGridColumnGap",
  "OGridColumnGap",
  "gridColumnStart",
  "MozGridColumnStart",
  "WebkitGridColumnStart",
  "MSGridColumnStart",
  "OGridColumnStart",
  "gridGap",
  "MozGridGap",
  "WebkitGridGap",
  "MSGridGap",
  "OGridGap",
  "gridRow",
  "MozGridRow",
  "WebkitGridRow",
  "MSGridRow",
  "OGridRow",
  "gridRowEnd",
  "MozGridRowEnd",
  "WebkitGridRowEnd",
  "MSGridRowEnd",
  "OGridRowEnd",
  "gridRowGap",
  "MozGridRowGap",
  "WebkitGridRowGap",
  "MSGridRowGap",
  "OGridRowGap",
  "gridRowStart",
  "MozGridRowStart",
  "WebkitGridRowStart",
  "MSGridRowStart",
  "OGridRowStart",
  "gridTemplate",
  "MozGridTemplate",
  "WebkitGridTemplate",
  "MSGridTemplate",
  "OGridTemplate",
  "gridTemplateAreas",
  "MozGridTemplateAreas",
  "WebkitGridTemplateAreas",
  "MSGridTemplateAreas",
  "OGridTemplateAreas",
  "gridTemplateColumns",
  "MozGridTemplateColumns",
  "WebkitGridTemplateColumns",
  "MSGridTemplateColumns",
  "OGridTemplateColumns",
  "gridTemplateRows",
  "MozGridTemplateRows",
  "WebkitGridTemplateRows",
  "MSGridTemplateRows",
  "OGridTemplateRows",
  "height",
  "MozHeight",
  "WebkitHeight",
  "MSHeight",
  "OHeight",
  "hyphens",
  "MozHyphens",
  "WebkitHyphens",
  "MSHyphens",
  "OHyphens",
  "hz",
  "MozHz",
  "WebkitHz",
  "MSHz",
  "OHz",
  "imageOrientation",
  "MozImageOrientation",
  "WebkitImageOrientation",
  "MSImageOrientation",
  "OImageOrientation",
  "imageRendering",
  "MozImageRendering",
  "WebkitImageRendering",
  "MSImageRendering",
  "OImageRendering",
  "imageResolution",
  "MozImageResolution",
  "WebkitImageResolution",
  "MSImageResolution",
  "OImageResolution",
  "imeMode",
  "MozImeMode",
  "WebkitImeMode",
  "MSImeMode",
  "OImeMode",
  "in",
  "MozIn",
  "WebkitIn",
  "MSIn",
  "OIn",
  "inherit",
  "MozInherit",
  "WebkitInherit",
  "MSInherit",
  "OInherit",
  "initial",
  "MozInitial",
  "WebkitInitial",
  "MSInitial",
  "OInitial",
  "inlineSize",
  "MozInlineSize",
  "WebkitInlineSize",
  "MSInlineSize",
  "OInlineSize",
  "isolation",
  "MozIsolation",
  "WebkitIsolation",
  "MSIsolation",
  "OIsolation",
  "justifyContent",
  "MozJustifyContent",
  "WebkitJustifyContent",
  "MSJustifyContent",
  "OJustifyContent",
  "khz",
  "MozKhz",
  "WebkitKhz",
  "MSKhz",
  "OKhz",
  "left",
  "MozLeft",
  "WebkitLeft",
  "MSLeft",
  "OLeft",
  "letterSpacing",
  "MozLetterSpacing",
  "WebkitLetterSpacing",
  "MSLetterSpacing",
  "OLetterSpacing",
  "lineBreak",
  "MozLineBreak",
  "WebkitLineBreak",
  "MSLineBreak",
  "OLineBreak",
  "lineHeight",
  "MozLineHeight",
  "WebkitLineHeight",
  "MSLineHeight",
  "OLineHeight",
  "listStyle",
  "MozListStyle",
  "WebkitListStyle",
  "MSListStyle",
  "OListStyle",
  "listStyleImage",
  "MozListStyleImage",
  "WebkitListStyleImage",
  "MSListStyleImage",
  "OListStyleImage",
  "listStylePosition",
  "MozListStylePosition",
  "WebkitListStylePosition",
  "MSListStylePosition",
  "OListStylePosition",
  "listStyleType",
  "MozListStyleType",
  "WebkitListStyleType",
  "MSListStyleType",
  "OListStyleType",
  "margin",
  "MozMargin",
  "WebkitMargin",
  "MSMargin",
  "OMargin",
  "marginBlockEnd",
  "MozMarginBlockEnd",
  "WebkitMarginBlockEnd",
  "MSMarginBlockEnd",
  "OMarginBlockEnd",
  "marginBlockStart",
  "MozMarginBlockStart",
  "WebkitMarginBlockStart",
  "MSMarginBlockStart",
  "OMarginBlockStart",
  "marginBottom",
  "MozMarginBottom",
  "WebkitMarginBottom",
  "MSMarginBottom",
  "OMarginBottom",
  "marginInlineEnd",
  "MozMarginInlineEnd",
  "WebkitMarginInlineEnd",
  "MSMarginInlineEnd",
  "OMarginInlineEnd",
  "marginInlineStart",
  "MozMarginInlineStart",
  "WebkitMarginInlineStart",
  "MSMarginInlineStart",
  "OMarginInlineStart",
  "marginLeft",
  "MozMarginLeft",
  "WebkitMarginLeft",
  "MSMarginLeft",
  "OMarginLeft",
  "marginRight",
  "MozMarginRight",
  "WebkitMarginRight",
  "MSMarginRight",
  "OMarginRight",
  "marginTop",
  "MozMarginTop",
  "WebkitMarginTop",
  "MSMarginTop",
  "OMarginTop",
  "mask",
  "MozMask",
  "WebkitMask",
  "MSMask",
  "OMask",
  "maskClip",
  "MozMaskClip",
  "WebkitMaskClip",
  "MSMaskClip",
  "OMaskClip",
  "maskComposite",
  "MozMaskComposite",
  "WebkitMaskComposite",
  "MSMaskComposite",
  "OMaskComposite",
  "maskImage",
  "MozMaskImage",
  "WebkitMaskImage",
  "MSMaskImage",
  "OMaskImage",
  "maskMode",
  "MozMaskMode",
  "WebkitMaskMode",
  "MSMaskMode",
  "OMaskMode",
  "maskOrigin",
  "MozMaskOrigin",
  "WebkitMaskOrigin",
  "MSMaskOrigin",
  "OMaskOrigin",
  "maskPosition",
  "MozMaskPosition",
  "WebkitMaskPosition",
  "MSMaskPosition",
  "OMaskPosition",
  "maskRepeat",
  "MozMaskRepeat",
  "WebkitMaskRepeat",
  "MSMaskRepeat",
  "OMaskRepeat",
  "maskSize",
  "MozMaskSize",
  "WebkitMaskSize",
  "MSMaskSize",
  "OMaskSize",
  "maskType",
  "MozMaskType",
  "WebkitMaskType",
  "MSMaskType",
  "OMaskType",
  "maxHeight",
  "MozMaxHeight",
  "WebkitMaxHeight",
  "MSMaxHeight",
  "OMaxHeight",
  "maxWidth",
  "MozMaxWidth",
  "WebkitMaxWidth",
  "MSMaxWidth",
  "OMaxWidth",
  "minBlockSize",
  "MozMinBlockSize",
  "WebkitMinBlockSize",
  "MSMinBlockSize",
  "OMinBlockSize",
  "minHeight",
  "MozMinHeight",
  "WebkitMinHeight",
  "MSMinHeight",
  "OMinHeight",
  "minInlineSize",
  "MozMinInlineSize",
  "WebkitMinInlineSize",
  "MSMinInlineSize",
  "OMinInlineSize",
  "minWidth",
  "MozMinWidth",
  "WebkitMinWidth",
  "MSMinWidth",
  "OMinWidth",
  "mixBlendMode",
  "MozMixBlendMode",
  "WebkitMixBlendMode",
  "MSMixBlendMode",
  "OMixBlendMode",
  "mm",
  "MozMm",
  "WebkitMm",
  "MSMm",
  "OMm",
  "ms",
  "MozMs",
  "WebkitMs",
  "MSMs",
  "OMs",
  "objectFit",
  "MozObjectFit",
  "WebkitObjectFit",
  "MSObjectFit",
  "OObjectFit",
  "objectPosition",
  "MozObjectPosition",
  "WebkitObjectPosition",
  "MSObjectPosition",
  "OObjectPosition",
  "offsetBlockEnd",
  "MozOffsetBlockEnd",
  "WebkitOffsetBlockEnd",
  "MSOffsetBlockEnd",
  "OOffsetBlockEnd",
  "offsetBlockStart",
  "MozOffsetBlockStart",
  "WebkitOffsetBlockStart",
  "MSOffsetBlockStart",
  "OOffsetBlockStart",
  "offsetInlineEnd",
  "MozOffsetInlineEnd",
  "WebkitOffsetInlineEnd",
  "MSOffsetInlineEnd",
  "OOffsetInlineEnd",
  "offsetInlineStart",
  "MozOffsetInlineStart",
  "WebkitOffsetInlineStart",
  "MSOffsetInlineStart",
  "OOffsetInlineStart",
  "opacity",
  "MozOpacity",
  "WebkitOpacity",
  "MSOpacity",
  "OOpacity",
  "order",
  "MozOrder",
  "WebkitOrder",
  "MSOrder",
  "OOrder",
  "orphans",
  "MozOrphans",
  "WebkitOrphans",
  "MSOrphans",
  "OOrphans",
  "outline",
  "MozOutline",
  "WebkitOutline",
  "MSOutline",
  "OOutline",
  "outlineColor",
  "MozOutlineColor",
  "WebkitOutlineColor",
  "MSOutlineColor",
  "OOutlineColor",
  "outlineOffset",
  "MozOutlineOffset",
  "WebkitOutlineOffset",
  "MSOutlineOffset",
  "OOutlineOffset",
  "outlineStyle",
  "MozOutlineStyle",
  "WebkitOutlineStyle",
  "MSOutlineStyle",
  "OOutlineStyle",
  "outlineWidth",
  "MozOutlineWidth",
  "WebkitOutlineWidth",
  "MSOutlineWidth",
  "OOutlineWidth",
  "overflow",
  "MozOverflow",
  "WebkitOverflow",
  "MSOverflow",
  "OOverflow",
  "overflowWrap",
  "MozOverflowWrap",
  "WebkitOverflowWrap",
  "MSOverflowWrap",
  "OOverflowWrap",
  "overflowX",
  "MozOverflowX",
  "WebkitOverflowX",
  "MSOverflowX",
  "OOverflowX",
  "overflowY",
  "MozOverflowY",
  "WebkitOverflowY",
  "MSOverflowY",
  "OOverflowY",
  "padding",
  "MozPadding",
  "WebkitPadding",
  "MSPadding",
  "OPadding",
  "paddingBlockEnd",
  "MozPaddingBlockEnd",
  "WebkitPaddingBlockEnd",
  "MSPaddingBlockEnd",
  "OPaddingBlockEnd",
  "paddingBlockStart",
  "MozPaddingBlockStart",
  "WebkitPaddingBlockStart",
  "MSPaddingBlockStart",
  "OPaddingBlockStart",
  "paddingBottom",
  "MozPaddingBottom",
  "WebkitPaddingBottom",
  "MSPaddingBottom",
  "OPaddingBottom",
  "paddingInlineEnd",
  "MozPaddingInlineEnd",
  "WebkitPaddingInlineEnd",
  "MSPaddingInlineEnd",
  "OPaddingInlineEnd",
  "paddingInlineStart",
  "MozPaddingInlineStart",
  "WebkitPaddingInlineStart",
  "MSPaddingInlineStart",
  "OPaddingInlineStart",
  "paddingLeft",
  "MozPaddingLeft",
  "WebkitPaddingLeft",
  "MSPaddingLeft",
  "OPaddingLeft",
  "paddingRight",
  "MozPaddingRight",
  "WebkitPaddingRight",
  "MSPaddingRight",
  "OPaddingRight",
  "paddingTop",
  "MozPaddingTop",
  "WebkitPaddingTop",
  "MSPaddingTop",
  "OPaddingTop",
  "pageBreakAfter",
  "MozPageBreakAfter",
  "WebkitPageBreakAfter",
  "MSPageBreakAfter",
  "OPageBreakAfter",
  "pageBreakBefore",
  "MozPageBreakBefore",
  "WebkitPageBreakBefore",
  "MSPageBreakBefore",
  "OPageBreakBefore",
  "pageBreakInside",
  "MozPageBreakInside",
  "WebkitPageBreakInside",
  "MSPageBreakInside",
  "OPageBreakInside",
  "pc",
  "MozPc",
  "WebkitPc",
  "MSPc",
  "OPc",
  "perspective",
  "MozPerspective",
  "WebkitPerspective",
  "MSPerspective",
  "OPerspective",
  "perspectiveOrigin",
  "MozPerspectiveOrigin",
  "WebkitPerspectiveOrigin",
  "MSPerspectiveOrigin",
  "OPerspectiveOrigin",
  "pointerEvents",
  "MozPointerEvents",
  "WebkitPointerEvents",
  "MSPointerEvents",
  "OPointerEvents",
  "position",
  "MozPosition",
  "WebkitPosition",
  "MSPosition",
  "OPosition",
  "pt",
  "MozPt",
  "WebkitPt",
  "MSPt",
  "OPt",
  "px",
  "MozPx",
  "WebkitPx",
  "MSPx",
  "OPx",
  "q",
  "MozQ",
  "WebkitQ",
  "MSQ",
  "OQ",
  "quotes",
  "MozQuotes",
  "WebkitQuotes",
  "MSQuotes",
  "OQuotes",
  "rad",
  "MozRad",
  "WebkitRad",
  "MSRad",
  "ORad",
  "rem",
  "MozRem",
  "WebkitRem",
  "MSRem",
  "ORem",
  "resize",
  "MozResize",
  "WebkitResize",
  "MSResize",
  "OResize",
  "revert",
  "MozRevert",
  "WebkitRevert",
  "MSRevert",
  "ORevert",
  "right",
  "MozRight",
  "WebkitRight",
  "MSRight",
  "ORight",
  "rubyAlign",
  "MozRubyAlign",
  "WebkitRubyAlign",
  "MSRubyAlign",
  "ORubyAlign",
  "rubyMerge",
  "MozRubyMerge",
  "WebkitRubyMerge",
  "MSRubyMerge",
  "ORubyMerge",
  "rubyPosition",
  "MozRubyPosition",
  "WebkitRubyPosition",
  "MSRubyPosition",
  "ORubyPosition",
  "s",
  "MozS",
  "WebkitS",
  "MSS",
  "OS",
  "scrollBehavior",
  "MozScrollBehavior",
  "WebkitScrollBehavior",
  "MSScrollBehavior",
  "OScrollBehavior",
  "scrollSnapCoordinate",
  "MozScrollSnapCoordinate",
  "WebkitScrollSnapCoordinate",
  "MSScrollSnapCoordinate",
  "OScrollSnapCoordinate",
  "scrollSnapDestination",
  "MozScrollSnapDestination",
  "WebkitScrollSnapDestination",
  "MSScrollSnapDestination",
  "OScrollSnapDestination",
  "scrollSnapType",
  "MozScrollSnapType",
  "WebkitScrollSnapType",
  "MSScrollSnapType",
  "OScrollSnapType",
  "shapeImageThreshold",
  "MozShapeImageThreshold",
  "WebkitShapeImageThreshold",
  "MSShapeImageThreshold",
  "OShapeImageThreshold",
  "shapeMargin",
  "MozShapeMargin",
  "WebkitShapeMargin",
  "MSShapeMargin",
  "OShapeMargin",
  "shapeOutside",
  "MozShapeOutside",
  "WebkitShapeOutside",
  "MSShapeOutside",
  "OShapeOutside",
  "tabSize",
  "MozTabSize",
  "WebkitTabSize",
  "MSTabSize",
  "OTabSize",
  "tableLayout",
  "MozTableLayout",
  "WebkitTableLayout",
  "MSTableLayout",
  "OTableLayout",
  "textAlign",
  "MozTextAlign",
  "WebkitTextAlign",
  "MSTextAlign",
  "OTextAlign",
  "textAlignLast",
  "MozTextAlignLast",
  "WebkitTextAlignLast",
  "MSTextAlignLast",
  "OTextAlignLast",
  "textCombineUpright",
  "MozTextCombineUpright",
  "WebkitTextCombineUpright",
  "MSTextCombineUpright",
  "OTextCombineUpright",
  "textDecoration",
  "MozTextDecoration",
  "WebkitTextDecoration",
  "MSTextDecoration",
  "OTextDecoration",
  "textDecorationColor",
  "MozTextDecorationColor",
  "WebkitTextDecorationColor",
  "MSTextDecorationColor",
  "OTextDecorationColor",
  "textDecorationLine",
  "MozTextDecorationLine",
  "WebkitTextDecorationLine",
  "MSTextDecorationLine",
  "OTextDecorationLine",
  "textDecorationStyle",
  "MozTextDecorationStyle",
  "WebkitTextDecorationStyle",
  "MSTextDecorationStyle",
  "OTextDecorationStyle",
  "textEmphasis",
  "MozTextEmphasis",
  "WebkitTextEmphasis",
  "MSTextEmphasis",
  "OTextEmphasis",
  "textEmphasisColor",
  "MozTextEmphasisColor",
  "WebkitTextEmphasisColor",
  "MSTextEmphasisColor",
  "OTextEmphasisColor",
  "textEmphasisPosition",
  "MozTextEmphasisPosition",
  "WebkitTextEmphasisPosition",
  "MSTextEmphasisPosition",
  "OTextEmphasisPosition",
  "textEmphasisStyle",
  "MozTextEmphasisStyle",
  "WebkitTextEmphasisStyle",
  "MSTextEmphasisStyle",
  "OTextEmphasisStyle",
  "textIndent",
  "MozTextIndent",
  "WebkitTextIndent",
  "MSTextIndent",
  "OTextIndent",
  "textOrientation",
  "MozTextOrientation",
  "WebkitTextOrientation",
  "MSTextOrientation",
  "OTextOrientation",
  "textOverflow",
  "MozTextOverflow",
  "WebkitTextOverflow",
  "MSTextOverflow",
  "OTextOverflow",
  "textRendering",
  "MozTextRendering",
  "WebkitTextRendering",
  "MSTextRendering",
  "OTextRendering",
  "textShadow",
  "MozTextShadow",
  "WebkitTextShadow",
  "MSTextShadow",
  "OTextShadow",
  "textTransform",
  "MozTextTransform",
  "WebkitTextTransform",
  "MSTextTransform",
  "OTextTransform",
  "textUnderlinePosition",
  "MozTextUnderlinePosition",
  "WebkitTextUnderlinePosition",
  "MSTextUnderlinePosition",
  "OTextUnderlinePosition",
  "top",
  "MozTop",
  "WebkitTop",
  "MSTop",
  "OTop",
  "touchAction",
  "MozTouchAction",
  "WebkitTouchAction",
  "MSTouchAction",
  "OTouchAction",
  "transform",
  "MozTransform",
  "WebkitTransform",
  "msTransform",
  "OTransform",
  "transformBox",
  "MozTransformBox",
  "WebkitTransformBox",
  "MSTransformBox",
  "OTransformBox",
  "transformOrigin",
  "MozTransformOrigin",
  "WebkitTransformOrigin",
  "MSTransformOrigin",
  "OTransformOrigin",
  "transformStyle",
  "MozTransformStyle",
  "WebkitTransformStyle",
  "MSTransformStyle",
  "OTransformStyle",
  "transition",
  "MozTransition",
  "WebkitTransition",
  "MSTransition",
  "OTransition",
  "transitionDelay",
  "MozTransitionDelay",
  "WebkitTransitionDelay",
  "MSTransitionDelay",
  "OTransitionDelay",
  "transitionDuration",
  "MozTransitionDuration",
  "WebkitTransitionDuration",
  "MSTransitionDuration",
  "OTransitionDuration",
  "transitionProperty",
  "MozTransitionProperty",
  "WebkitTransitionProperty",
  "MSTransitionProperty",
  "OTransitionProperty",
  "transitionTimingFunction",
  "MozTransitionTimingFunction",
  "WebkitTransitionTimingFunction",
  "MSTransitionTimingFunction",
  "OTransitionTimingFunction",
  "turn",
  "MozTurn",
  "WebkitTurn",
  "MSTurn",
  "OTurn",
  "unicodeBidi",
  "MozUnicodeBidi",
  "WebkitUnicodeBidi",
  "MSUnicodeBidi",
  "OUnicodeBidi",
  "unset",
  "MozUnset",
  "WebkitUnset",
  "MSUnset",
  "OUnset",
  "verticalAlign",
  "MozVerticalAlign",
  "WebkitVerticalAlign",
  "MSVerticalAlign",
  "OVerticalAlign",
  "vh",
  "MozVh",
  "WebkitVh",
  "MSVh",
  "OVh",
  "visibility",
  "MozVisibility",
  "WebkitVisibility",
  "MSVisibility",
  "OVisibility",
  "vmax",
  "MozVmax",
  "WebkitVmax",
  "MSVmax",
  "OVmax",
  "vmin",
  "MozVmin",
  "WebkitVmin",
  "MSVmin",
  "OVmin",
  "vw",
  "MozVw",
  "WebkitVw",
  "MSVw",
  "OVw",
  "whiteSpace",
  "MozWhiteSpace",
  "WebkitWhiteSpace",
  "MSWhiteSpace",
  "OWhiteSpace",
  "widows",
  "MozWidows",
  "WebkitWidows",
  "MSWidows",
  "OWidows",
  "width",
  "MozWidth",
  "WebkitWidth",
  "MSWidth",
  "OWidth",
  "willChange",
  "MozWillChange",
  "WebkitWillChange",
  "MSWillChange",
  "OWillChange",
  "wordBreak",
  "MozWordBreak",
  "WebkitWordBreak",
  "MSWordBreak",
  "OWordBreak",
  "wordSpacing",
  "MozWordSpacing",
  "WebkitWordSpacing",
  "MSWordSpacing",
  "OWordSpacing",
  "wordWrap",
  "MozWordWrap",
  "WebkitWordWrap",
  "MSWordWrap",
  "OWordWrap",
  "writingMode",
  "MozWritingMode",
  "WebkitWritingMode",
  "MSWritingMode",
  "OWritingMode",
  "zIndex",
  "MozZIndex",
  "WebkitZIndex",
  "MSZIndex",
  "OZIndex",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "flex",
  "MozFlex",
  "WebkitFlex",
  "MSFlex",
  "OFlex",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "overflowScrolling",
  "MozOverflowScrolling",
  "WebkitOverflowScrolling",
  "MSOverflowScrolling",
  "OOverflowScrolling"
]

},{}],46:[function(require,module,exports){
var properties = require('./css-properties.js');
var React = require('react');

module.exports = function(props, propName, componentName) {
  var styles = props[propName];
  if (!styles) {
    return;
  }

  var failures = [];
  Object.keys(styles).forEach(function(styleKey){
    if (properties.indexOf(styleKey) === -1) {
      failures.push(styleKey);
    }
  });
  if (failures.length) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
  }
};

module.exports.isRequired = function(props, propName, componentName) {
  if (!props[propName]) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
  }
  return module.exports(props, propName, componentName);
};

module.exports.supportingArrays = React.PropTypes.oneOfType([
  React.PropTypes.arrayOf(module.exports),
  module.exports
]);


},{"./css-properties.js":45,"react":"react"}],47:[function(require,module,exports){
"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var E = React.createElement;
var MainScreen = require("./view/main");

var Main = function Main() {
	ReactDOM.render(E(MainScreen, {}), document.getElementById('root'));
};

Main();

},{"./view/main":58,"react":"react","react-dom":"react-dom"}],48:[function(require,module,exports){
"use strict";

var _require = require("mobx"),
    observable = _require.observable,
    action = _require.action,
    autorun = _require.autorun;

var dictionary = require("./dictionary");
var store = observable({
	sourceAddress: "2p1a0101",
	sourceHightlightAddress: '', //only highlight, not changing caret pos
	sourceSelectionRange: 0, //selecting source krange
	sourceSelection: [], //code mirror linech
	sourceSelectedText: "",
	sourceCaretTexts: "", //text from caret to punc
	targetSelection: [] });
var candidates = [];

var highlightSource = action(function (address) {
	store.sourceHightlightAddress = address;
});
var setSourceAddress = action(function (address) {
	store.sourceAddress = address;
});

var hasRange = function hasRange(sel) {
	if (sel.length !== 2) return false;
	return sel[0].line != sel[1].line || sel[0].ch != sel[1].ch;
};
var isLinkable = function isLinkable() {
	//source and target has selection
	var sourceHasRange = hasRange(store.sourceSelection);
	var targetHasRange = hasRange(store.targetSelection);
	return sourceHasRange && targetHasRange;
};

var isInsertable = function isInsertable() {
	//source and target has selection
	var sourceHasRange = hasRange(store.sourceSelection);
	return candidates.length && !store.targetHasRange;
};

var setSourceRange = action(function (range) {
	store.sourceSelectionRange = range;
});
var setSourceSelection = action(function (selections, text, caretTexts) {
	if (!selections || !selections.length) return;

	var sel = selections[0]; //only take first
	store.sourceSelection = sel;
	store.sourceSelectedText = text;
	store.sourceCaretTexts = caretTexts; //從游標到第一個標點
	//kranges , ranges of 1 token, 2 tokens and so on

	candidates = dictionary.find(caretTexts); //選取文字
});
var setTargetSelection = action(function (selections, text) {
	if (!selections || !selections.length) return;
	var sel = selections[0]; //only take first
	store.targetSelection = sel;
});
var getCandidate = function getCandidate() {
	return candidates;
};

module.exports = { store: store, setSourceAddress: setSourceAddress, highlightSource: highlightSource,
	setTargetSelection: setTargetSelection, getCandidate: getCandidate,
	setSourceRange: setSourceRange, setSourceSelection: setSourceSelection, isLinkable: isLinkable, isInsertable: isInsertable };

},{"./dictionary":49,"mobx":40}],49:[function(require,module,exports){
'use strict';

var dictionary = {
	'一': 'one',
	'一時': 'At one time',
	'比': ['compare', 'than'],
	'比丘': ['monk', 'monks', 'bhikkhu'],
	'正': ['correct', 'right'],
	'正觀': 'right insight',
	'如是我聞': 'Thus have I heard.',
	'心': 'mind',
	'解脫': ['liberate', 'liberates', 'liberated'],
	'若欲自證': 'if he wishes to declare himself',
	'者': 'one who'
};
var find = function find(caretTexts) {
	var out = [];
	for (var i = 0; i < caretTexts.length; i++) {
		var key = caretTexts[i][0];
		var translations = dictionary[key];
		if (!translations) continue;
		out.unshift([key, translations, caretTexts[i][1]]);
	}
	return out;
};
module.exports = { find: find };

},{}],50:[function(require,module,exports){
"use strict";

module.exports = {
	3: "Here and elsewhere, I adopt Pāli for proper names and doctrinal terms in order to facilitate comparison with the Pāli parallels, except for anglicised terms like Dharma and Nirvāṇa, without thereby intending to take a position on the original language of the Saṃyukta-āgama manuscript used for translation, which according to de Jong 1981: 108 would in fact have been Sanskrit.",
	4: "SN 22.12 at SN III 21,6 and SN 22.51 at SN III 51,11 do not give a full reference to the location or to the Buddha addressing the monks. Thus the E e edition of SN 22.12 reads evaṃ me sutaṃ, sāvatthiyaṃ tatra kho (as do B e and S e ), after which the discourse proper starts with rūpaṃ, bhikkhave, aniccaṃ, etc. In the case of C e the text has just sāvatthiyaṃ, i.e., without evaṃ me sutaṃ or tatra kho. The E e edition of SN 22.51 just reads sāvatthi, tatra voca, B e has sāvatthinidānaṃ, C e and S e just sāvatthiyaṃ. The full description given in SĀ 1, and thus at the outset of the Saṃyukta-āgama, is thus similar to the full reference given in the first discourse in the Saṃyutta-nikāya, SN 1.1 at SN I 1,1: evaṃ me sutam, ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme. This suggests the brief reference to sāvatthiyaṃ or else at times to sāvatthi nidānaṃ to be simply an abbreviation and quite probably not a reference to the location where the discourses were collected, as suggested by Rhys Davids 1924/1975: xif and Woodward 1930: xviif; cf. also below note 45, note 88 and note 148."
};

},{}],51:[function(require,module,exports){
"use strict";

module.exports = "\nThus have I heard. {2p1a0605-07|At one time} the Buddha was staying at {2p1a0609-12|S\u0101vatth\u012B} in {2p1a0612-14|Jeta's Grove}{fn3}, {2p1a0614-0702|An\u0101thapi\u1E47\u1E0Dika's Park}. {fn4}\n{2p1a0702-04|At that time} {2p1a0704-06|the Blessed One} said to the monks: \"You should contemplate bodily form as impermanent. One who contemplates like this has right insight.{fn5} One who has right insight arouses disenchantment. One who has disenchantment eradicates delight and lust. One who eradicates delight and lust, I say, liberates the mind.{fn6}\nIn the same way contemplate feeling ... perception ... formations ... consciousness as impermanent. One who contemplates like this has right insight. {fn7} One who has right insight arouses disenchantment. One who has disenchantment eradicates delight and lust. One who eradicates delight and lust, I say, liberates the mind.\nOne who has liberated the mind in this way, monks, if he wishes to declare himself is able to declare of himself: {fn8} 'Birth for me has been eradicated, the holy life has been established, what had to be done has been done, I myself know that there will be no receiving of any further existence.'\n(Just as with contemplating impermanence, in the same way also for dukkha, emptiness and not-self). {fn9}\nThen the monks, hearing what the Buddha had said, were delighted and received it respectfully. {fn10}\n";

},{}],52:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetchArticle = function fetchArticle(cor, address, markups, cb) {
  var range = cor.parseRange(address);
  var article = cor.articleOf(address);
  if (article) {
    cor.getArticleTextTag(article.at, function (res) {
      var fields = loadArticleMarkup(res.fields, markups, article.at);
      cb && cb({ address: address, article: article, rawlines: res.text, fields: fields, kpos: article.start });
    });
  }
};
var loadArticleMarkup = function loadArticleMarkup(oldfields, markups, article) {
  var fields = oldfields || {};
  if (markups && Object.keys(markups).length) {
    for (var type in markups) {
      if (markups[type][article]) {
        fields = Object.assign({}, fields, _defineProperty({}, type, markups[type][article]));
      }
    }
  }
  return fields;
};

module.exports = { fetchArticle: fetchArticle, loadArticleMarkup: loadArticleMarkup };

},{}],53:[function(require,module,exports){
"use strict";

var getSelection = function getSelection(cm) {
	//see ksana-corpus-view/selectionactivity.js
	var sels = cm.listSelections();
	var selections = [];
	for (var i = 0; i < sels.length; i++) {
		var sel = sels[i];
		if (sel.anchor.line == sel.head.line && sel.anchor.ch < sel.head.ch) {
			selections.push([sel.anchor, sel.head]);
		} else {
			selections.push([sel.head, sel.anchor]);
		}
	}
	return selections;
};
module.exports = { getSelection: getSelection };

},{}],54:[function(require,module,exports){
"use strict";

var serialize = function serialize(cm) {
	var cmmarks = cm.getAllMarks();
	var out = "";
	var marks = [];
	for (var i = 0; i < cmmarks.length; i++) {
		var cmmark = cmmarks[i];
		var linech = cmmark.find();
		if (linech.from) {
			if (cmmark.className == "source") {
				var from = cm.indexFromPos(linech.from);
				var to = cm.indexFromPos(linech.to);
				marks.push([from, to, cmmark.payload]);
			}
		} else {
			var _from = cm.indexFromPos(linech);
			var w = cmmark.replacedWith;
			if (!w) continue;
			if (w.className == "footnote") {
				marks.push([_from, _from, w.dataset.payload]);
			}
		}
	}
	marks.sort(function (a, b) {
		return a[0] - b[0];
	});

	var text = cm.getValue();
	var now = 0;
	for (var i = 0; i < text.length; i++) {

		if (now < marks.length && i == marks[now][1] && i > marks[now][0]) {
			//close tag
			out += "}";
			now++;
		}

		if (now < marks.length && i == marks[now][0]) {
			out += "{" + marks[now][2];
			if (marks[now][2].substr(0, 2) == "fn") {
				out += "}";
				now++;
			} else {
				out += "|";
			}
		}

		out += text.charAt(i);
	}
	return out;
};
var deserialize = function deserialize(rawdata) {
	var taglength = 0;
	var markups = []; // start,end, type
	var value = rawdata.replace(/\{.*?\}/g, function (m, idx) {
		var sep = m.indexOf("|");
		if (sep > 0) {
			//kpos
			var text = m.substr(sep + 1, m.length - sep - 2);
			var kpos = m.substr(1, sep - 1);
			markups.push([idx - taglength, idx - taglength + text.length, kpos]);
			taglength += kpos.length + 3;
			return text;
		} else {
			//fn
			markups.push([idx - taglength, idx - taglength, m]);
			taglength += m.length;
			return "";
		}
	});
	return { value: value, markups: markups };
};
module.exports = { deserialize: deserialize, serialize: serialize };

},{}],55:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;

var _require = require("mobx-react"),
    observer = _require.observer;

var _require2 = require("mobx"),
    autorun = _require2.autorun;

var _require3 = require("ksana-corpus-view"),
    CorpusView = _require3.CorpusView;

var _require4 = require("../unit/article"),
    _fetchArticle = _require4.fetchArticle;

var renderHead = function renderHead(_ref) {
	var cm = _ref.cm,
	    start = _ref.start,
	    end = _ref.end,
	    target = _ref.target;

	return cm.markText(start, end, { className: "head head" + target });
};
var caret = require("../model/caret");

var decorators = {
	'head': renderHead
};

var CView = function (_React$Component) {
	_inherits(CView, _React$Component);

	function CView(props) {
		_classCallCheck(this, CView);

		var _this = _possibleConstructorReturn(this, (CView.__proto__ || Object.getPrototypeOf(CView)).call(this, props));

		_this.state = { address: caret.store.sourceAddress,
			article: {}, rawlines: [], selection: 0 };
		return _this;
	}

	_createClass(CView, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			setTimeout(function () {
				this.fetchArticle(this.state.address);
			}.bind(this), 2000);
		}
	}, {
		key: "showtext",
		value: function showtext() {
			return JSON.stringify(this.props.cor.meta);
		}
	}, {
		key: "fetchArticle",
		value: function fetchArticle(address) {
			var _this2 = this;

			address = address || this.state.address;
			var cor = this.props.cor;
			if (!cor) return;
			_fetchArticle(cor, address, {}, function (res) {
				if (res.article.at !== _this2.state.article.at) {
					_this2.setState(res);
				}
			});
		}
	}, {
		key: "setAddress",
		value: function setAddress(e) {
			this.setState({ address: e.target.value });
		}
	}, {
		key: "setSelection",
		value: function setSelection(_ref2) {
			var cm = _ref2.cm,
			    selections = _ref2.selections,
			    selectionText = _ref2.selectionText,
			    corpus = _ref2.corpus,
			    caretTexts = _ref2.caretTexts,
			    ranges = _ref2.ranges;

			caret.setSourceRange(ranges[0]);
			caret.setSourceSelection(selections, selectionText, caretTexts);
			this.setState({ selection: ranges[0] });
		}
	}, {
		key: "inputkeypress",
		value: function inputkeypress(e) {
			if (e.key == "Enter") {
				this.fetchArticle(this.state.address);
			}
		}
	}, {
		key: "render",
		value: function render() {
			if (!this.props.cor) {
				return E("div", {}, "cor not opened");
			}

			var range = this.props.cor.stringify(this.state.selection);

			return E("div", {}, E("input", { value: this.state.address,
				onChange: this.setAddress.bind(this),
				onKeyPress: this.inputkeypress.bind(this) }), E("span", {}, range), E(CorpusView, {
				cor: this.props.cor,
				decorators: decorators,
				hlAddress: caret.store.sourceHightlightAddress,
				fields: this.state.fields,
				setSelection: this.setSelection.bind(this),
				article: this.state.article,
				rawlines: this.state.rawlines,
				address: caret.store.sourceAddress
			}));
		}
	}]);

	return CView;
}(React.Component);

module.exports = observer(CView);

},{"../model/caret":48,"../unit/article":52,"ksana-corpus-view":66,"mobx":40,"mobx-react":39,"react":"react"}],56:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;
var styles = {
	popup: {
		position: "absolute",
		padding: "5px"
	},
	container: {
		top: "-1em",
		position: "relative",
		zIndex: 200
	},
	button: {
		cursor: "pointer",
		color: "blue",
		background: "silver",
		borderRadius: "5px"
	}
};

var InsertWordPopup = function (_React$Component) {
	_inherits(InsertWordPopup, _React$Component);

	function InsertWordPopup(props) {
		_classCallCheck(this, InsertWordPopup);

		var _this = _possibleConstructorReturn(this, (InsertWordPopup.__proto__ || Object.getPrototypeOf(InsertWordPopup)).call(this, props));

		_this.state = { selected: 0 };
		return _this;
	}

	_createClass(InsertWordPopup, [{
		key: "setChoice",
		value: function setChoice(selected) {
			this.setState({ selected: selected });
		}
	}, {
		key: "renderChoice",
		value: function renderChoice(choice, key) {
			var defaultChecked = key == this.state.selected;
			return E("label", { key: key }, E("input", { type: "radio", "name": "choice", defaultChecked: defaultChecked,
				onChange: this.setChoice.bind(this, key) }), choice[0]);
		}
	}, {
		key: "insertTranslation",
		value: function insertTranslation(t) {
			var sourcetext = this.props.data[this.state.selected][0];
			var krange = this.props.data[this.state.selected][2];
			this.props.action(t, sourcetext, krange);
		}
	}, {
		key: "renderTranslation",
		value: function renderTranslation(choice, key) {
			var _this2 = this;

			if (!choice) return;
			var translations = choice[1];
			if (typeof translations == "string") {
				translations = [translations];
			}
			return E("span", {}, translations.map(function (t, key) {
				return E("span", { style: styles.button, key: key,
					onClick: _this2.insertTranslation.bind(_this2, t) }, t);
			}));
		}
	}, {
		key: "render",
		value: function render() {
			var choice = this.props.data[this.state.selected];

			return E("span", { style: styles.popup }, E("span", { style: styles.container }, E("span", {}, this.props.data.map(this.renderChoice.bind(this)), this.renderTranslation(choice))));
		}
	}]);

	return InsertWordPopup;
}(React.Component);

module.exports = InsertWordPopup;

},{"react":"react"}],57:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;
var styles = {
	popup: {
		position: "absolute",
		padding: "5px"
	},
	container: {
		top: "-1.5em",
		position: "relative",
		zIndex: 200
	},
	button: {
		cursor: "pointer",
		color: "blue",
		background: "silver",
		borderRadius: "5px"
	}
};

var LinkWordPopup = function (_React$Component) {
	_inherits(LinkWordPopup, _React$Component);

	function LinkWordPopup() {
		_classCallCheck(this, LinkWordPopup);

		return _possibleConstructorReturn(this, (LinkWordPopup.__proto__ || Object.getPrototypeOf(LinkWordPopup)).apply(this, arguments));
	}

	_createClass(LinkWordPopup, [{
		key: "render",
		value: function render() {
			return E("span", { style: styles.popup }, E("span", { style: styles.container }, E("button", { style: styles.button,
				onClick: this.props.action
			}, this.props.data)));
		}
	}]);

	return LinkWordPopup;
}(React.Component);

module.exports = LinkWordPopup;

},{"react":"react"}],58:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;
var CView = require("./cview");
var TranslationView = require("./translationview");

var openCorpus;
if (typeof KsanaCorpus !== "undefined") {
	openCorpus = KsanaCorpus && KsanaCorpus.openCorpus;
} else {
	var KSANACORPUS = "ksana-corpus";
	openCorpus = require(KSANACORPUS).openCorpus;
}

var SplitPane = require("react-split-pane");

var styles = {
	container: { display: "flex" },
	leftpanel: { flex: 3 },
	rightpanel: { flex: 2 }
};

var Main = function (_React$Component) {
	_inherits(Main, _React$Component);

	function Main(props) {
		_classCallCheck(this, Main);

		var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

		_this.state = { cor: null };
		return _this;
	}

	_createClass(Main, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			var _this2 = this;

			openCorpus("taisho", function (err, cor) {
				_this2.setState({ cor: cor });
			});
		}
	}, {
		key: "onChangeMainSize",
		value: function onChangeMainSize() {}
	}, {
		key: "render",
		value: function render() {
			return E("div", {}, E(SplitPane, { split: "vertical", minSize: 200,
				defaultSize: 800,
				style: { paddingBottom: "2em" }, //need this because splitPanel set height to 100%
				onChange: this.onChangeMainSize.bind(this)
			}, E("div", { style: styles.leftpanel }, E(TranslationView, { cor: this.state.cor })), E("div", { style: styles.rightpanel }, E(CView, { cor: this.state.cor }))));
		}
	}]);

	return Main;
}(React.Component);

module.exports = Main;

},{"./cview":55,"./translationview":59,"react":"react","react-split-pane":41}],59:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var ReactDOM = require("react-dom");
var E = React.createElement;

var _require = require("mobx-react"),
    observer = _require.observer;

var Codemirror = require("ksana-codemirror").Component;

var _require2 = require("../unit/serialization"),
    serialize = _require2.serialize,
    deserialize = _require2.deserialize;

var LinkWordPopup = require("./linkwordpopup");
var InsertWordPopup = require("./insertwordpopup");
var UnlinkPopup = require("./unlinkpopup");
var selection = require("../unit/selection");

var testdata = require("../testdata/n99");
var footnotes = require("../testdata/footnotes");
var caret = require("../model/caret");

var TranslationView = function (_React$Component) {
	_inherits(TranslationView, _React$Component);

	function TranslationView(props) {
		_classCallCheck(this, TranslationView);

		var _this = _possibleConstructorReturn(this, (TranslationView.__proto__ || Object.getPrototypeOf(TranslationView)).call(this, props));

		_this.state = { data: testdata, sourcemarkups: [],
			footnote: "", value: "", rawmode: true };
		return _this;
	}

	_createClass(TranslationView, [{
		key: "showFootNote",
		value: function showFootNote(e) {
			this.setState({ footnote: footnotes[e.target.innerHTML] });
		}
	}, {
		key: "createFootNote",
		value: function createFootNote(start, footnote) {
			var widget = document.createElement("span");
			widget.className = "footnote";
			widget.innerHTML = footnote.match(/fn(\d+)/)[1];
			widget.onmouseenter = this.showFootNote.bind(this);
			widget.dataset.payload = footnote;
			this.cm.setBookmark(start, { widget: widget, handleMouseEvents: true });
		}
	}, {
		key: "connectWithSource",
		value: function connectWithSource(start, end, payload) {
			this.cm.markText(start, end, { className: "source", payload: payload });
		}
	}, {
		key: "renderMarkups",
		value: function renderMarkups() {
			this.cm.getAllMarks().forEach(function (m) {
				return m.clear();
			});
			for (var i = 0; i < this.state.markups.length; i++) {
				var mrk = this.state.markups[i];
				var start = this.cm.posFromIndex(mrk[0]);
				var end = this.cm.posFromIndex(mrk[1]);
				var r = this.props.cor.parseRange(mrk[2]);
				if (r.start) {
					this.connectWithSource(start, end, mrk[2]);
				} else {
					this.createFootNote(start, mrk[2].substr(1, mrk[2].length - 2));
				}
			}
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			if (this.props.cor) {
				this.previewMode();
			}
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.cor !== this.props.cor && nextProps.cor && this.cm) {
				this.previewMode();
			}
		}
	}, {
		key: "setCM",
		value: function setCM(cmviewer) {
			if (!cmviewer) return;
			this.cm = cmviewer.getCodeMirror();
		}
	}, {
		key: "rawMode",
		value: function rawMode() {
			if (this.state.rawmode) return;
			var value = serialize(this.cm);
			this.setState({ rawmode: true, value: value, data: value });
		}
	}, {
		key: "previewMode",
		value: function previewMode() {
			var _this2 = this;

			if (!this.state.rawmode) return;

			var _deserialize = deserialize(this.state.data),
			    value = _deserialize.value,
			    markups = _deserialize.markups;

			this.setState({ rawmode: false, value: value, markups: markups }, function () {
				_this2.renderMarkups();
			});
		}
	}, {
		key: "sourcePosAtCursor",
		value: function sourcePosAtCursor(cm) {
			var cursor = cm.getCursor();
			var m = cm.findMarksAt(cursor);
			if (m.length) {
				return m[0].payload;
			}
		}
	}, {
		key: "clearPopup",
		value: function clearPopup() {
			this.popup && this.popup.clear();
			this.popup = null;
		}
	}, {
		key: "makelink",
		value: function makelink(e) {
			var start = caret.store.targetSelection[0];
			var end = caret.store.targetSelection[1];
			var payload = this.props.cor.stringify(caret.store.sourceSelectionRange);
			this.connectWithSource(start, end, payload);
			this.clearPopup();
		}
	}, {
		key: "unlink",
		value: function unlink() {
			var m = this.cm.findMarksAt(this.cm.getCursor());
			if (m && m[0]) {
				m[0].clear();
			}
			this.clearPopup();
		}
	}, {
		key: "moveToNextSourceWord",
		value: function moveToNextSourceWord(krange) {
			var r = this.props.cor.parseRange(krange);
			var nextsourcepos = this.props.cor.stringify(r.end);
			caret.setSourceAddress(nextsourcepos);
		}
	}, {
		key: "insertword",
		value: function insertword(translation, source, krange) {
			this.moveToNextSourceWord(krange);
			var address = this.props.cor.stringify(krange);
			this.clearPopup();
			setTimeout(function () {
				//need some time for candidates to update
				var start = this.cm.getCursor();
				var end = { line: start.line, ch: start.ch + translation.length };
				this.cm.replaceSelection(translation + " ");
				this.connectWithSource(start, end, address);
				this.cm.focus();
			}.bind(this), 100);
		}
	}, {
		key: "showPopup",
		value: function showPopup() {
			this.clearPopup();
			if (this.state.rawmode) return;
			var linkable = caret.isLinkable();
			var m = this.sourcePosAtCursor(this.cm);
			var insertable = caret.isInsertable();
			var Popup = null,
			    action = null,
			    data = "";
			if (linkable) {
				data = caret.store.sourceSelectedText;
				Popup = LinkWordPopup;
				action = this.makelink.bind(this);
			} else if (insertable && !m) {
				Popup = InsertWordPopup;
				data = caret.getCandidate();
				action = this.insertword.bind(this);
			} else if (m) {
				Popup = UnlinkPopup;
				action = this.unlink.bind(this);
			}

			if (Popup) {
				var cursor = caret.store.targetSelection[0];
				var widget = document.createElement("span");
				ReactDOM.render(E(Popup, { action: action, data: data }), widget);
				this.popup = this.cm.setBookmark(cursor, { widget: widget });
			}
		}
	}, {
		key: "onCursorActivity",
		value: function onCursorActivity(cm) {
			var _this3 = this;

			clearTimeout(this.timer);
			this.timer = setTimeout(function () {
				var m = _this3.sourcePosAtCursor(cm);
				caret.highlightSource(m);
				caret.setTargetSelection(selection.getSelection(cm));
				_this3.showPopup();
			}, 300);
		}
	}, {
		key: "render",
		value: function render() {
			return E("div", {}, E("button", { onClick: this.previewMode.bind(this) }, "Preview"), E("button", { onClick: this.rawMode.bind(this) }, "HTLL"), E("span", {}, this.state.footnote), E(Codemirror, { ref: this.setCM.bind(this),
				onCursorActivity: this.onCursorActivity.bind(this),
				value: this.state.value, theme: "ambiance" }));
		}
	}]);

	return TranslationView;
}(React.Component);

module.exports = observer(TranslationView);

},{"../model/caret":48,"../testdata/footnotes":50,"../testdata/n99":51,"../unit/selection":53,"../unit/serialization":54,"./insertwordpopup":56,"./linkwordpopup":57,"./unlinkpopup":60,"ksana-codemirror":"ksana-codemirror","mobx-react":39,"react":"react","react-dom":"react-dom"}],60:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var E = React.createElement;
var styles = {
	popup: {
		position: "absolute",
		padding: "5px"
	},
	container: {
		top: "-2em",
		position: "relative",
		zIndex: 200
	},
	button: {
		cursor: "pointer",
		color: "yellow",
		background: "red",
		borderRadius: "5px"
	}
};

var UnlinkPopup = function (_React$Component) {
	_inherits(UnlinkPopup, _React$Component);

	function UnlinkPopup() {
		_classCallCheck(this, UnlinkPopup);

		return _possibleConstructorReturn(this, (UnlinkPopup.__proto__ || Object.getPrototypeOf(UnlinkPopup)).apply(this, arguments));
	}

	_createClass(UnlinkPopup, [{
		key: "render",
		value: function render() {
			return E("span", { style: styles.popup }, E("span", { style: styles.container }, E("button", { style: styles.button,
				onClick: this.props.action
			}, "Unlink")));
		}
	}]);

	return UnlinkPopup;
}(React.Component);

module.exports = UnlinkPopup;

},{"react":"react"}],61:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;

const CMView=React.createClass({
	propTypes:{
		text:PT.string.isRequired
	}
	,componentDidMount:function(){
		this.loadText(this.props.text);
	}
	,shouldComponentUpdate:function(nextProps){
		return nextProps.text!==this.props.text;
	}
	,componentWillReceiveProps:function(nextProps){
		if (nextProps.text!==this.text) this.loadText(nextProps.text);
	}
	,loadText:function(newtext){
		this.text=newtext;
		this.cm.setValue(newtext);
	}
	,jumpToRange:function(from,to,cb){
		const cm=this.cm;
		cm.scrollIntoView({line:0,ch:0});
		cm.setCursor(from,{scroll:true});
		setTimeout(function(){
			if (from.line<cm.lineCount()){
				cm.scrollIntoView(from,200);
			}
			cb&&cb();
		},500);//wait for decorator
	}
	,scrollToText:function(t){
		var text=this.cm.getValue();
		var at=text.indexOf(t);
		if (at>-1) {
			var pos=this.cm.doc.posFromIndex(at);
			//scroll to last line , so that the paragraph will be at top
			cm.scrollIntoView({line:cm.doc.lineCount()-1,ch:0})
			if (pos.line) pos.line--;
			cm.scrollIntoView(pos);
		}
	}
	,getAllMarks:function(){
		return this.cm.getAllMarks();
	}
	,markText:function(){
		return this.cm.doc.markText.apply(cm.doc,arguments);
	}
	,getLine:function(i){
		return this.cm.getLine(i);
	}
	,onCopy:function(cm,evt){
		this.props.onCopy&&this.props.onCopy(cm,evt);
	}
	,onCut:function(cm,evt){
		this.props.onCut&&this.props.onCut(cm,evt);
	}
	,getCodeMirror:function(){
		return this.cm;
	}
	,setCM:function(cm){
		if (cm) this.cm=cm.getCodeMirror();
	}
	,render:function(){
		return E("div",{},
	  	E(CodeMirror,{ref:this.setCM,value:"",theme:this.props.theme,readOnly:true,
  	  onCursorActivity:this.props.onCursorActivity
  	  ,onCopy:this.onCopy
  	  ,onCut:this.onCut
  	  ,onFocus:this.props.onFocus
  	  ,onBlur:this.props.onBlur
  	  ,extraKeys:this.props.extraKeys
  	  ,onViewportChange:this.props.onViewportChange})
  	 )
	}
})
module.exports=CMView;
},{"ksana-codemirror":"ksana-codemirror","react":"react"}],62:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CMView=require("./cmview");
const is_iOS = navigator.userAgent.match(/(iphone|ipod|ipad)/i) != null;

var search,getArticleHits,stringifyRange;
if (typeof KsanaCorpus!=="undefined") {
	search=KsanaCorpus.openCorpus;
	getArticleHits=KsanaCorpusSearch.getArticleHits;
	stringifyRange=KsanaCorpus.stringifyRange;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	const KSANACORPUS="ksana-corpus";
	openCorpus=require(KSANACORPUS).openCorpus;
	getArticleHits=require(KSANACORPUSSEARCH).getArticleHits;
	stringifyRange=require(KSANACORPUS).stringifyRange;
}

const decorate=require("./decorate").decorate;
const decorateUserField=require("./decorate").decorateUserField;
const decoratePageStarts=require("./decorate").decoratePageStarts;
const USER_FIELD_PREFIX=require("./decorate").USER_FIELD_PREFIX;
const decorateHits=require("./decorate").decorateHits;
const selectionActivity=require("./selectionactivity");
const followLinkButton=require("./followlinkbutton");
const hitButton=require("./hitbutton");
const hasUserLinkAt=require("./link").hasUserLinkAt;
const hasLinkAt=require("./link").hasLinkAt;

const CorpusView=React.createClass({
	propTypes:{
		corpus:PT.string,
		cor:PT.object,
		corpora:PT.object,//open corpus 
		address:PT.oneOfType([PT.string.isRequired,PT.number.isRequired]),
		rawlines:PT.array.isRequired,
		article:PT.object.isRequired,
		theme:PT.string,
		layout:PT.array,
		active:PT.bool, //in active tab
		onCursorActivity:PT.func,
		onViewport:PT.func,
		onCopyText:PT.func, //custom copy handler
		setSelection:PT.func, //used by selectionactivity
		updateArticleByAddress:PT.func,
		extraKeys:PT.object,
		fields:PT.object,
		userfield:PT.object,
		showPageStart:PT.bool
	}
	,getInitialState:function(){
		const updateTime=new Date();
		return {text:"",linebreaks:[],pagebreaks:[],updateTime};
	}
	,setupDecoratorActions:function(){
		//prepare actions for decorators
		this.actions={};
		for (var i in this.props) {
			if (typeof this.props[i]==="function") {
				this.actions[i]=this.props[i];
			}
		}
		this.actions.highlightAddress=this.highlightAddress;
	}
	,highlightAddress:function(address){
		const r=this.cor.parseRange(address);
		const k=this.toLogicalRange(r.range);;
		this.highlight(k.start,k.end);
	}
	,clearLinkButtons:function(){
		if (this.userlinkbuttons) {
			this.userlinkbuttons.clear&&this.userlinkbuttons.clear();
			this.userlinkbuttons=null;
		}
		if (this.multilinkbuttons) {
			this.multilinkbuttons.clear&&this.multilinkbuttons.clear();
			this.multilinkbuttons=null;
		}
	}
	,clearHitButtons:function(){
		if (this.hitbuttons) {
			this.hitbuttons.clear();
			this.hitbuttons=null;
		}
	}
	,clearHighlight:function(){
		if(this.highlighmarker) {
			this.highlighmarker.clear();		
			this.highlighmarker=null;
		}
	}
	,highlight:function(start,end){
		if (!this.cm)return;
		this.clearHighlight();
		this.highlighmarker=this.cm.markText(start,end,{className:"highlight",clearOnEnter:true});
	}
	,componentDidUpdate(){
		this.scrollToAddress(this.props.address);
	}
	,componentDidMount:function(){
		if (!this.props.corpus && !this.props.cor) {
			if(this.props.text) this.setState({text:this.props.text.join("\n")});
			return;
		}
		this.loadtext();
	}
	,loadtext:function(props){
		props=props||this.props;

		this.cor=props.cor?props.cor:openCorpus(props.corpus);
		this.markinview={};//fast check if mark already render, assuming no duplicate mark in same range
		this.markdone={};
		props.removeAllUserLinks&&props.removeAllUserLinks(props.corpus);
		this.setupDecoratorActions();
		decorateUserField.call(this,{},props.userfield);//this will unpaint all fields

		this.layout(props.article,props.rawlines,props.address,props.layout);
	}
	,textReady:function(){
		getArticleHits({cor:this.cor,lines:this.state.lines,linebreaks:this.state.linebreaks,
			article:this.props.article,
			pagebreaks:this.state.pagebreaks,searchresult:this.props.searchresult},function(hits){
				decorateHits.call(this,hits);

				this.articleHits=hits;
				this.onViewportChange(this.cm);

				if (this.props.showPageStart) {
					setTimeout(function(){
						decoratePageStarts.call(this);
					}.bind(this),10);
				}
				setTimeout(function(){
					this.scrollToAddress(this.props.address);
				}.bind(this),200);
		}.bind(this));
	}
	,componentWillUnmount:function(){
		this._unmounted=true;
		if (!this.cm)return;
		this.cm.getAllMarks().forEach(function(m){m.clear()}); //might not need this
		this.cm.setValue("");
	}
	,shouldComponentUpdate:function(nextProps,nextState){
		const scu=(  nextProps.corpus!==this.props.corpus||nextProps.cor!==this.props.cor
			||nextProps.address!==this.props.address
			||nextProps.layout!==this.props.layout
			||nextProps.fields!==this.props.fields
			||nextState.text!==this.state.text);
		return scu;
	}
	,inViewPort:function(line){
		const vp=this.cm.getViewport();
		const from=vp.from,to=vp.to;
		return (line>=from && line<=vp.to);
	}
	,removeDeleteFields:function(fields){
		const newmarkinview={};
		for (var id in this.markinview){
			const type=id.match(/(.*?)_/)[1];
			if (!fields[type] && type[0]!==USER_FIELD_PREFIX) { //user field
				const miv=this.markinview[id];
				if (!miv) continue;
				if (miv instanceof Array) {
					miv.forEach(function(m){m.clear()});
				} else {
					miv.clear();
				}
			} else {
				newmarkinview[id]=this.markinview[id];
			}
		};
		this.markinview=newmarkinview;
	}
	,componentWillReceiveProps:function(nextProps){//cor changed
		if (nextProps.article.at!==this.props.article.at||
			nextProps.layout!==this.props.layout||nextProps.corpus!==this.props.corpus||nextProps.cor!==this.props.cor) {
			this.loadtext(nextProps);
			return;
		}

		if (nextProps.fields!==this.props.fields) {
			this.removeDeleteFields(nextProps.fields);
			this.onViewportChange();			
		}

		if (nextProps.userfield && nextProps.userfield !== this.props.userfield) { //user field should have id			
//			if (Object.keys(nextProps.userfield).length)debugger
			decorateUserField.call(this,nextProps.userfield,this.props.userfield);
			//decorateUserField might clearWorking Link , call viewportchange to repaint
			this.onViewportChange();
			this.clearLinkButtons();
			this.clearHitButtons();
		}

		//if (this.cm && nextProps.active)this.cm.focus();

		if (this.props.address!==nextProps.address ) { //need by updateArticleByAddress
			const r=this.cor.toLogicalRange(this.state.linebreaks,nextProps.address,this.getRawLine);
			if (!r || r.start.line<0)return;

			if (!this.inViewPort(r.start.line)) {
				this.scrollToAddress(nextProps.address);
			} else {
				if (this.noSelection(this.cm)) {
					this.cm.setCursor(r.start);
				}
			}
		}
		if (this.props.hlAddress!==nextProps.hlAddress
			&&nextProps.hlAddress) {
			this.highlightAddress(nextProps.hlAddress);
		}
	}	
	,clearSelection:function(){
		const cursor=this.cm.getCursor();
		this.cm.doc.setSelection(cursor,cursor);
	}
	,toLogicalRange:function(range){
		return this.cor.toLogicalRange(this.state.linebreaks,range,this.getRawLine);
	}
	,toLogicalPos:function(kpos,tailing){
		return this.cor.toLogicalPos(this.state.linebreaks,kpos,this.getRawLine,tailing);
	}
	,fromLogicalPos:function(linech){
		if (!this.cor)return;
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const text=this.cm.doc.getLine(linech.line);
		const lb=this.state.linebreaks[linech.line];
		if (typeof text==="undefined") return this.props.article.end;
		return this.cor.fromLogicalPos(text,linech,lb,firstline,this.getRawLine);
	}
	,getRawLine:function(line){
		return this.props.rawlines[line];
	}
	,scrollToAddress:function(address){
		if (!this.cor)return;
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		if (!r || r.start.line<0)return;
		if (this.viewer) {
			if (r.start==r.end) {
				const rr=this.cor.toLogicalPos(this.state.linebreaks,address,this.getRawLine,true);
				this.viewer.jumpToRange(rr,rr,this.highlightAddress.bind(this,address));
			} else {
				this.viewer.jumpToRange(r.start,r.end,this.highlightAddress.bind(this,address));
			}
		}
	}
	,layout:function(article,rawlines,address,playout){
		if (!rawlines) {
			return;
		}
		const cor=this.cor;
		if (!address){ //scroll to the selection after layout
			address=this.kRangeFromCursor(this.cm);
		}
		const o=cor.layoutText(rawlines,article.start,playout)
		const text=o.lines.join("\n");
		const updateTime=new Date();
		this.setState({updateTime,linebreaks:o.linebreaks,pagebreaks:o.pagebreaks,text:text,lines:o.lines}, this.textReady );
	}
	,kRangeFromSel:function(cm,from,to){
		if (!this.cor)return;
		if (!from||!to)return 0;
		const f=this.cor.fromLogicalPos.bind(this.cor);
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const s=f(cm.doc.getLine(from.line),from,this.state.linebreaks[from.line],firstline,this.getRawLine,true);
		const e=f(cm.doc.getLine(to.line),to,this.state.linebreaks[to.line],firstline,this.getRawLine,true);
		return this.cor.makeRange(s,e);
	}
	,kRangeFromCursor:function(cm){
		if (!cm)return;
		const sels=cm.listSelections();
		if (!sels.length) return null;

		var from=sels[0].anchor,to=sels[0].head,temp;
		if (from.line>to.line||(from.line==to.line && from.ch>to.ch)) {
			temp=from;from=to;to=temp;
		}
		return this.kRangeFromSel(cm,from,to);
	}
	,onCut:function(cm,evt){
		const krange=this.kRangeFromCursor(cm);
		evt.target.value=this.cor.stringify(krange);
		evt.target.select();//reselect the hidden textarea
	}
	,onCopy:function(cm,evt){
		/*1p178a0103-15 copy and paste incorrect*/
		/* TODO,  address error crossing a page, has line 30 */
		const krange=this.kRangeFromCursor(cm);
		if (this.props.copyText) { //for excerpt copy
			evt.target.value=this.props.copyText(
				{cm:cm,value:evt.target.value,krange:krange,cor:this.cor,fields:this.props.fields});
			evt.target.select();
		}
	}
	,noSelection:function(cm){
		const sels=cm.listSelections();	
		if (sels.length!==1)false;
		const s=sels[0].anchor,e=sels[0].head;
		return s.line==e.line&&s.ch==e.ch;
	}
	,showDictHandle:function(cm){
		this.dicthandle&&this.dicthandle.clear();
		if (!cm.hasFocus())return;
		var widget=document.createElement("span");
		widget.className="dicthandle";
		widget.innerHTML="佛光";
		this.dicthandle=cm.setBookmark(cm.getCursor(),{widget:widget,handleMouseEvents:true});
	}
	,onBlur:function(cm){
		this.dicthandle&&this.dicthandle.clear();
	}
	,autoFollow(linkbuttons){
		const widget=linkbuttons&&linkbuttons.replacedWith;
		if (widget){
			var target=widget;
			if (target.children.length==1) target=target.children[0];
			const mouseover=widget.onmouseoever||widget.children[0].onmouseover;
			const mousedown=widget.onmouseodown||widget.children[0].onmousedown;
			if (!mouseover&&!mousedown) return;

			setTimeout(function(){
				mouseover&&mouseover({target});
				mousedown&&mousedown({target});				
				linkbuttons.clear();
			},5);
		}
	}
	,onCursorActivity:function(cm){
		if (!this.cor) return;
		clearTimeout(this.cursortimer);
		if (is_iOS) document.activeElement.blur();
		this.cursortimer=setTimeout(function(){
			if (this._unmounted)return;
			const cursor=cm.getCursor();
			const kpos=this.fromLogicalPos(cursor);
			selectionActivity.call(this,cm,this.cor,this.fromLogicalPos);

			this.clearLinkButtons();
			this.clearHitButtons();
			this.clearHighlight();
			if (this.noSelection(cm)) {				
				const userlinks=hasUserLinkAt(kpos,this.props.userfield);
				this.userlinkbuttons=followLinkButton(cm,userlinks,this.actions,this.props.corpora);

				const multilinks=hasLinkAt(this.cor,kpos,this.props.fields,this.props.corpora,stringifyRange);

				this.multilinkbuttons=(this.props.followLinks||followLinkButton)(cm,multilinks,this.actions,this.props.corpora);
				//custom buttons return false (too few links), use default 
				if (!this.multilinkbuttons) {
					this.multilinkbuttons=followLinkButton(cm,multilinks,this.actions,this.props.corpora);
				}
				const updateSince=new Date() - this.state.updateTime;
				//prevent update from aux to trigger change to aux
				if(this.props.autoFollowSingleLink && updateSince>1500){
					this.autoFollow(this.multilinkbuttons);
				}
				this.hitbuttons=hitButton(cm,kpos,this.articleHits,this.actions);
			}
			//this.showDictHandle(cm);	
			if (is_iOS) document.activeElement.blur();
			this.props.onCursorActivity&&this.props.onCursorActivity(cm,kpos);
			if (is_iOS) document.activeElement.blur();
		}.bind(this),300);
	}
	,onViewportChange:function(cm,from,to){
		cm=cm||this.cm;
		if (!cm)return;
		clearTimeout(this.viewporttimer);
		this.viewporttimer=setTimeout(function(){
			const vp=cm.getViewport();
			const from=this.fromLogicalPos({line:vp.from,ch:0});
			var to=this.fromLogicalPos({line:vp.to,ch:0});
			if (to<from) to=this.props.article.end;
			decorate.call(this,from,to);
			this.onViewport&&this.onViewport(cm,vp.from,vp.to,from,to); //extra params start and end kpos
			this.addresschanged=true;
		}.bind(this),50);
	}
	,setCM:function(cmviewer){
		if (cmviewer) {
			this.viewer=cmviewer;
			this.cm=cmviewer.getCodeMirror();
		}
	}
	,render:function(){
		if (!this.state.text) return E("div",{},"loading...");
		const props=Object.assign({},this.props,
			{ref:this.setCM,
			text:this.state.text,
			onCursorActivity:this.onCursorActivity,
			onCut:this.onCut,
			onCopy:this.onCopy,
			onBlur:this.onBlur,
			extraKeys:this.props.extraKeys,
			onViewportChange:this.onViewportChange,
			articlename:this.props.article.articlename,
			theme:this.props.theme
			}
		);
		return E(CMView,props);
	}
})
module.exports=CorpusView;
},{"./cmview":61,"./decorate":63,"./followlinkbutton":64,"./hitbutton":65,"./link":67,"./selectionactivity":68,"react":"react"}],63:[function(require,module,exports){
const clearWorkingLink=require("./link").clearWorkingLink;
const makeMarkerId=require("./link").makeMarkerId;
const USER_FIELD_PREFIX="#";

//for field with same starting position,
//the short one comes later, so that it will not be overwrite by longer span
const reOrderField=function(cor,pos,value){
	var arr=[];
	for (var i=0;i<pos.length;i++) {
		arr.push([pos[i],value?value[i]:null]);
	}
	arr.sort(function(a,b){
		const r1=cor.parseRange(a[0]); //parse range is slow , don't why?
		const r2=cor.parseRange(b[0]);
		if (r1.start!==r2.start) return r1.start-r2.start;//start has higher priority

		return r2.end-r1.end;
	});
	var out={pos:[],value:[]};
	for (var i=0;i<arr.length;i++) {
		out.pos.push(arr[i][0]);
		out.value.push(arr[i][1]);
	}
	return out;
}
const decorateField=function(fname,_pos,_value,decorator,fromkpos,tokpos,fields){
	var i=0;
	//const rr=reOrderField(this.cor,_pos,_value);
	const rr={value:_value,pos:_pos};
	const pos=rr.pos,value=rr.value;
	if (!pos)return;
	var decorated=0;
	while (i<pos.length) {
		const id=i;
		const range=this.cor.parseRange(pos[i]);
		
		if (typeof fromkpos!=="undefined"&& typeof tokpos !=="undefined"){
			if (!((range.start>fromkpos && range.start<tokpos)
			|| (range.end>fromkpos && range.end<tokpos) )){
				i++;
				continue;
			}
		}

		if (this.markinview[makeMarkerId(fname,range)]) {
			i++
			continue;
		}

		const p=pos[i],v=value?value[i]:"";
		var target=v, multitarget=false;
		i++;

		while (i<pos.length && this.cor.parseRange(pos[i]).start==range.start) {
			if (!multitarget) target=[target];
			target.push(value?value[i]:i);
			multitarget=true;
			i++;
		}
		var r;
		if (this.cor.isRange(p)){
			//by default enclose the concrete words closely
			r=this.toLogicalRange(p);
		} else {
			//tailing = false to paint just after concrete char
			//skipleading to true, so that number of footnotes will stay at begining of line
			var r2=this.toLogicalPos(p,false);
			r={start:r2,end:r2};
		}

		const markerid=makeMarkerId(fname,range);
		const done=this.markdone[markerid];
		decorated++;

		this.markinview[markerid]=decorator({cm:this.cm,cor:this.cor,start:r.start,end:r.end,
			corpus:this.props.corpus,
			field:fname,
			fields:fields,
			kpos:range.start,krange:range,tabid:this.props.id,id:id,target:target,
			multitarget:multitarget,actions:this.actions,done:done});

	}
	//console.log("decorated",decorated,fname)
}

const sortFields=function(fields){
	const out=[];
	for (var id in fields) {
		const field=fields[id];
		const r=this.cor.parseRange(field.from);
		out.push([r.range, field]);
	}
	out.sort(function(a,b){return a[0]-b[0]});
	const pos=out.map(function(i){return i[0]});
	const value=out.map(function(i){return i[1]});

	return {pos:pos,value:value};
}
const groupByDecorator=function(pos,value){
	const out={};
	for (var i=0;i<value.length;i++) {
		const v=value[i];
		if (!out[v.decorator]) out[v.decorator]={pos:[],value:[]};
		out[v.decorator].pos.push(pos[i]);
		out[v.decorator].value.push(v);
	}
	return out;
}

const removeDeletedUserField=function(fields, oldfields){
	for (var id in oldfields) {
		const old=oldfields[id];
		const markerid=USER_FIELD_PREFIX+makeMarkerId(old.decorator,old.range);
		if (!fields[id]) {
			const m=this.markinview[markerid];
			if (m){
				m.clear();
				delete this.markinview[markerid];
				clearWorkingLink.call(this,id,false);
			}
		}
	}
}
const getDecorator=function(fieldname) {
	var decoratorname=fieldname;
	const at=fieldname.indexOf("<");
	if (at>0) decoratorname=decoratorname.substr(0,at);

	return this.props.decorators[decoratorname];
}
const decorateUserField=function(_fields, oldfields){

	removeDeletedUserField.call(this,_fields,oldfields);
	const ff=sortFields.call(this,_fields);
	for (var _f in _fields) { //remove all worling link marker, force redraw
		clearWorkingLink.call(this,_f,true);
	}

	const fields=groupByDecorator(ff.pos,ff.value);
	for (var name in fields) {
		decoratorname=name;
		const at=name.indexOf("@");
		if (at>0) decoratorname=decoratorname.substr(0,at);
		const decorator=getDecorator.call(this,name);;
		decorator&&decorateField.call(this,USER_FIELD_PREFIX+name,fields[name].pos,fields[name].value,decorator);
	}
}

const decorate=function(fromkpos,tokpos,oldfields){
	for (var fname in this.props.fields) {
		if (!this.props.fields[fname]) continue;
		const pos=this.props.fields[fname].pos, value=this.props.fields[fname].value;		
		const decorator=getDecorator.call(this,fname);
		decorator&&decorateField.call(this,fname,pos,value,decorator,fromkpos,tokpos,this.props.fields);
	}
}
const decorateHits=function(phrasehits){
	if (!phrasehits)return;
	if (!this._hits) this._hits=[];
	else {
		this._hits.forEach(function(h){h.clear()});
		this._hits=[];			
	}

	for (var i=0;i<phrasehits.length;i++) {
		const hits=phrasehits[i].hits;
		const hitsend=phrasehits[i].hitsend;

		for (var j=0;j<hits.length;j++) {
			const r=this.toLogicalRange(  this.cor.makeRange(hits[j],hitsend[j]));

			const marker=this.cm.markText(r.start,r.end,{className:'hl'+i});
			this._hits.push(marker);
		}
	}
}
const decoratePageStarts=function(){
	if (!this._pageStarts) this._pageStarts=[];
	else {
		this._pageStarts.forEach(function(pagestart){pagestart.clear()});
		this._pageStarts=[];			
	}
	const regexpb=/p(\d+[a-z]?)/;
	for (var i=0;i<this.state.pagebreaks.length;i++) {
		const pb=this.state.pagebreaks[i];
		const linech=this.toLogicalRange(pb);
		const ele=document.createElement("div");
		const label=document.createElement("span");
		label.className="pblabel"

		label.innerHTML=this.cor.stringify(pb).match(regexpb)[1];
		ele.appendChild(label);
		ele.className="pb";
		this._pageStarts.push(this.cm.doc.addLineWidget(linech.start.line, ele,{above:true}));
	}
}
module.exports={decorate:decorate,decorateField:decorateField,decorateUserField:decorateUserField
,decoratePageStarts:decoratePageStarts,decorateHits:decorateHits,USER_FIELD_PREFIX:USER_FIELD_PREFIX};
},{"./link":67}],64:[function(require,module,exports){
/*TODO show multiple link 
highlight range when hover

yinshun@57p1262.1301 has two sources

*/
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
var stringifyRange=null;
if (typeof KsanaCorpus!=="undefined") {
	stringifyRange=KsanaCorpus.stringifyRange;
} else {
	const KSANACORPUS="ksana-corpus"
	stringifyRange=require(KSANACORPUS).stringifyRange;
}

const getLinkLabel=function(link,corpora){
	var linklabel=link.to;
	if (!corpora) {
		return linklabel;
	}

	const cor=corpora[link.corpus]; //not open yet
	if (!cor) {
		if (typeof linklabel=="number") {
			const l=linklabel=stringifyRange(linklabel,link.corpus);
			if (l) return l;
		}
		return (typeof link.to=="string")?link.to:link.corpus;
	}
	const shortname=typeof (link.to!=="number")?cor.getGroupName(link.to):"";
	if (typeof linklabel=="number") {
		linklabel=link.corpus+"@"+cor.stringify(linklabel);
	}
	linklabel=linklabel.replace(/\..*/,"");//remove after page,make it shorter;
	if (shortname) linklabel=shortname+"p"+linklabel.replace(/.+p/,"");
	return linklabel;
}
const followLink=function(cm,links,actions,corpora){
	if (!links)return;
	if (!Object.keys(links).length) return;

	const onMouseDown=function(e){
		e.stopPropagation&&e.stopPropagation();
		actions.openLink(e.target.target);
	}

	const onMouseOver=function(e){
		const link=links[e.target.id];
		if (link && link.from) actions.highlightAddress(link.from);
	}

	var widget=document.createElement("span");
	widget.className="followbuttongroup";
	
	for (var id in links) {
		var child=document.createElement("span");
		child.onmousedown=onMouseDown;
		child.onmouseover=onMouseOver;	
		child.className="followbutton"

		const linklabel=getLinkLabel(links[id],corpora);
		child.target=links[id].corpus+"@"+links[id].to;
		child.innerHTML=linklabel;
		child.id=id;
		widget.appendChild(child);
	}
	
	const insertat={line:cm.getCursor().line,ch:cm.getCursor().ch}
	return cm.setBookmark(insertat,{widget:widget,handleMouseEvents:true});
}

module.exports=followLink;
},{"react":"react","react-dom":"react-dom"}],65:[function(require,module,exports){
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const hasHitAt=require("./link").hasHitAt;
const _=require("ksana-localization")._;

const HitButtons=React.createClass({
	prev:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit-1;
		if (n>=0) {
			this.props.updateArticleByAddress(phrasehits[n]);
		}
	},
	canNext:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit+1;
		return (n<phrasehits.length) 	;
	},
	next:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit+1;
		if (this.canNext()){
			this.props.updateArticleByAddress(phrasehits[n]);
		}
	},
	render:function(){
		return E("div",{},
			this.props.nhit?E("span",{className:"hitbutton",onClick:this.prev},_("Prev Hit")):null,
			" ",
			this.canNext()?E("span",{className:"hitbutton",onClick:this.next},_("Next Hit")):null
		)
	}
})

const hitButton=function(cm,kpos,articlehits,actions){
	const phrasehit=hasHitAt(kpos,articlehits);
	if (!phrasehit) return null;
	var widget=document.createElement("span");
	widget.className="hitbuttongroup";
	ReactDOM.render(E(HitButtons,{articlehits:articlehits,nhit:phrasehit.nhit,
		updateArticleByAddress:actions.updateArticleByAddress,  phrase:phrasehit.phrase}),widget);

	const insertat={line:cm.getCursor().line,ch:cm.getCursor().ch}
	return cm.setBookmark(insertat,{widget:widget,handleMouseEvents:false});	
}

module.exports=hitButton;

},{"./link":67,"ksana-localization":69,"react":"react","react-dom":"react-dom"}],66:[function(require,module,exports){
const CorpusView=require("./corpusview");
module.exports={CorpusView:CorpusView};
},{"./corpusview":62}],67:[function(require,module,exports){
var bsearch=null,trimArticleField=null

if (typeof KsanaCorpus!=="undefined") {
	trimArticleField=KsanaCorpus.trimArticleField;
	bsearch=KsanaCorpus.bsearch;
} else {
	const KSANACORPUS="ksana-corpus";
	trimArticleField=require(KSANACORPUS).trimArticleField;
	bsearch=require(KSANACORPUS).bsearch;
}


const BILINKREGEX=/.*</;

const	getWorkingLinks=function(workinglinks,prefix,article){
	const fields=trimArticleField(workinglinks,article);
	const value=fields.value.map( function(v){return  prefix+"@"+v});
	return {pos:fields.pos,value:value};
}
const makeWLinkId=function(kpos,address){
	return kpos.toString(36) +"_"+address.replace(/.+@/,"");
}
const parseWLinkId=function(wlinkid){
	return parseInt(wlinkid.replace(/_.+/,""),36);
}
const makeMarkerId=function(prefix,rangeobj){
	if (typeof rangeobj=="number") {
		return prefix+"_"+rangeobj;
	}
	if (rangeobj.start==rangeobj.end) {
		return prefix+"_"+rangeobj.start;
	} else {
		return prefix+"_"+rangeobj.range;
	}
}
const hasLinkAt=function(cor,kpos,fields,corpora,stringifyRange) {
	var out=[];
	for (var name in fields) {
		const field=fields[name];
		if (!field || !field.pos || !field.pos[0])continue;
		if (name=="jpeg"||name=="png") return;

		if (!cor.isRange(field.pos[0])) continue;

		var targetcorpus=name.replace(BILINKREGEX,"");
		if (targetcorpus==name) targetcorpus=cor.id;

		//cannot have valid target in field.value
		if (name=="rend" || name=="head")continue;
		for (var i=0;i<field.pos.length;i++) {
			const r=cor.parseRange(field.pos[i]);
			if (kpos>=r.start && kpos<=r.end) {
				var to=field.value[i];
				if (to&&to[0]=="<") continue;
				if (to&&to.length>100) continue;
				if (typeof to=="number") {
					const str_to=stringifyRange(to,targetcorpus);
					if (str_to) to=str_to;
				}
				out.push({id:i,corpus:targetcorpus,from:field.pos[i],to:to});
			}
		}
	}
	return out;
}
const hasUserLinkAt=function(kpos,userfields){
	const out={};
	for (var id in userfields) {
		const field=userfields[id];
		if (kpos>=field.start && kpos<=field.end) out[id]=field;
	}
	return out;
}

const clearWorkingLink=function(f,done){
	if (!this.markinview ||!this.markdone)return;
	const p=parseWLinkId(f);
	const markerid=makeMarkerId("wlink",p);
	const m=this.markinview[markerid];
	if (m) {
		m.clear();
		if (done){
			this.markdone[markerid]=done;	
		} else if (this.markdone[markerid]) {
			delete this.markdone[markerid];
		}
		delete this.markinview[markerid];
	}	
}

const hasHitAt=function(kpos,articlehits){
	if (!articlehits)return null;
	for (var i=0;i<articlehits.length;i++) {
		const phrase=articlehits[i];
		const hits=articlehits[i].hits;
		const at=bsearch(hits,kpos+1 ,true)-1;
		if (hits[at]-1<kpos && hits[at]+(phrase.lengths[at]||phrase.lengths)>=kpos) {
			return {phrase:i,nhit:at};
		}
	}
	return null;
}

module.exports={getWorkingLinks:getWorkingLinks,makeWLinkId:makeWLinkId,parseWLinkId:parseWLinkId,
	hasLinkAt:hasLinkAt,hasUserLinkAt:hasUserLinkAt,makeMarkerId:makeMarkerId,clearWorkingLink:clearWorkingLink,
hasHitAt:hasHitAt};
},{}],68:[function(require,module,exports){
const getCaretText=function(cm,sel){ //get caretText for checking dictionary
	var line=sel.head.line,ch=sel.head.ch;
	//get caret from left of selection
	if (sel.head.line>sel.anchor.line ||
		 (sel.head.line==sel.anchor.line && sel.anchor.ch<sel.head.ch)) {
		line=sel.anchor.line,ch=sel.anchor.ch;
	}
	//if (ch>1) ch-=1; //include two char before
	//should check punc backward
	var caretText=cm.doc.getRange({line:line,ch:ch},{line:line+1,ch:256});
	caretText=caretText.replace(/\r?\n/g,"");
	const m=caretText.match(/^[.？,。，！；「」『』—－：、（）〈〉｛｝【】《》]*(.*?)[.？,。，！；「」『』—－：、（）｛｝【】〈〉《》]/);
	if (m){
		caretText=m[1];
	}
	return caretText;
}
/*
	from caret, return first n token and it's kpos
	for DharmaCAT
*/
const getCaretTexts=function(cm,sel,cor,fromlogicalpos){
	var line=sel.head.line,ch=sel.head.ch;
	//get caret from left of selection
	if (sel.head.line>sel.anchor.line ||
		 (sel.head.line==sel.anchor.line && sel.anchor.ch<sel.head.ch)) {
		line=sel.anchor.line,ch=sel.anchor.ch;
	}
	const start=cm.indexFromPos({line,ch});
	const startkpos=fromlogicalpos({line,ch});
	var now=start+1;
	var max=20,count=0,prevkpos=0;
	const alltext=cm.doc.getValue();
	var out=[];
	while (count<max) {
		var caretText=alltext.substring(start,now);
		const linech=cm.posFromIndex(now);
		const kpos=fromlogicalpos(linech);
		if (kpos>prevkpos &&caretText) {
			out.push([caretText,cor.makeRange(startkpos,kpos)]);
		} else if (kpos) {
			break;
		}
		now++;
		count++;
		prevkpos=kpos;
	}
	return out;
}

const selectionActivity=function(cm,cor,fromlogicalpos){

	const sels=cm.listSelections();	
	if (sels.length>0){
		const sel=sels[0];
		var ranges=[],selections=[];
		for (var i=0;i<sels.length;i++) {
			ranges.push(this.kRangeFromSel(cm,sel.head,sel.anchor));
			if (sel.anchor.line==sel.head.line&&
				sel.anchor.ch<sel.head.ch) {
				selections.push([sel.anchor,sel.head]);	
			} else {
				selections.push([sel.head,sel.anchor]);
			}
		}

		const selectionText=cm.doc.getSelection();
		const cursor=cm.getCursor();
		const cursorrange=this.kRangeFromCursor(cm);
		const r=this.cor.parseRange(cursorrange);
		this.props.setSelection&&this.props.setSelection({
				cm:cm,
				sels:sels,
				selections:selections,
				corpus:this.props.corpus,id:this.props.id,
				caretText:getCaretText(cm,sel),
				caretTexts:getCaretTexts(cm,sel,cor,fromlogicalpos),
				selectionText:selectionText,
				ranges:ranges, caretpos:r.start, caretposH:this.cor.stringify(r.start),
				index:cm.indexFromPos(cursor),
				cursor:cursor
			});
	}
}
module.exports=selectionActivity;
},{}],69:[function(require,module,exports){
var activelocale="en";
var stringtable={ "en":{} };

const _=function(id){
	return stringtable[activelocale][id]||id;
}
const setLocale=function(locale){
	activelocale=locale;
	if (!stringtable[locale]) stringtable[locale]={};
}
const setString=function(id,str){
	stringtable[activelocale][id]=str;
}
module.exports={_:_,__:_,setLocale:setLocale,setString:setString};
},{}]},{},[47]);
