"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var RangeOptionItem = function RangeOptionItem(props) {
  var _useContext = (0, _react.useContext)(_CalendarContext["default"]),
      currentValue = _useContext.state.currentValue,
      dispatch = _useContext.dispatch,
      isCalendarOpen = _useContext.isCalendarOpen;

  var handleHighlightRange = function handleHighlightRange(range) {
    if (!isCalendarOpen()) {
      return;
    }

    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'startDate',
      value: range ? range.start : null
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'endDate',
      value: range ? range.end : null
    });
  };

  var handleUnhighlightRange = function handleUnhighlightRange() {
    if (!isCalendarOpen()) {
      return;
    }

    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'startDate',
      value: currentValue ? currentValue.start : null
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'endDate',
      value: currentValue ? currentValue.end : null
    });
  };

  var classes = {
    dateRangeInput__rangeButton: true,
    'dateRangeInput__rangeButton--active': (0, _isValidDate["default"])(currentValue) && props.value && currentValue.isSame(props.value) || props.isCustomRange
  };
  return _react["default"].createElement("li", null, _react["default"].createElement("button", {
    type: "button",
    onMouseEnter: handleHighlightRange.bind(null, props.value),
    onMouseLeave: handleUnhighlightRange,
    className: (0, _classnames["default"])(classes),
    onClick: props.onClick.bind(null, props.value)
  }, props.label));
};

__signature__(RangeOptionItem, "useContext{{\n    state: { currentValue },\n    dispatch,\n    isCalendarOpen,\n  }}");

RangeOptionItem.propTypes = {
  value: _propTypes["default"].object,
  label: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  isCustomRange: _propTypes["default"].bool
};
RangeOptionItem.defaultProps = {
  isCustomRange: false
};
var _default = RangeOptionItem;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RangeOptionItem, "RangeOptionItem", "/Users/nchristensen/repos/date-range-picker/src/RangeOptionItem.jsx");
  reactHotLoader.register(_default, "default", "/Users/nchristensen/repos/date-range-picker/src/RangeOptionItem.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();