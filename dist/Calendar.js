"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDates = require("react-dates");

var _momentRange = _interopRequireDefault(require("./Utils/momentRange"));

var _isValidDate = _interopRequireDefault(require("./Utils/isValidDate"));

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

var Calendar = function Calendar(props) {
  var _useContext = (0, _react.useContext)(_CalendarContext["default"]),
      _useContext$state = _useContext.state,
      numCalendars = _useContext$state.numCalendars,
      focusedInput = _useContext$state.focusedInput,
      startDate = _useContext$state.startDate,
      endDate = _useContext$state.endDate,
      currentValue = _useContext$state.currentValue,
      dispatch = _useContext.dispatch,
      closeDropdownOnTimeout = _useContext.closeDropdownOnTimeout;

  var handleIsOutsideRange = (0, _react.useCallback)(function (day) {
    var outside = false;
    var minDate = null;
    var maxDate = null;

    if (props.minimumDate) {
      minDate = (0, _momentRange["default"])(props.minimumDate);

      if (day.isBefore(minDate)) {
        outside = true;
      }
    }

    if (props.maximumDate) {
      maxDate = (0, _momentRange["default"])(props.maximumDate);

      if (day.isAfter(maxDate)) {
        outside = true;
      }
    }

    return outside;
  }, [props]);
  var handleFocusChange = (0, _react.useCallback)(function (newFocusedInput) {
    return dispatch({
      type: _reducer.UPDATE_STATE_VALUE,
      name: 'focusedInput',
      value: newFocusedInput ? newFocusedInput : 'startDate'
    });
  }, [dispatch]);
  var handleDateChange = (0, _react.useCallback)(function (date) {
    if (date.startDate && date.endDate) {
      var range = _momentRange["default"].range(date.startDate.startOf('day'), date.endDate.startOf('day'));

      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'currentValue',
        value: range
      });
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'startDate',
        value: date.startDate
      });
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'endDate',
        value: date.endDate
      });
      props.onDateSelected(range); // Close the calendar after selecting the end date

      if (focusedInput == 'endDate') {
        closeDropdownOnTimeout();
      }
    } else if (date.startDate) {
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'startDate',
        value: date.startDate
      });
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'endDate',
        value: null
      });
    } else if (date.endDate) {
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'startDate',
        value: null
      });
      dispatch({
        type: _reducer.UPDATE_STATE_VALUE,
        name: 'endDate',
        value: date.endDate
      });
    }
  }, [dispatch, closeDropdownOnTimeout, props, focusedInput]);
  var calendarProps = {
    onDatesChange: handleDateChange,
    onFocusChange: handleFocusChange,
    numberOfMonths: numCalendars,
    isOutsideRange: handleIsOutsideRange,
    withPortal: false,
    orientation: 'horizontal',
    focusedInput: focusedInput,
    startDate: startDate,
    endDate: endDate,
    hideKeyboardShortcutsPanel: true,
    daySize: props.daySize,
    minimumNights: 0,
    initialVisibleMonth: function initialVisibleMonth() {
      var month = (0, _momentRange["default"])();
      var endDate = null;

      if ((0, _isValidDate["default"])(currentValue)) {
        // Clone the start date
        month = (0, _momentRange["default"])(currentValue.start);
        endDate = currentValue.end;
      } // Render one month before the start date if there are custom ranges
      // only render one month before if end date and start date are in the
      // same month


      if (numCalendars > 1 && props.ranges.length && (endDate === null || endDate.month() === month.month())) {
        month = month.subtract(1, 'months');
      }

      return month;
    }
  };
  return _react["default"].createElement(_reactDates.DayPickerRangeController, calendarProps);
};

__signature__(Calendar, "useContext{{\n    state: { numCalendars, focusedInput, startDate, endDate, currentValue },\n    dispatch,\n    closeDropdownOnTimeout,\n  }}\nuseCallback{handleIsOutsideRange}\nuseCallback{handleFocusChange}\nuseCallback{handleDateChange}");

Calendar.propTypes = {
  daySize: _propTypes["default"].number.isRequired,
  onDateSelected: _propTypes["default"].func.isRequired,
  ranges: _propTypes["default"].array.isRequired,
  maximumDate: _propTypes["default"].instanceOf(Date),
  minimumDate: _propTypes["default"].instanceOf(Date)
};
var _default = Calendar;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Calendar, "Calendar", "/Users/nchristensen/repos/date-range-picker/src/Calendar.jsx");
  reactHotLoader.register(_default, "default", "/Users/nchristensen/repos/date-range-picker/src/Calendar.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();