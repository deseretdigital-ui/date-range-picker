'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDates = require('react-dates');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var defaultRanges = [{
  'label': 'Today',
  'value': moment.range(moment().startOf('day'), moment().startOf('day'))
}, {
  'label': 'Yesterday',
  'value': moment.range(moment().startOf('day').subtract(1, 'days'), moment().startOf('day').subtract(1, 'days'))
}, {
  'label': 'Last 7 Days',
  'value': moment.range(moment().startOf('day').subtract(6, 'days'), moment().startOf('day'))
}, {
  'label': 'Last 30 Days',
  'value': moment.range(moment().startOf('day').subtract(29, 'days'), moment().startOf('day'))
}, {
  'label': 'This Month',
  'value': moment.range(moment().startOf('month').startOf('day'), moment().endOf('month').startOf('day'))
}, {
  'label': 'Last Month',
  'value': moment.range(moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').startOf('day'))
}];

var momentRangeProp = function momentRangeProp(props, propName, componentName) {
  var propValue = props[propName];

  if (propValue !== null && propValue.constructor.name !== 'DateRange') {
    return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Must be of type `DateRange`.' + ' Validation failed.');
  }
};

var DateRangeInput = function (_Component) {
  _inherits(DateRangeInput, _Component);

  function DateRangeInput(props) {
    _classCallCheck(this, DateRangeInput);

    var _this = _possibleConstructorReturn(this, (DateRangeInput.__proto__ || Object.getPrototypeOf(DateRangeInput)).call(this, props));

    _initialiseProps.call(_this);

    _this.mediaQuery = null;

    var value = null;
    var startDate = null;
    var endDate = null;

    if (props.defaultValue && props.defaultValue.start && props.defaultValue.end) {
      value = props.defaultValue;
      startDate = props.defaultValue.start;
      endDate = props.defaultValue.end;
    }

    _this.state = {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: value,
      startDate: startDate,
      endDate: endDate,
      focusedInput: null
    };
    return _this;
  }

  _createClass(DateRangeInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addMediaMatch();
      window.addEventListener('mousedown', this.closeDropdown, false);
      window.addEventListener('touchstart', this.closeDropdown, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mediaQuery.removeListener(this.observeMediaQuery);
      window.removeEventListener('mousedown', this.closeDropdown);
      window.removeEventListener('touchstart', this.closeDropdown);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var wrapperClasses = (0, _classnames3.default)(_defineProperty({
        dateRangeInput: true
      }, this.props.wrapperClass, true));

      return _react2.default.createElement(
        'div',
        {
          className: wrapperClasses,
          ref: function ref(_ref) {
            return _this2.dateRangeInputWrapper = _ref;
          }
        },
        _react2.default.createElement(
          'button',
          { className: 'dateRangeInput__input',
            type: 'button',
            onClick: this.toggleDropdown
          },
          this.getDisplayValue()
        ),
        this.renderDropdown()
      );
    }
  }]);

  return DateRangeInput;
}(_react.Component);

DateRangeInput.propTypes = {
  onDateSelected: _propTypes2.default.func,
  ranges: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    value: momentRangeProp
  })),
  defaultValue: momentRangeProp,
  alwaysShowCalendar: _propTypes2.default.bool,
  singleCalendarBreakpoint: _propTypes2.default.number,
  maximumDate: _propTypes2.default.instanceOf(Date),
  minimumDate: _propTypes2.default.instanceOf(Date),
  defaultDisplayValue: _propTypes2.default.string,
  selectSingleDay: _propTypes2.default.bool,
  wrapperClass: _propTypes2.default.string,
  daySize: _propTypes2.default.number
};
DateRangeInput.defaultProps = {
  onDateSelected: function onDateSelected() {},
  defaultValue: null,
  alwaysShowCalendar: true,
  singleCalendarBreakpoint: 979,
  ranges: defaultRanges,
  defaultDisplayValue: 'Select a date range',
  selectSingleDay: true,
  wrapperClass: 'DateInputWrapper',
  daySize: 36
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.addMediaMatch = function () {
    var breakpoint = _this3.props.singleCalendarBreakpoint;
    var media = 'only screen and (max-width: ' + breakpoint + 'px)';
    _this3.mediaQuery = window.matchMedia(media);
    _this3.mediaQuery.addListener(_this3.observeMediaQuery);

    _this3.observeMediaQuery();
  };

  this.observeMediaQuery = function () {
    var numCalendars = _this3.mediaQuery.matches ? 1 : 2;

    _this3.setState({ numCalendars: numCalendars });
  };

  this.toggleDropdown = function () {
    var dropdownOpen = !_this3.state.dropdownOpen;
    var focusedInput = _this3.state.dropdownOpen ? null : 'startDate';
    _this3.setState({
      dropdownOpen: dropdownOpen,
      focusedInput: focusedInput
    });

    if (dropdownOpen) {
      if (_this3.props.ranges.length === 0) {
        _this3.setState({
          focusedInput: 'startDate'
        });
      }
    }
  };

  this.closeDropdown = function (e) {
    var wrapper = _this3.dateRangeInputWrapper;

    if (wrapper && !wrapper.contains(e.target)) {
      _this3.closeDropdownOnTimeout();
    }
  };

  this.hasValidDate = function () {
    var isValid = false;

    if (_this3.state.value && _this3.state.value.start instanceof moment && _this3.state.value.end instanceof moment) {
      isValid = true;
    }

    return isValid;
  };

  this.getDisplayValue = function () {
    var displayValue = _this3.props.defaultDisplayValue;

    if (_this3.hasValidDate()) {
      var displayFormat = 'DD MMM YYYY';
      displayValue = _this3.state.value.start.format(displayFormat) + ' - ' + _this3.state.value.end.format(displayFormat);
    }

    return displayValue;
  };

  this.handlePredefinedRangeSelect = function (range) {
    _this3.setState({
      value: range,
      startDate: range.start,
      endDate: range.end,
      calendarOpen: false
    });

    _this3.props.onDateSelected(range);
    _this3.closeDropdownOnTimeout();
  };

  this.handleDateChange = function (date) {
    var range = void 0;

    if (date.startDate && date.endDate) {
      range = moment.range(date.startDate.startOf('day'), date.endDate.startOf('day'));

      _this3.setState({
        value: range,
        startDate: date.startDate,
        endDate: date.endDate,
        calendarOpen: false
      });

      _this3.props.onDateSelected(range);

      // Close the calendar after selecting the end date
      if (_this3.state.focusedInput == 'endDate') {
        _this3.closeDropdownOnTimeout();
      }
    } else if (date.startDate) {
      _this3.setState({
        startDate: date.startDate,
        endDate: null
      });
    } else if (date.endDate) {
      _this3.setState({
        endDate: date.endDate,
        startDate: null
      });
    }
  };

  this.handleFocusChange = function (focusedInput) {
    _this3.setState({
      focusedInput: focusedInput
    });
  };

  this.handleHighlightRange = function (range) {
    if (!_this3.isCalendarOpen()) {
      return;
    }

    _this3.setState({
      startDate: range.start,
      endDate: range.end
    });
  };

  this.handleUnhighlightRange = function () {
    if (!_this3.isCalendarOpen()) {
      return;
    }

    _this3.setState({
      startDate: _this3.state.value.start,
      endDate: _this3.state.value.end
    });
  };

  this.clearSelectedRange = function () {
    var clearValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var newState = {
      startDate: null,
      endDate: null,
      focusedInput: 'startDate'
    };

    if (clearValue) {
      newState.value = null;
    }

    _this3.setState(newState);
  };

  this.handleIsOutsideRange = function (day) {
    var outside = false;
    var minDate = null;
    var maxDate = null;

    if (_this3.props.minimumDate) {
      minDate = moment(_this3.props.minimumDate);
      if (day.isBefore(minDate)) {
        outside = true;
      }
    }

    if (_this3.props.maximumDate) {
      maxDate = moment(_this3.props.maximumDate);
      if (day.isAfter(maxDate)) {
        outside = true;
      }
    }

    return outside;
  };

  this.closeDropdownOnTimeout = function () {
    setTimeout(function () {
      _this3.setState({
        dropdownOpen: false
      });
    }, 0);
  };

  this.isCalendarOpen = function () {
    return _this3.props.alwaysShowCalendar || _this3.state.calendarOpen;
  };

  this.isValueCustomRange = function () {
    if (_this3.state.value === null) {
      return false;
    }

    var isCustom = true;
    _this3.props.ranges.forEach(function (range) {
      if (_this3.state.value.isSame(range.value)) {
        isCustom = false;
      }
    });

    return isCustom;
  };

  this.renderCalendar = function () {
    var props = {
      onDatesChange: _this3.handleDateChange,
      onFocusChange: _this3.handleFocusChange,
      numberOfMonths: _this3.state.numCalendars,
      isOutsideRange: _this3.handleIsOutsideRange,
      withPortal: false,
      orientation: 'horizontal',
      focusedInput: _this3.state.focusedInput,
      startDate: _this3.state.startDate,
      endDate: _this3.state.endDate,
      hideKeyboardShortcutsPanel: true,
      daySize: _this3.props.daySize,
      minimumNights: 0,
      initialVisibleMonth: function initialVisibleMonth() {
        var month = moment();
        if (_this3.state.value && _this3.state.value.start instanceof moment) {
          // Clone the start date
          month = moment(_this3.state.value.start);
        }
        // Render one month before the start date if there are custom ranges
        if (_this3.state.numCalendars > 1 && _this3.props.ranges.length) {
          month = month.subtract(1, 'months');
        }
        return month;
      }
    };

    return _react2.default.createElement(_reactDates.DayPickerRangeController, props);
  };

  this.renderDropdown = function () {
    if (!_this3.state.dropdownOpen) {
      return '';
    }

    var calendarWrapper = '';
    var calendarOpen = _this3.isCalendarOpen();
    if (calendarOpen) {
      calendarWrapper = _react2.default.createElement(
        'div',
        { className: 'dateRangeInput__calendarWrapper' },
        _this3.renderCalendar()
      );
    }

    var dropdownClasses = {
      'dateRangeInput__dropdown': true,
      'dateRangeInput__dropdown--calendar-open': calendarOpen,
      'dateRangeInput__dropdown--has-ranges': _this3.props.ranges.length > 0
    };

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames3.default)(dropdownClasses) },
      _this3.renderRanges(),
      calendarWrapper
    );
  };

  this.renderRanges = function () {
    var customRangeClasses = {
      'dateRangeInput__rangeButton': true,
      'dateRangeInput__rangeButton--active': _this3.isValueCustomRange() || _this3.state.calendarOpen
    };

    var ranges = '';

    if (_this3.props.ranges.length > 0) {
      ranges = _react2.default.createElement(
        'ul',
        { className: 'dateRangeInput__defined-ranges' },
        _this3.renderRangeItems(),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              onMouseEnter: _this3.handleShowCustomRange,
              onMouseLeave: _this3.handleHideCustomRange,
              className: (0, _classnames3.default)(customRangeClasses),
              onClick: _this3.clearSelectedRange
            },
            'Custom Range'
          )
        )
      );
    }

    return ranges;
  };

  this.renderRangeItems = function () {
    return _this3.props.ranges.map(function (range) {
      var classes = {
        'dateRangeInput__rangeButton': true,
        'dateRangeInput__rangeButton--active': _this3.hasValidDate() && _this3.state.value.isSame(range.value)
      };

      if (_this3.state.calendarOpen) {
        classes['dateRangeInput__rangeButton--active'] = false;
      }
      return _react2.default.createElement(
        'li',
        { key: 'range_' + range.label },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onMouseEnter: _this3.handleHighlightRange.bind(null, range.value),
            onMouseLeave: _this3.handleUnhighlightRange,
            className: (0, _classnames3.default)(classes),
            onClick: _this3.handlePredefinedRangeSelect.bind(null, range.value)
          },
          range.label
        )
      );
    });
  };
};

exports.default = DateRangeInput;