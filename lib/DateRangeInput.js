"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDates = require("react-dates");

var _classnames2 = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var moment = (0, _momentRange.extendMoment)(_moment.default);
var defaultRanges = [{
  label: 'Today',
  value: moment.range(moment().startOf('day'), moment().startOf('day'))
}, {
  label: 'Yesterday',
  value: moment.range(moment().startOf('day').subtract(1, 'days'), moment().startOf('day').subtract(1, 'days'))
}, {
  label: 'Last 7 Days',
  value: moment.range(moment().startOf('day').subtract(6, 'days'), moment().startOf('day'))
}, {
  label: 'Last 30 Days',
  value: moment.range(moment().startOf('day').subtract(29, 'days'), moment().startOf('day'))
}, {
  label: 'This Month',
  value: moment.range(moment().startOf('month').startOf('day'), moment().endOf('month').startOf('day'))
}, {
  label: 'Last Month',
  value: moment.range(moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').startOf('day'))
}];

var momentRangeProp = function momentRangeProp(props, propName, componentName) {
  var propValue = props[propName];

  if (propValue !== null) {
    var message = 'Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Must be of type `DateRange`.' + ' Validation failed.'; // Don't return error if the following is true

    if (propValue instanceof _momentRange.DateRange || propValue.constructor.name === 'DateRange') {
      return;
    }

    return new Error(message);
  }
};

var DateRangeInput =
/*#__PURE__*/
function (_Component) {
  _inherits(DateRangeInput, _Component);

  function DateRangeInput(_props) {
    var _this;

    _classCallCheck(this, DateRangeInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangeInput).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "addMediaMatch", function () {
      var breakpoint = _this.props.singleCalendarBreakpoint;
      var media = 'only screen and (max-width: ' + breakpoint + 'px)';
      _this.mediaQuery = window.matchMedia(media);

      _this.mediaQuery.addListener(_this.observeMediaQuery);

      _this.observeMediaQuery();
    });

    _defineProperty(_assertThisInitialized(_this), "observeMediaQuery", function () {
      var numCalendars = _this.mediaQuery.matches ? 1 : 2;

      _this.setState({
        numCalendars: numCalendars
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDropdown", function () {
      var dropdownOpen = !_this.state.dropdownOpen;
      var focusedInput = _this.state.dropdownOpen ? null : 'startDate';

      _this.setState({
        dropdownOpen: dropdownOpen,
        focusedInput: focusedInput
      });

      if (dropdownOpen) {
        if (_this.props.ranges.length === 0) {
          _this.setState({
            focusedInput: 'startDate'
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeDropdown", function (e) {
      var wrapper = _this.dateRangeInputWrapper;

      if (wrapper && !wrapper.contains(e.target)) {
        _this.closeDropdownOnTimeout();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hasValidDate", function () {
      var isValid = false;

      if (_this.state.value) {
        try {
          _this.state.value.start.format('DD MMM YYYY');

          _this.state.value.end.format('DD MMM YYYY');

          isValid = true;
        } catch (error) {// Do nothing
        }
      }

      return isValid;
    });

    _defineProperty(_assertThisInitialized(_this), "getDisplayValue", function () {
      var displayValue = _this.props.defaultDisplayValue;

      if (_this.hasValidDate()) {
        var displayFormat = 'DD MMM YYYY';
        displayValue = _this.state.value.start.format(displayFormat) + ' - ' + _this.state.value.end.format(displayFormat);
      }

      return displayValue;
    });

    _defineProperty(_assertThisInitialized(_this), "handlePredefinedRangeSelect", function (range) {
      _this.setState({
        value: range,
        startDate: range.start,
        endDate: range.end,
        calendarOpen: false
      });

      _this.props.onDateSelected(range);

      _this.closeDropdownOnTimeout();
    });

    _defineProperty(_assertThisInitialized(_this), "handleDateChange", function (date) {
      var range;

      if (date.startDate && date.endDate) {
        range = moment.range(date.startDate.startOf('day'), date.endDate.startOf('day'));

        _this.setState({
          value: range,
          startDate: date.startDate,
          endDate: date.endDate,
          calendarOpen: false
        });

        _this.props.onDateSelected(range); // Close the calendar after selecting the end date


        if (_this.state.focusedInput == 'endDate') {
          _this.closeDropdownOnTimeout();
        }
      } else if (date.startDate) {
        _this.setState({
          startDate: date.startDate,
          endDate: null
        });
      } else if (date.endDate) {
        _this.setState({
          endDate: date.endDate,
          startDate: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusChange", function (focusedInput) {
      _this.setState({
        focusedInput: focusedInput
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleHighlightRange", function (range) {
      if (!_this.isCalendarOpen()) {
        return;
      }

      _this.setState({
        startDate: range.start,
        endDate: range.end
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleUnhighlightRange", function () {
      if (!_this.isCalendarOpen()) {
        return;
      }

      var value = _this.state.value;

      _this.setState({
        startDate: value ? value.start : null,
        endDate: value ? value.end : null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearSelectedRange", function () {
      var clearValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var newState = {
        startDate: null,
        endDate: null,
        focusedInput: 'startDate'
      };

      if (clearValue) {
        newState.value = null;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "handleIsOutsideRange", function (day) {
      var outside = false;
      var minDate = null;
      var maxDate = null;

      if (_this.props.minimumDate) {
        minDate = moment(_this.props.minimumDate);

        if (day.isBefore(minDate)) {
          outside = true;
        }
      }

      if (_this.props.maximumDate) {
        maxDate = moment(_this.props.maximumDate);

        if (day.isAfter(maxDate)) {
          outside = true;
        }
      }

      return outside;
    });

    _defineProperty(_assertThisInitialized(_this), "closeDropdownOnTimeout", function () {
      setTimeout(function () {
        _this.setState({
          dropdownOpen: false
        });
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "isCalendarOpen", function () {
      return _this.props.alwaysShowCalendar || _this.state.calendarOpen;
    });

    _defineProperty(_assertThisInitialized(_this), "isValueCustomRange", function () {
      if (_this.state.value === null) {
        return false;
      }

      var isCustom = true;

      _this.props.ranges.forEach(function (range) {
        if (_this.state.value && _this.state.value.isSame(range.value)) {
          isCustom = false;
        }
      });

      return isCustom;
    });

    _defineProperty(_assertThisInitialized(_this), "renderCalendar", function () {
      var props = {
        onDatesChange: _this.handleDateChange,
        onFocusChange: _this.handleFocusChange,
        numberOfMonths: _this.state.numCalendars,
        isOutsideRange: _this.handleIsOutsideRange,
        withPortal: false,
        orientation: 'horizontal',
        focusedInput: _this.state.focusedInput,
        startDate: _this.state.startDate,
        endDate: _this.state.endDate,
        hideKeyboardShortcutsPanel: true,
        daySize: _this.props.daySize,
        minimumNights: 0,
        initialVisibleMonth: function initialVisibleMonth() {
          var month = moment();
          var endDate = null;

          if (_this.hasValidDate()) {
            // Clone the start date
            month = moment(_this.state.value.start);
            endDate = _this.state.value.end;
          } // Render one month before the start date if there are custom ranges
          // only render one month before if end ate and start date are in the
          // same month


          if (_this.state.numCalendars > 1 && _this.props.ranges.length && (endDate === null || endDate.month() === month.month())) {
            month = month.subtract(1, 'months');
          }

          return month;
        }
      };
      return _react.default.createElement(_reactDates.DayPickerRangeController, props);
    });

    _defineProperty(_assertThisInitialized(_this), "renderDropdown", function () {
      if (!_this.state.dropdownOpen) {
        return '';
      }

      var calendarWrapper = '';

      var calendarOpen = _this.isCalendarOpen();

      if (calendarOpen) {
        calendarWrapper = _react.default.createElement("div", {
          className: "dateRangeInput__calendarWrapper"
        }, _this.renderCalendar());
      }

      var dropdownClasses = {
        'dateRangeInput__dropdown': true,
        'dateRangeInput__dropdown--calendar-open': calendarOpen,
        'dateRangeInput__dropdown--has-ranges': _this.props.ranges.length > 0
      };
      return _react.default.createElement("div", {
        className: (0, _classnames2.default)(dropdownClasses)
      }, _this.renderRanges(), calendarWrapper);
    });

    _defineProperty(_assertThisInitialized(_this), "renderRanges", function () {
      var customRangeClasses = {
        'dateRangeInput__rangeButton': true,
        'dateRangeInput__rangeButton--active': _this.isValueCustomRange() || _this.state.calendarOpen
      };
      var ranges = '';

      if (_this.props.ranges.length > 0) {
        ranges = _react.default.createElement("ul", {
          className: "dateRangeInput__defined-ranges"
        }, _this.renderRangeItems(), _react.default.createElement("li", null, _react.default.createElement("button", {
          type: "button",
          onMouseEnter: _this.handleHighlightRange.bind(null, {
            start: null,
            end: null
          }),
          onMouseLeave: _this.handleUnhighlightRange,
          className: (0, _classnames2.default)(customRangeClasses),
          onClick: _this.clearSelectedRange
        }, "Custom Range")));
      }

      return ranges;
    });

    _defineProperty(_assertThisInitialized(_this), "renderRangeItems", function () {
      return _this.props.ranges.map(function (range) {
        var classes = {
          'dateRangeInput__rangeButton': true,
          'dateRangeInput__rangeButton--active': _this.hasValidDate() && _this.state.value.isSame(range.value)
        };

        if (_this.state.calendarOpen) {
          classes['dateRangeInput__rangeButton--active'] = false;
        }

        return _react.default.createElement("li", {
          key: "range_".concat(range.label)
        }, _react.default.createElement("button", {
          type: "button",
          onMouseEnter: _this.handleHighlightRange.bind(null, range.value),
          onMouseLeave: _this.handleUnhighlightRange,
          className: (0, _classnames2.default)(classes),
          onClick: _this.handlePredefinedRangeSelect.bind(null, range.value)
        }, range.label));
      });
    });

    _this.mediaQuery = null;
    var _value = null;
    var startDate = null;
    var _endDate = null;

    if (_props.defaultValue && _props.defaultValue.start && _props.defaultValue.end) {
      _value = _props.defaultValue;
      startDate = _props.defaultValue.start;
      _endDate = _props.defaultValue.end;
    }

    _this.state = {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: _value,
      startDate: startDate,
      endDate: _endDate,
      focusedInput: null
    };
    return _this;
  }

  _createClass(DateRangeInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.addMediaMatch();
      window.addEventListener('mousedown', this.closeDropdown, false);
      window.addEventListener('touchstart', this.closeDropdown, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mediaQuery.removeListener(this.observeMediaQuery);
      window.removeEventListener('mousedown', this.closeDropdown);
      window.removeEventListener('touchstart', this.closeDropdown);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var wrapperClasses = (0, _classnames2.default)(_defineProperty({
        dateRangeInput: true
      }, this.props.wrapperClass, true));
      return _react.default.createElement("div", {
        className: wrapperClasses,
        ref: function ref(_ref) {
          return _this2.dateRangeInputWrapper = _ref;
        }
      }, _react.default.createElement("button", {
        className: "dateRangeInput__input",
        type: "button",
        onClick: this.toggleDropdown
      }, this.getDisplayValue()), this.renderDropdown());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(newProps, prevState) {
      var newState = null;

      if (newProps.defaultValue && !newProps.defaultValue.isSame(prevState.value)) {
        newState = {
          value: newProps.defaultValue,
          startDate: newProps.defaultValue.start,
          endDate: newProps.defaultValue.end
        };
      }

      return newState;
    }
  }]);

  return DateRangeInput;
}(_react.Component);

_defineProperty(DateRangeInput, "propTypes", {
  onDateSelected: _propTypes.default.func,
  ranges: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string,
    value: momentRangeProp
  })),
  defaultValue: momentRangeProp,
  alwaysShowCalendar: _propTypes.default.bool,
  singleCalendarBreakpoint: _propTypes.default.number,
  maximumDate: _propTypes.default.instanceOf(Date),
  minimumDate: _propTypes.default.instanceOf(Date),
  defaultDisplayValue: _propTypes.default.string,
  selectSingleDay: _propTypes.default.bool,
  wrapperClass: _propTypes.default.string,
  daySize: _propTypes.default.number
});

_defineProperty(DateRangeInput, "defaultProps", {
  onDateSelected: function onDateSelected() {},
  defaultValue: moment.range(),
  alwaysShowCalendar: true,
  singleCalendarBreakpoint: 979,
  ranges: defaultRanges,
  defaultDisplayValue: 'Select a date range',
  selectSingleDay: true,
  wrapperClass: 'DateInputWrapper',
  daySize: 36
});

var _default = DateRangeInput;
exports.default = _default;