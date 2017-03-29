import React from 'react';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';
import {} from 'moment-range';
import classnames from 'classnames';

let DateRangeInput = React.createClass({
  mediaQuery: null,

  propTypes: {
    onDateSelected: React.PropTypes.func,
    ranges: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.object
    })),
    defaultValue: React.PropTypes.object,
    alwaysShowCalendar: React.PropTypes.bool,
    maximumDate: React.PropTypes.instanceOf(Date),
    minimumDate: React.PropTypes.instanceOf(Date),
    defaultDisplayValue: React.PropTypes.string,
    selectSingleDay: React.PropTypes.bool
  },

  getDefaultProps() {
    let defaultRanges = [
      {
        'label': 'Today',
        'value': moment.range(
          moment().startOf('day'),
          moment().startOf('day')
        )
      },
      {
        'label': 'Yesterday',
        'value': moment.range(
          moment().startOf('day').subtract(1, 'days'),
          moment().startOf('day').subtract(1, 'days')
        )
      },
      {
        'label': 'Last 7 Days',
        'value': moment.range(
          moment().startOf('day').subtract(6, 'days'),
          moment().startOf('day')
        )
      },
      {
        'label': 'Last 30 Days',
        'value': moment.range(
          moment().startOf('day').subtract(29, 'days'),
          moment().startOf('day')
        )
      },
      {
        'label': 'This Month',
        'value': moment.range(
          moment().startOf('day').startOf('month'),
          moment().startOf('day').endOf('month')
        )
      },
      {
        'label': 'Last Month',
        'value': moment.range(
          moment().startOf('day').subtract(1, 'month').startOf('month'),
          moment().startOf('day').subtract(1, 'month').endOf('month')
        )
      }
    ];

    return {
      onDateSelected: () => {},
      defaultValue: defaultRanges[2].value,
      alwaysShowCalendar: true,
      ranges: defaultRanges,
      defaultDisplayValue: 'Select a date range',
      selectSingleDay: false
    }
  },

  getInitialState() {
    return {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: this.props.defaultValue
    }
  },

  componentDidMount () {
    this.addMediaMatch();
    window.addEventListener('mousedown', this.closeDropdown, false);
    window.addEventListener('touchstart', this.closeDropdown, false);
  },

  componentWillUnmount () {
    this.mediaQuery.removeListener(this.observeMediaQuery);
    window.removeEventListener('mousedown', this.closeDropdown);
    window.removeEventListener('touchstart', this.closeDropdown);
  },

  addMediaMatch: function() {
    this.mediaQuery = window.matchMedia('only screen and (max-width: 980px)');
    this.mediaQuery.addListener(this.observeMediaQuery);

    this.observeMediaQuery();
  },

  observeMediaQuery: function() {
    let numCalendars = (this.mediaQuery.matches) ? 1 : 2;

    this.setState({numCalendars});
  },

  toggleDropdown() {
    let dropdownOpen = !this.state.dropdownOpen;
    this.setState({dropdownOpen});
  },

  closeDropdown(e) {
    let wrapper = this.refs.dateRangeInputWrapper;

    if (wrapper && !wrapper.contains(e.target)) {
      this.closeDropdownOnTimeout();
    }
  },

  showCalendar() {
    this.setState({calendarOpen: true});
  },

  getDisplayValue() {
    let displayValue = this.props.defaultDisplayValue;
    if (this.state.value) {
      let displayFormat = 'DD MMM YYYY'
      displayValue = this.state.value.start.format(displayFormat)
        + ' - '
        + this.state.value.end.format(displayFormat);
    }
    return displayValue;
  },

  handlePredefinedRangeSelect(range) {
    this.setState({
      value: range,
      dropdownOpen: false,
      calendarOpen: false
    });

    this.props.onDateSelected(range);
    this.closeDropdownOnTimeout();
  },

  handleDatePickerSelect(range) {
    this.setState({
      value: range
    });

    this.props.onDateSelected(range);
    this.closeDropdownOnTimeout();
  },

  handleHighlightRange(range) {
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

  handleUnhighlightRange() {
    if (!this.isCalendarOpen()) {
      return;
    }

    let now = moment();

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

  handleShowCustomRange() {
    if (!this.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    this.refs.dateRangePicker.setState({
      hideSelection: false
    });
  },

  handleHideCustomRange() {
    if (!this.isCalendarOpen()) {
      return;
    }

    // @Note: We're directly changing state of the dateRangePicker
    // This has the potential to break as they update their library
    this.refs.dateRangePicker.setState({
      hideSelection: true
    });
  },

  clearSelectedRange() {
    this.setState({
      value: null
    });
  },

  closeDropdownOnTimeout() {
    setTimeout(() => {
      this.setState({'dropdownOpen': false});
    }, 0);
  },

  isCalendarOpen() {
    return this.props.alwaysShowCalendar || this.state.calendarOpen;
  },

  isValueCustomRange() {
    if (this.state.value === null) {
      return false;
    }

    if (this.state.value.calendarOpen) {
      return true;
    }

    let isCustom = true;
    this.props.ranges.forEach((range) => {
      if (this.state.value.isSame(range.value)) {
        isCustom = false;
      }
    });

    return isCustom;
  },

  renderPicker() {
    let props = {
      ref: 'dateRangePicker',
      numberOfCalendars: this.state.numCalendars,
      value: this.state.value,
      onSelect: this.handleDatePickerSelect,
      singleDateRange: this.props.selectSingleDay
    };

    if (this.props.minimumDate) {
      props.minimumDate = this.props.minimumDate;
    }

    if (this.props.maximumDate) {
      props.maximumDate = this.props.maximumDate;
    }

    return (
      <DateRangePicker {...props} />
    );
  },

  renderDropdown() {
    if (!this.state.dropdownOpen) {
      return null;
    }

    let calendarWrapper = null;
    let calendarOpen = this.isCalendarOpen();
    if (calendarOpen) {
      calendarWrapper = (
        <div className="dateRangeInput__calendarWrapper">
          {this.renderPicker()}
        </div>
      );
    }

    let dropdownClasses = {
      'dateRangeInput__dropdown': true,
      'dateRangeInput__dropdown--calendar-open': calendarOpen,
      'dateRangeInput__dropdown--has-ranges': this.props.ranges.length > 0
    };

    return (
      <div className={classnames(dropdownClasses)}>
        {this.renderRanges()}
        {calendarWrapper}
      </div>
    );
  },

  renderRanges() {
    let customRangeClasses = {
      'dateRangeInput__rangeButton': true,
      'dateRangeInput__rangeButton--active': this.isValueCustomRange()
        || this.state.calendarOpen
    };

    let ranges = '';

    if (this.props.ranges.length > 0) {
      ranges = (
        <ul className="dateRangeInput__defined-ranges">
          {this.renderRangeItems()}
          <li>
            <button
              type="button"
              onMouseEnter={this.handleShowCustomRange}
              onMouseLeave={this.handleHideCustomRange}
              className={classnames(customRangeClasses)}
              onClick={this.showCalendar}
            >
              Custom Range
            </button>
          </li>
        </ul>
      );
    }

    return ranges;
  },

  renderRangeItems() {
    return this.props.ranges.map((range) => {
      var classes = {
        'dateRangeInput__rangeButton': true,
        'dateRangeInput__rangeButton--active':
          this.state.value.isSame(range.value)
      };

      if (this.state.calendarOpen) {
        classes['dateRangeInput__rangeButton--active'] = false;
      }
      return (
        <li key={`range_${range.label}`}>
          <button
            type="button"
            onMouseEnter={this.handleHighlightRange.bind(null, range.value)}
            onMouseLeave={this.handleUnhighlightRange}
            className={classnames(classes)}
            onClick={this.handlePredefinedRangeSelect.bind(null, range.value)}
          >
            {range.label}
          </button>
        </li>
      );
    });
  },

  render() {
    return (
      <div className="dateRangeInput" ref="dateRangeInputWrapper">
        <button className="dateRangeInput__input"
          type="button"
          onClick={this.toggleDropdown}
        >
          {this.getDisplayValue()}
        </button>
        {this.renderDropdown()}
      </div>
    );
  }
});

export default DateRangeInput;
