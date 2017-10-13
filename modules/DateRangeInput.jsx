import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DayPickerRangeController} from 'react-dates';
import moment from 'moment';
import {} from 'moment-range';
import classnames from 'classnames';

const defaultRanges = [
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

class DateRangeInput extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = null;

    this.state = {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: props.defaultValue,
      startDate: props.defaultValue.start,
      endDate: props.defaultValue.end,
      focusedInput: null
    };
  }

  static propTypes = {
    onDateSelected: PropTypes.func,
    ranges: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.object
    })),
    defaultValue: PropTypes.object,
    alwaysShowCalendar: PropTypes.bool,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    defaultDisplayValue: PropTypes.string,
    selectSingleDay: PropTypes.bool,

    /* new props types for react-dates */
    wrapperClass: PropTypes.string,
    startDate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    errors: PropTypes.object,
    handleDateChange: PropTypes.func,
    handleFocusChange: PropTypes.func,
    focusedInput: PropTypes.string,
    daySize: PropTypes.number
  };

  static defaultProps = {
    onDateSelected: () => {},
    defaultValue: defaultRanges[2].value,
    alwaysShowCalendar: true,
    ranges: defaultRanges,
    defaultDisplayValue: 'Select a date range',
    selectSingleDay: false,

    /* new props for react-dates */
    wrapperClass: 'DateInputWrapper',
    startDate: null,
    endDate: null,
    errors: {
      start_date: false,
      end_date: false
    },
    handleDateChange: () => { },
    handleFocusChange: () => { },
    focusedInput: null,
    daySize: 36
  };

  componentDidMount() {
    this.addMediaMatch();
    window.addEventListener('mousedown', this.closeDropdown, false);
    window.addEventListener('touchstart', this.closeDropdown, false);
  }

  componentWillUnmount() {
    this.mediaQuery.removeListener(this.observeMediaQuery);
    window.removeEventListener('mousedown', this.closeDropdown);
    window.removeEventListener('touchstart', this.closeDropdown);
  }

  addMediaMatch = () => {
    this.mediaQuery = window.matchMedia('only screen and (max-width: 979px)');
    this.mediaQuery.addListener(this.observeMediaQuery);

    this.observeMediaQuery();
  };

  observeMediaQuery = () => {
    let numCalendars = (this.mediaQuery.matches) ? 1 : 2;

    this.setState({numCalendars});
  };

  toggleDropdown = () => {
    let dropdownOpen = !this.state.dropdownOpen;
    let focusedInput = this.state.dropdownOpen ? null : 'startDate';
    this.setState({
      dropdownOpen,
      focusedInput
    });

    if (dropdownOpen) {
      if (this.props.ranges.length === 0) {
        this.clearSelectedRange();
      }
    }
  };

  closeDropdown = (e) => {
    let wrapper = this.dateRangeInputWrapper;

    if (wrapper && !wrapper.contains(e.target)) {
      this.closeDropdownOnTimeout();
    }
  };

  hasValidDate= () => {
    let isValid = false;

    if (this.state.value) {
      isValid = true;
    }

    return isValid;
  }

  getDisplayValue = () => {
    let displayValue = this.props.defaultDisplayValue;

    if (this.hasValidDate()) {
      let displayFormat = 'DD MMM YYYY'
      displayValue = this.state.value.start.format(displayFormat)
        + ' - '
        + this.state.value.end.format(displayFormat);
    }

    return displayValue;
  };

  handlePredefinedRangeSelect = (range) => {
    this.setState({
      value: range,
      startDate: range.start,
      endDate: range.end,
      calendarOpen: false
    });

    this.props.onDateSelected(range);
    this.closeDropdownOnTimeout();
  };

  handleDateChange = (date) => {
    let range;

    if (date.startDate && date.endDate) {
      range = moment.range(date.startDate, date.endDate);

      this.setState({
        value: range,
        startDate: date.startDate,
        endDate: date.endDate,
        calendarOpen: false
      });

      this.props.onDateSelected(range);
      this.closeDropdownOnTimeout();
    } else if (date.startDate) {
      this.setState({
        startDate: date.startDate,
        endDate: null
      });
    } else if (date.endDate) {
      this.setState({
        endDate: date.endDate,
        startDate: null
      });
    }
  };

  handleFocusChange = (focusedInput) => {
    this.setState({
      focusedInput: focusedInput,
    });
  };

  handleHighlightRange = (range) => {
    if (!this.isCalendarOpen()) {
      return;
    }

    this.setState({
      startDate: range.start,
      endDate: range.end
    });
  };

  handleUnhighlightRange = () => {
    if (!this.isCalendarOpen()) {
      return;
    }

    this.setState({
      startDate: this.state.value.start,
      endDate: this.state.value.end
    });
  };

  clearSelectedRange = () => {
    this.setState({
      startDate: null,
      endDate: null,
      focusedInput: 'startDate'
    });
  };

  closeDropdownOnTimeout = () => {
    setTimeout(() => {
      this.setState({
        dropdownOpen: false
      });
    }, 0);
  };

  isCalendarOpen = () => {
    return this.props.alwaysShowCalendar || this.state.calendarOpen;
  };

  isValueCustomRange = () => {
    if (this.state.value === null) {
      return false;
    }

    let isCustom = true;
    this.props.ranges.forEach((range) => {
      if (this.state.value.isSame(range.value)) {
        isCustom = false;
      }
    });

    return isCustom;
  };

  renderCalendar = () => {
    let props = {
      onDatesChange: this.handleDateChange,
      onFocusChange: this.handleFocusChange,
      numberOfMonths: this.state.numCalendars,
      withPortal: false,
      orientation: 'horizontal',
      focusedInput: this.state.focusedInput,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      hideKeyboardShortcutsPanel: true,
      daySize: this.props.daySize,
      minimumNights: 0
    };

    return (
      <DayPickerRangeController
        {...props}
      />
    );
  };

  renderDropdown = () => {
    if (!this.state.dropdownOpen) {
      return '';
    }

    let calendarWrapper = '';
    let calendarOpen = this.isCalendarOpen();
    if (calendarOpen) {
      calendarWrapper = (
        <div className="dateRangeInput__calendarWrapper">
          {this.renderCalendar()}
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
  };

  renderRanges = () => {
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
              onClick={this.clearSelectedRange}
            >
              Custom Range
            </button>
          </li>
        </ul>
      );
    }

    return ranges;
  };

  renderRangeItems = () => {
    return this.props.ranges.map((range) => {
      var classes = {
        'dateRangeInput__rangeButton': true,
        'dateRangeInput__rangeButton--active':
          this.hasValidDate()
            && this.state.value.isSame(range.value)
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
  };

  render() {
    return (
      <div
        className="dateRangeInput"
        ref={ref => this.dateRangeInputWrapper = ref }
      >
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
}

export default DateRangeInput;
