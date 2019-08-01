"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _RangeOptions = _interopRequireDefault(require("./RangeOptions"));

var _CalendarContext = _interopRequireDefault(require("./Utils/CalendarContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var CalendarDropdown = function CalendarDropdown(props) {
  var _useContext = (0, _react.useContext)(_CalendarContext["default"]),
      dropdownOpen = _useContext.state.dropdownOpen,
      isCalendarOpen = _useContext.isCalendarOpen;

  if (!dropdownOpen) {
    return '';
  }

  var dropdownClasses = {
    dateRangeInput__dropdown: true,
    'dateRangeInput__dropdown--calendar-open': isCalendarOpen(),
    'dateRangeInput__dropdown--has-ranges': props.ranges.length > 0
  };
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(dropdownClasses)
  }, _react["default"].createElement(_RangeOptions["default"], {
    ranges: props.ranges,
    onDateSelected: props.onDateSelected
  }), isCalendarOpen() ? _react["default"].createElement("div", {
    className: "dateRangeInput__calendarWrapper"
  }, _react["default"].createElement(_Calendar["default"], {
    ranges: props.ranges,
    onDateSelected: props.onDateSelected,
    maximumDate: props.maximumDate,
    minimumDate: props.minimumDate,
    daySize: props.daySize
  })) : '');
};

__signature__(CalendarDropdown, "useContext{{\n    state: { dropdownOpen },\n    isCalendarOpen,\n  }}");

CalendarDropdown.propTypes = {
  daySize: _propTypes["default"].number.isRequired,
  onDateSelected: _propTypes["default"].func.isRequired,
  ranges: _propTypes["default"].array.isRequired,
  maximumDate: _propTypes["default"].instanceOf(Date),
  minimumDate: _propTypes["default"].instanceOf(Date)
};
var _default = CalendarDropdown;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CalendarDropdown, "CalendarDropdown", "/Users/nchristensen/repos/date-range-picker/src/CalendarDropdown.jsx");
  reactHotLoader.register(_default, "default", "/Users/nchristensen/repos/date-range-picker/src/CalendarDropdown.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();