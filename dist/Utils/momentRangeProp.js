"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _momentRange = require("moment-range");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var _default = function _default(props, propName, componentName) {
  var propValue = props[propName];

  if (propValue !== null) {
    var message = 'Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Must be of type `DateRange`.' + ' Validation failed.'; // Don't return error if the following is true

    if (propValue instanceof _momentRange.DateRange || propValue.constructor.name === 'DateRange') {
      return;
    }

    return new Error(message);
  }
};

var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/nchristensen/repos/date-range-picker/src/Utils/momentRangeProp.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();