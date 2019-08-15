"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactHotLoader = require("react-hot-loader");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("react-dates/initialize");

var _constants = require("react-dates/constants");

var _classnames2 = _interopRequireDefault(require("classnames"));

var _CalendarDropdown = _interopRequireDefault(require("./CalendarDropdown"));

var _InputButton = _interopRequireDefault(require("./InputButton"));

var _CalendarContext = _interopRequireDefault(require("./Utils/CalendarContext"));

var _momentRangeProp = _interopRequireDefault(require("./Utils/momentRangeProp"));

var _reducer = _interopRequireWildcard(require("./Utils/reducer"));

var _momentRange = _interopRequireDefault(require("./Utils/momentRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var defaultRanges = [{
  label: 'Today',
  value: _momentRange["default"].range((0, _momentRange["default"])().startOf('day'), (0, _momentRange["default"])().startOf('day'))
}, {
  label: 'Yesterday',
  value: _momentRange["default"].range((0, _momentRange["default"])().startOf('day').subtract(1, 'days'), (0, _momentRange["default"])().startOf('day').subtract(1, 'days'))
}, {
  label: 'Last 7 Days',
  value: _momentRange["default"].range((0, _momentRange["default"])().startOf('day').subtract(6, 'days'), (0, _momentRange["default"])().startOf('day'))
}, {
  label: 'Last 30 Days',
  value: _momentRange["default"].range((0, _momentRange["default"])().startOf('day').subtract(30, 'days'), (0, _momentRange["default"])().startOf('day'))
}, {
  label: 'This Month',
  value: _momentRange["default"].range((0, _momentRange["default"])().startOf('month').startOf('day'), (0, _momentRange["default"])().endOf('month').startOf('day'))
}, {
  label: 'Last Month',
  value: _momentRange["default"].range((0, _momentRange["default"])().subtract(1, 'month').startOf('month').startOf('day'), (0, _momentRange["default"])().subtract(1, 'month').endOf('month').startOf('day'))
}];

var DateRangeInput = function DateRangeInput(props) {
  var wrapperClasses = (0, _classnames2["default"])(_defineProperty({
    dateRangeInput: true
  }, props.wrapperClass, true));
  var dateRangeInputWrapperRef = (0, _react.useRef)(null);

  var getInitialCurrentValue = function getInitialCurrentValue() {
    var newValue = props.value;

    if (!newValue && props.defaultValue) {
      newValue = props.defaultValue;
    }

    return newValue;
  };

  var getInitialStartDate = function getInitialStartDate() {
    var startDate = null;

    if (!props.value && props.defaultValue) {
      startDate = props.defaultValue.start;
    }

    return startDate;
  };

  var getInitialEndDate = function getInitialEndDate() {
    var endDate = null;

    if (!props.value && props.defaultValue) {
      endDate = props.defaultValue.end;
    }

    return endDate;
  };

  var initialState = {
    isCustomRange: false,
    dropdownOpen: false,
    calendarOpen: false,
    numCalendars: 2,
    focusedInput: _constants.START_DATE,
    currentValue: getInitialCurrentValue(),
    startDate: getInitialStartDate(),
    endDate: getInitialEndDate()
  };

  var _useReducer = (0, _react.useReducer)(_reducer["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    var media = 'only screen and (max-width: ' + props.singleCalendarBreakpoint + 'px)';
    var mediaQuery = window.matchMedia(media);

    var observeMediaQuery = function observeMediaQuery() {
      var matches = mediaQuery.matches;
      var numCalendars = matches ? 1 : 2;
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'numCalendars',
        value: numCalendars
      });
    };

    mediaQuery.addListener(observeMediaQuery);
    observeMediaQuery();
    return function () {
      mediaQuery.removeListener(observeMediaQuery);
    };
  }, [dispatch, props.singleCalendarBreakpoint]);

  var isCalendarOpen = function isCalendarOpen() {
    return props.alwaysShowCalendar || state.calendarOpen;
  }; // These close functions need to be defined before the following useEffect


  var closeDropdownOnTimeout = function closeDropdownOnTimeout() {
    setTimeout(function () {
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'dropdownOpen',
        value: false
      });
    }, 0);
  };

  var closeDropdown = (0, _react.useCallback)(function (e) {
    var wrapper = dateRangeInputWrapperRef.current;

    if (wrapper && !wrapper.contains(e.target)) {
      closeDropdownOnTimeout();
    }
  }, [dateRangeInputWrapperRef]);
  (0, _react.useEffect)(function () {
    window.addEventListener('mousedown', closeDropdown, false);
    window.addEventListener('touchstart', closeDropdown, false);
    return function () {
      window.removeEventListener('mousedown', closeDropdown);
      window.removeEventListener('touchstart', closeDropdown);
    };
  }, [closeDropdown]); // Determine if the state needs to be udpated

  var dateRange = null;

  if (props.value && state.currentValue && !props.value.isSame(state.currentValue)) {
    dateRange = props.value;
  } else if (!props.value && !state.currentValue && !state.isCustomRange) {
    dateRange = props.defaultValue;
  }

  if (dateRange) {
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'currentValue',
      value: dateRange
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'startDate',
      value: dateRange.start
    });
    dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'endDate',
      value: dateRange.end
    });
  }

  return _react["default"].createElement(_CalendarContext["default"].Provider, {
    value: {
      state: state,
      dispatch: dispatch,
      isCalendarOpen: isCalendarOpen,
      closeDropdownOnTimeout: closeDropdownOnTimeout
    }
  }, _react["default"].createElement("div", {
    className: wrapperClasses,
    ref: dateRangeInputWrapperRef
  }, _react["default"].createElement(_InputButton["default"], {
    ranges: props.ranges,
    defaultDisplayValue: props.defaultDisplayValue
  }), _react["default"].createElement(_CalendarDropdown["default"], {
    ranges: props.ranges,
    onDateSelected: props.onDateSelected,
    maximumDate: props.maximumDate,
    minimumDate: props.minimumDate,
    daySize: props.daySize
  })));
};

__signature__(DateRangeInput, "useRef{dateRangeInputWrapperRef}\nuseReducer{[state, dispatch](initialState)}\nuseEffect{}\nuseCallback{closeDropdown}\nuseEffect{}");

DateRangeInput.propTypes = {
  onDateSelected: _propTypes["default"].func,
  ranges: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    label: _propTypes["default"].string,
    value: _momentRangeProp["default"]
  })),
  value: _momentRangeProp["default"],
  defaultValue: _momentRangeProp["default"],
  alwaysShowCalendar: _propTypes["default"].bool,
  singleCalendarBreakpoint: _propTypes["default"].number,
  maximumDate: _propTypes["default"].instanceOf(Date),
  minimumDate: _propTypes["default"].instanceOf(Date),
  defaultDisplayValue: _propTypes["default"].string,
  wrapperClass: _propTypes["default"].string,
  // Visual size of each day in the calendar in pixels
  daySize: _propTypes["default"].number
};
DateRangeInput.defaultProps = {
  onDateSelected: function onDateSelected() {},
  ranges: defaultRanges,
  value: null,
  defaultValue: _momentRange["default"].range(),
  alwaysShowCalendar: true,
  singleCalendarBreakpoint: 979,
  maximumDate: null,
  minimumDate: null,
  defaultDisplayValue: 'Select a date range',
  wrapperClass: 'DateInputWrapper',
  daySize: 36
};

var _default = (0, _reactHotLoader.hot)(module)(DateRangeInput);

var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultRanges, "defaultRanges", "/Users/nchristensen/repos/date-range-picker/src/DateRangeInput.jsx");
  reactHotLoader.register(DateRangeInput, "DateRangeInput", "/Users/nchristensen/repos/date-range-picker/src/DateRangeInput.jsx");
  reactHotLoader.register(_default, "default", "/Users/nchristensen/repos/date-range-picker/src/DateRangeInput.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();