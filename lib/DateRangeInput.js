'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDaterangePicker = require('react-daterange-picker');

var _reactDaterangePicker2 = _interopRequireDefault(_reactDaterangePicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment-range');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var DateRangeInput = _react2['default'].createClass({
  displayName: 'DateRangeInput',

  mediaQuery: null,

  propTypes: {
    onDateSelected: _react2['default'].PropTypes.func,
    ranges: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
      label: _react2['default'].PropTypes.string,
      value: _react2['default'].PropTypes.object
    })),
    defaultValue: _react2['default'].PropTypes.object,
    alwaysShowCalendar: _react2['default'].PropTypes.bool,
    maximumDate: _react2['default'].PropTypes.instanceOf(Date),
    minimumDate: _react2['default'].PropTypes.instanceOf(Date)
  },

  getDefaultProps: function getDefaultProps() {
    var defaultRanges = [{
      'label': 'Today',
      'value': _moment2['default'].range((0, _moment2['default'])().startOf('day'), (0, _moment2['default'])().startOf('day'))
    }, {
      'label': 'Yesterday',
      'value': _moment2['default'].range((0, _moment2['default'])().startOf('day').subtract(1, 'days'), (0, _moment2['default'])().startOf('day').subtract(1, 'days'))
    }, {
      'label': 'Last 7 Days',
      'value': _moment2['default'].range((0, _moment2['default'])().startOf('day').subtract(6, 'days'), (0, _moment2['default'])().startOf('day'))
    }, {
      'label': 'Last 30 Days',
      'value': _moment2['default'].range((0, _moment2['default'])().startOf('day').subtract(29, 'days'), (0, _moment2['default'])().startOf('day'))
    }, {
      'label': 'This Month',
      'value': _moment2['default'].range((0, _moment2['default'])().startOf('day').startOf('month'), (0, _moment2['default'])().startOf('day').endOf('month'))
    }, {
      'label': 'Last Month',
      'value': _moment2['default'].range((0, _moment2['default'])().startOf('day').subtract(1, 'month').startOf('month'), (0, _moment2['default'])().startOf('day').subtract(1, 'month').endOf('month'))
    }];

    return {
      onDateSelected: function onDateSelected() {},
      defaultValue: defaultRanges[2].value,
      alwaysShowCalendar: true,
      ranges: defaultRanges
    };
  },

  getInitialState: function getInitialState() {
    return {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: this.props.defaultValue
    };
  },

  componentDidMount: function componentDidMount() {
    this.addMediaMatch();
    window.addEventListener('mousedown', this.closeDropdown, false);
    window.addEventListener('touchstart', this.closeDropdown, false);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.mediaQuery.removeListener(this.observeMediaQuery);
    window.removeEventListener('mousedown', this.closeDropdown);
    window.addEventListener('touchstart', this.closeDropdown);
  },

  addMediaMatch: function addMediaMatch() {
    this.mediaQuery = window.matchMedia('only screen and (max-width: 980px)');
    this.mediaQuery.addListener(this.observeMediaQuery);

    this.observeMediaQuery();
  },

  observeMediaQuery: function observeMediaQuery() {
    var numCalendars = this.mediaQuery.matches ? 1 : 2;
    this.setState({ numCalendars: numCalendars });
  },

  toggleDropdown: function toggleDropdown() {
    var dropdownOpen = !this.state.dropdownOpen;
    this.setState({ dropdownOpen: dropdownOpen });
  },

  closeDropdown: function closeDropdown(e) {
    var wrapper = this.refs.dateRangeInputWrapper;

    if (!wrapper.contains(e.target)) {
      this.closeDropdownOnTimeout();
    }
  },

  showCalendar: function showCalendar() {
    this.setState({ calendarOpen: true });
  },

  getDisplayValue: function getDisplayValue() {
    var displayValue = 'Select a date range';
    if (this.state.value) {
      var displayFormat = 'DD MMM YYYY';
      displayValue = this.state.value.start.format(displayFormat) + ' - ' + this.state.value.end.format(displayFormat);
    }
    return displayValue;
  },

  handlePredefinedRangeSelect: function handlePredefinedRangeSelect(range) {
    this.setState({
      value: range,
      dropdownOpen: false,
      calendarOpen: false
    });

    this.props.onDateSelected(range);
    this.closeDropdownOnTimeout();
  },

  handleDatePickerSelect: function handleDatePickerSelect(range) {
    this.setState({
      value: range
    });

    this.props.onDateSelected(range);
    this.closeDropdownOnTimeout();
  },

  handleHighlightRange: function handleHighlightRange(range) {
    if (!this.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    this.refs.dateRangePicker.setState({
      selectedStartDate: null,
      highlightedRange: range,
      highlightedDate: null,
      hideSelection: true,
      year: range.start.year(),
      month: range.start.month()
    });
  },

  handleUnhighlightRange: function handleUnhighlightRange() {
    if (!this.isCalendarOpen()) {
      return;
    }

    var now = (0, _moment2['default'])();

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    this.refs.dateRangePicker.setState({
      selectedStartDate: null,
      highlightedRange: null,
      highlightedDate: null,
      hideSelection: true,
      year: now.year(),
      month: now.month()
    });
  },

  handleShowCustomRange: function handleShowCustomRange() {
    if (!this.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    this.refs.dateRangePicker.setState({
      hideSelection: false
    });
  },

  handleHideCustomRange: function handleHideCustomRange() {
    if (!this.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    this.refs.dateRangePicker.setState({
      hideSelection: true
    });
  },

  closeDropdownOnTimeout: function closeDropdownOnTimeout() {
    var _this = this;

    setTimeout(function () {
      _this.setState({ 'dropdownOpen': false });
    }, 0);
  },

  isCalendarOpen: function isCalendarOpen() {
    return this.props.alwaysShowCalendar || this.state.calendarOpen;
  },

  isValueCustomRange: function isValueCustomRange() {
    var _this2 = this;

    if (this.state.value === null) {
      return false;
    }

    if (this.state.value.calendarOpen) {
      return true;
    }

    var isCustom = true;
    this.props.ranges.forEach(function (range) {
      if (_this2.state.value.isSame(range.value)) {
        isCustom = false;
      }
    });

    return isCustom;
  },

  renderPicker: function renderPicker() {
    var props = {
      ref: 'dateRangePicker',
      numberOfCalendars: this.state.numCalendars,
      value: this.state.value,
      onSelect: this.handleDatePickerSelect
    };

    if (this.props.minimumDate) {
      props.minimumDate = this.props.minimumDate;
    }

    if (this.props.maximumDate) {
      props.maximumDate = this.props.maximumDate;
    }

    return _react2['default'].createElement(_reactDaterangePicker2['default'], props);
  },

  renderDropdown: function renderDropdown() {
    if (!this.state.dropdownOpen) {
      return null;
    }

    var calendarWrapper = null;
    var calendarOpen = this.isCalendarOpen();
    if (calendarOpen) {
      calendarWrapper = _react2['default'].createElement(
        'div',
        { className: 'dateRangeInput__calendarWrapper' },
        this.renderPicker()
      );
    }

    var dropdownClasses = {
      'dateRangeInput__dropdown': true,
      'dateRangeInput__dropdown--calendar-open': calendarOpen
    };

    var customRangeClases = {
      'dateRangeInput__rangeButton': true,
      'dateRangeInput__rangeButton--active': this.isValueCustomRange() || this.state.calendarOpen
    };

    return _react2['default'].createElement(
      'div',
      { className: (0, _classnames2['default'])(dropdownClasses) },
      _react2['default'].createElement(
        'ul',
        { className: 'dateRangeInput__defined-ranges' },
        this.renderRangeItems(),
        _react2['default'].createElement(
          'li',
          null,
          _react2['default'].createElement(
            'button',
            {
              type: 'button',
              onMouseEnter: this.handleShowCustomRange,
              onMouseLeave: this.handleHideCustomRange,
              className: (0, _classnames2['default'])(customRangeClases),
              onClick: this.showCalendar
            },
            'Custom Range'
          )
        )
      ),
      calendarWrapper
    );
  },

  renderRangeItems: function renderRangeItems() {
    var _this3 = this;

    return this.props.ranges.map(function (range) {
      var classes = {
        'dateRangeInput__rangeButton': true,
        'dateRangeInput__rangeButton--active': _this3.state.value.isSame(range.value)
      };

      if (_this3.state.calendarOpen) {
        classes['dateRangeInput__rangeButton--active'] = false;
      }

      return _react2['default'].createElement(
        'li',
        { key: 'range_' + range.label },
        _react2['default'].createElement(
          'button',
          {
            type: 'button',
            onMouseEnter: _this3.handleHighlightRange.bind(null, range.value),
            onMouseLeave: _this3.handleUnhighlightRange,
            className: (0, _classnames2['default'])(classes),
            onClick: _this3.handlePredefinedRangeSelect.bind(null, range.value)
          },
          range.label
        )
      );
    });
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'dateRangeInput', ref: 'dateRangeInputWrapper' },
      _react2['default'].createElement(
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
});

exports['default'] = DateRangeInput;
module.exports = exports['default'];