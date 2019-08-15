"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("react-dates/constants");

var _RangeOptionItem = _interopRequireDefault(require("./RangeOptionItem"));

var _CalendarContext = _interopRequireDefault(require("./Utils/CalendarContext"));

var _reducer = require("./Utils/reducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var RangeOptions = function RangeOptions(props) {
  var _useContext = (0, _react.useContext)(_CalendarContext["default"]),
      _useContext$state = _useContext.state,
      currentValue = _useContext$state.currentValue,
      isCustomRange = _useContext$state.isCustomRange,
      dispatch = _useContext.dispatch,
      closeDropdownOnTimeout = _useContext.closeDropdownOnTimeout;

  (0, _react.useEffect)(function () {
    if (!props.ranges.length) {
      return;
    }

    var isCustom = true;
    props.ranges.forEach(function (range) {
      if (currentValue && currentValue.isSame(range.value)) {
        isCustom = false;
      }
    });

    if (isCustom !== isCustomRange) {
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'isCustomRange',
        value: isCustom
      });
    }
  }, [isCustomRange, currentValue, props.ranges, dispatch]);

  var clearSelectedRange = function clearSelectedRange() {
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'isCustomRange',
      value: true
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'currentValue',
      value: null
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'startDate',
      value: null
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'endDate',
      value: null
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'focusedInput',
      value: _constants.START_DATE
    });
  };

  var handlePredefinedRangeSelect = function handlePredefinedRangeSelect(range) {
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'currentValue',
      value: range
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'startDate',
      value: range.start
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'endDate',
      value: range.end
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'calendarOpen',
      value: false
    });
    props.onDateSelected(range);
    closeDropdownOnTimeout();
  };

  var ranges = '';

  if (props.ranges.length > 0) {
    ranges = _react["default"].createElement("ul", {
      className: "dateRangeInput__defined-ranges"
    }, props.ranges.map(function (range) {
      return _react["default"].createElement(_RangeOptionItem["default"], {
        key: "range_".concat(range.label),
        value: range.value,
        label: range.label,
        onClick: handlePredefinedRangeSelect
      });
    }), _react["default"].createElement(_RangeOptionItem["default"], {
      value: null,
      label: "Custom Range",
      onClick: clearSelectedRange.bind(null),
      isCustomRange: isCustomRange
    }));
  }

  return ranges;
};

__signature__(RangeOptions, "useContext{{\n    state: { currentValue, isCustomRange },\n    dispatch,\n    closeDropdownOnTimeout,\n  }}\nuseEffect{}");

RangeOptions.propTypes = {
  ranges: _propTypes["default"].array.isRequired,
  onDateSelected: _propTypes["default"].func.isRequired
};
var _default = RangeOptions;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RangeOptions, "RangeOptions", "/Users/nchristensen/repos/date-range-picker/src/RangeOptions.jsx");
  reactHotLoader.register(_default, "default", "/Users/nchristensen/repos/date-range-picker/src/RangeOptions.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();