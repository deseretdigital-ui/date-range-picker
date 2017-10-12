'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDates = require('react-dates');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment-range');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultRanges = [{
  'label': 'Today',
  'value': _moment2.default.range((0, _moment2.default)().startOf('day'), (0, _moment2.default)().startOf('day'))
}, {
  'label': 'Yesterday',
  'value': _moment2.default.range((0, _moment2.default)().startOf('day').subtract(1, 'days'), (0, _moment2.default)().startOf('day').subtract(1, 'days'))
}, {
  'label': 'Last 7 Days',
  'value': _moment2.default.range((0, _moment2.default)().startOf('day').subtract(6, 'days'), (0, _moment2.default)().startOf('day'))
}, {
  'label': 'Last 30 Days',
  'value': _moment2.default.range((0, _moment2.default)().startOf('day').subtract(29, 'days'), (0, _moment2.default)().startOf('day'))
}, {
  'label': 'This Month',
  'value': _moment2.default.range((0, _moment2.default)().startOf('day').startOf('month'), (0, _moment2.default)().startOf('day').endOf('month'))
}, {
  'label': 'Last Month',
  'value': _moment2.default.range((0, _moment2.default)().startOf('day').subtract(1, 'month').startOf('month'), (0, _moment2.default)().startOf('day').subtract(1, 'month').endOf('month'))
}];

var DateRangeInput = function (_Component) {
  _inherits(DateRangeInput, _Component);

  function DateRangeInput(props) {
    _classCallCheck(this, DateRangeInput);

    var _this = _possibleConstructorReturn(this, (DateRangeInput.__proto__ || Object.getPrototypeOf(DateRangeInput)).call(this, props));

    _initialiseProps.call(_this);

    _this.mediaQuery = null;
    _this.selectedValue = props.defaultValue;
    _this.state = {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: props.defaultValue
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

    // handleDatePickerSelect = (range) => {
    //   this.setState({
    //     value: range
    //   });

    //   this.props.onDateSelected(range);
    //   this.closeDropdownOnTimeout();
    // };

    // renderPicker = () => {
    //   let fromElementId = 'startDate';
    //   let toElementId = 'endDate';
    //   if (!this.props.showDefaultDates) {
    //     fromElementId = 'headerStartDate';
    //     toElementId = 'headerEndDate';
    //   }

    //   /*
    //   Old Props
    //   numberOfCalendars: this.state.numCalendars,
    //     value: this.state.value,
    //     onSelect: this.handleDatePickerSelect,
    //     singleDateRange: this.props.selectSingleDay,
    //    */
    //   let props = {
    //     ref: 'dateRangePicker',
    //     onDatesChange: this.props.handleDateChange,
    //     onFocusChange: this.props.handleFocusChange,
    //     numberOfMonths: this.state.numCalendars,
    //     withPortal: false,
    //     startDatePlaceholderText: 'From',
    //     endDatePlaceholderText: 'To',
    //     orientation: 'horizontal',
    //     showClearDates: false,
    //     startDateId: fromElementId,
    //     endDateId: toElementId,
    //     disabled: false,
    //     focusedInput: this.props.focusedInput,
    //     startDate: this.props.checkinDate,
    //     endDate: this.props.checkoutDate,
    //     hideKeyboardShortcutsPanel: true,
    //     daySize: this.props.daySize,
    //   };

    //   let hasError = false;
    //   if (this.props.errors.checkin_date || this.props.errors.checkout_date) {
    //     hasError = true;
    //   }

    //   let wrapperClasses = classnames({
    //     [this.props.wrapperClass]: true,
    //     [this.props.wrapperClass + '--dateError']: hasError,
    //     /*[this.props.wrapperClass + '--editable']: !isMobile(),*/
    //     [this.props.wrapperClass + '--daySize-' + this.props.daySize]: true
    //   });

    //   if (this.props.minimumDate) {
    //     props.minimumDate = this.props.minimumDate;
    //   }

    //   if (this.props.maximumDate) {
    //     props.maximumDate = this.props.maximumDate;
    //   }

    //   return (
    //     <div className={wrapperClasses}>
    //       <DateRangePicker {...props} />
    //     </div>
    //   );
    // };

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'dateRangeInput', ref: 'dateRangeInputWrapper' },
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
    value: _propTypes2.default.object
  })),
  defaultValue: _propTypes2.default.object,
  alwaysShowCalendar: _propTypes2.default.bool,
  maximumDate: _propTypes2.default.instanceOf(Date),
  minimumDate: _propTypes2.default.instanceOf(Date),
  defaultDisplayValue: _propTypes2.default.string,
  selectSingleDay: _propTypes2.default.bool,

  /* new props types for react-dates */
  wrapperClass: _propTypes2.default.string,
  checkinDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
  checkoutDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
  errors: _propTypes2.default.object,
  handleDateChange: _propTypes2.default.func,
  handleFocusChange: _propTypes2.default.func,
  focusedInput: _propTypes2.default.string,
  daySize: _propTypes2.default.number
};
DateRangeInput.defaultProps = {
  onDateSelected: function onDateSelected() {},
  defaultValue: defaultRanges[2].value,
  alwaysShowCalendar: true,
  ranges: defaultRanges,
  defaultDisplayValue: 'Select a date range',
  selectSingleDay: false,

  /* new props for react-dates */
  wrapperClass: 'DateInputWrapper',
  checkinDate: null,
  checkoutDate: null,
  errors: {
    checkin_date: false,
    checkout_date: false
  },
  handleDateChange: function handleDateChange() {},
  handleFocusChange: function handleFocusChange() {},
  focusedInput: null,
  daySize: 36
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.addMediaMatch = function () {
    _this2.mediaQuery = window.matchMedia('only screen and (max-width: 980px)');
    _this2.mediaQuery.addListener(_this2.observeMediaQuery);

    _this2.observeMediaQuery();
  };

  this.observeMediaQuery = function () {
    var numCalendars = _this2.mediaQuery.matches ? 1 : 2;

    _this2.setState({ numCalendars: numCalendars });
  };

  this.toggleDropdown = function () {
    var dropdownOpen = !_this2.state.dropdownOpen;
    _this2.setState({ dropdownOpen: dropdownOpen });
  };

  this.closeDropdown = function (e) {
    var wrapper = _this2.refs.dateRangeInputWrapper;

    if (wrapper && !wrapper.contains(e.target)) {
      _this2.closeDropdownOnTimeout();
    }
  };

  this.showCalendar = function () {
    _this2.setState({ calendarOpen: true });
  };

  this.getDisplayValue = function () {
    var displayValue = _this2.props.defaultDisplayValue;

    if (_this2.state.value) {
      var displayFormat = 'DD MMM YYYY';
      displayValue = _this2.state.value.start.format(displayFormat) + ' - ' + _this2.state.value.end.format(displayFormat);
    }

    return displayValue;
  };

  this.handlePredefinedRangeSelect = function (range) {
    _this2.selectedValue = range;

    _this2.setState({
      value: range,
      dropdownOpen: false,
      calendarOpen: false
    });

    _this2.props.onDateSelected(range);
    _this2.closeDropdownOnTimeout();
  };

  this.handleDateChange = function (date) {
    console.log(date);
    var range = _moment2.default.range(date.startDate, date.endDate);

    _this2.selectedValue = range;

    _this2.setState({
      value: range
    });

    _this2.props.onDateSelected(range);
    _this2.closeDropdownOnTimeout();
  };

  this.handleHighlightRange = function (range) {
    if (!_this2.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    /*this.refs.dateRangePicker.setState({
      selectedStartDate: null,
      highlightedRange: range,
      highlightedDate: null,
      hideSelection: true,
      year: range.start.year(),
      month: range.start.month()
    });*/

    _this2.setState({
      value: range
    });
  };

  this.handleUnhighlightRange = function () {
    if (!_this2.isCalendarOpen()) {
      return;
    }

    /*let now = moment();
     // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    this.refs.dateRangePicker.setState({
      selectedStartDate: null,
      highlightedRange: null,
      highlightedDate: null,
      hideSelection: true,
      year: now.year(),
      month: now.month()
    });*/

    _this2.setState({
      value: _this2.selectedValue
    });
  };

  this.handleShowCustomRange = function () {
    if (!_this2.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    // this.refs.dateRangePicker.setState({
    //   hideSelection: false
    // });

    // TODO: Handle custom range
    // this.setState({
    //   value: null
    // });
  };

  this.handleHideCustomRange = function () {
    if (!_this2.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    // this.refs.dateRangePicker.setState({
    //   hideSelection: true
    // });

    // this.setState({
    //   value: this.selectedValue
    // });
  };

  this.clearSelectedRange = function () {
    _this2.setState({
      value: null
    });
  };

  this.closeDropdownOnTimeout = function () {
    setTimeout(function () {
      _this2.setState({ 'dropdownOpen': false });
    }, 0);
  };

  this.isCalendarOpen = function () {
    return _this2.props.alwaysShowCalendar || _this2.state.calendarOpen;
  };

  this.isValueCustomRange = function () {
    if (_this2.state.value === null) {
      return false;
    }

    if (_this2.state.value.calendarOpen) {
      return true;
    }

    var isCustom = true;
    _this2.props.ranges.forEach(function (range) {
      if (_this2.state.value.isSame(range.value)) {
        isCustom = false;
      }
    });

    return isCustom;
  };

  this.renderCalendar = function () {
    var props = {
      onDatesChange: _this2.handleDateChange,
      onFocusChange: _this2.props.handleFocusChange,
      numberOfMonths: _this2.state.numCalendars,
      withPortal: false,
      orientation: 'horizontal',
      focusedInput: _this2.props.focusedInput,
      startDate: _this2.props.checkinDate,
      endDate: _this2.props.checkoutDate,
      hideKeyboardShortcutsPanel: true,
      daySize: _this2.props.daySize
    };

    return _react2.default.createElement(_reactDates.DayPickerRangeController, _extends({}, props, {
      startDate: _this2.state.value.start,
      endDate: _this2.state.value.end
    }));
  };

  this.renderDropdown = function () {
    if (!_this2.state.dropdownOpen) {
      return '';
    }

    var calendarWrapper = '';
    var calendarOpen = _this2.isCalendarOpen();
    if (calendarOpen) {
      calendarWrapper = _react2.default.createElement(
        'div',
        { className: 'dateRangeInput__calendarWrapper' },
        _this2.renderCalendar()
      );
    }

    var dropdownClasses = {
      'dateRangeInput__dropdown': true,
      'dateRangeInput__dropdown--calendar-open': calendarOpen,
      'dateRangeInput__dropdown--has-ranges': _this2.props.ranges.length > 0
    };

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(dropdownClasses) },
      _this2.renderRanges(),
      calendarWrapper
    );
  };

  this.renderRanges = function () {
    var customRangeClasses = {
      'dateRangeInput__rangeButton': true,
      'dateRangeInput__rangeButton--active': _this2.isValueCustomRange() || _this2.state.calendarOpen
    };

    var ranges = '';

    if (_this2.props.ranges.length > 0) {
      ranges = _react2.default.createElement(
        'ul',
        { className: 'dateRangeInput__defined-ranges' },
        _this2.renderRangeItems(),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              onMouseEnter: _this2.handleShowCustomRange,
              onMouseLeave: _this2.handleHideCustomRange,
              className: (0, _classnames2.default)(customRangeClasses),
              onClick: _this2.showCalendar
            },
            'Custom Range'
          )
        )
      );
    }

    return ranges;
  };

  this.renderRangeItems = function () {
    return _this2.props.ranges.map(function (range) {
      var classes = {
        'dateRangeInput__rangeButton': true,
        'dateRangeInput__rangeButton--active': _this2.state.value.isSame(range.value)
      };

      if (_this2.state.calendarOpen) {
        classes['dateRangeInput__rangeButton--active'] = false;
      }
      return _react2.default.createElement(
        'li',
        { key: 'range_' + range.label },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onMouseEnter: _this2.handleHighlightRange.bind(null, range.value),
            onMouseLeave: _this2.handleUnhighlightRange,
            className: (0, _classnames2.default)(classes),
            onClick: _this2.handlePredefinedRangeSelect.bind(null, range.value)
          },
          range.label
        )
      );
    });
  };
};

exports.default = DateRangeInput;