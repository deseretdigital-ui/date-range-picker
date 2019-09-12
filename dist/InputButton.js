"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("react-dates/constants");

var _isValidDate = _interopRequireDefault(require("./Utils/isValidDate"));

var _CalendarContext = _interopRequireDefault(require("./Utils/CalendarContext"));

var _reducer = require("./Utils/reducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var InputButton = function InputButton(props) {
  var _useContext = (0, _react.useContext)(_CalendarContext["default"]),
      _useContext$state = _useContext.state,
      currentValue = _useContext$state.currentValue,
      dropdownOpen = _useContext$state.dropdownOpen,
      dispatch = _useContext.dispatch;

  var getDisplayValue = function getDisplayValue() {
    var displayValue = props.defaultDisplayValue;

    if ((0, _isValidDate["default"])(currentValue)) {
      var displayFormat = 'DD MMM YYYY';
      displayValue = currentValue.start.format(displayFormat) + ' - ' + currentValue.end.format(displayFormat);
    }

    return displayValue;
  };

  var toggleDropdown = function toggleDropdown() {
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'dropdownOpen',
      value: !dropdownOpen
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'focusedInput',
      value: _constants.START_DATE
    });
  };
  /* eslint-disable max-len */


  return _react["default"].createElement("button", {
    className: "dateRangeInput__input",
    type: "button",
    onClick: toggleDropdown
  }, _react["default"].createElement("svg", {
    className: "calendar-icon",
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 379.9 370.5",
    style: {
      enableBackground: 'new 0 0 379.9 370.5'
    },
    xmlSpace: "preserve"
  }, _react["default"].createElement("path", {
    d: "M314.1,39.2V16.9c0-6.6-5.4-12-12-12H286c-6.6,0-12,5.4-12,12v22.3l-169.3,0V16.9c0-6.6-5.4-12-12-12H76.6 c-6.6,0-12,5.4-12,12v22.3l-58.7,0l0,324l366.9,0v-324L314.1,39.2z M177.8,93.2v70h-64.5v-70H177.8z M200.8,93.2h64.5v70h-64.5V93.2 z M90.3,93.2v70H28.9l0-70H90.3z M28.9,186.2h61.5v67H28.9L28.9,186.2z M113.3,186.2h64.5v67h-64.5V186.2z M177.8,276.2v64.1h-64.5 v-64.1H177.8z M200.8,276.2h64.5v64.1h-64.5V276.2z M200.8,253.2v-67h64.5v67H200.8z M288.3,186.2h61.5v67h-61.5V186.2z M288.3,163.2v-70h61.5v70H288.3z M28.9,276.2h61.5v64.1H28.9L28.9,276.2z M288.3,340.2v-64.1h61.5v64.1H288.3z"
  })), getDisplayValue());
  /* eslint-enable max-len */
};

__signature__(InputButton, "useContext{{\n    state: { currentValue, dropdownOpen },\n    dispatch,\n  }}");

InputButton.propTypes = {
  ranges: _propTypes["default"].array.isRequired,
  defaultDisplayValue: _propTypes["default"].string.isRequired
};
var _default = InputButton;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InputButton, "InputButton", "/Users/nchristensen/repos/date-range-picker/src/InputButton.jsx");
  reactHotLoader.register(_default, "default", "/Users/nchristensen/repos/date-range-picker/src/InputButton.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();