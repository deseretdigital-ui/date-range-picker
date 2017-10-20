import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DayPickerRangeController} from 'react-dates';
import momentProptypes from 'react-moment-proptypes';
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
      moment().startOf('month').startOf('day'),
      moment().endOf('month').startOf('day')
    )
  },
  {
    'label': 'Last Month',
    'value': moment.range(
      moment().subtract(1, 'month').startOf('month').startOf('day'),
      moment().subtract(1, 'month').endOf('month').startOf('day')
    )
  }
];

class DateRangeInput extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = null;

    let value = null;
    let startDate = null;
    let endDate = null;

    if (props.defaultValue
      && props.defaultValue.start
      && props.defaultValue.end
    ) {
      value = props.defaultValue;
      startDate = props.defaultValue.start;
      endDate = props.defaultValue.end;
    }

    this.state = {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: value,
      startDate: startDate,
      endDate:  endDate,
      focusedInput: null
    };
  }

  static propTypes = {
    onDateSelected: PropTypes.func,
    ranges: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: momentProptypes.momentObj
    })),
    defaultValue: momentProptypes.momentObj,
    alwaysShowCalendar: PropTypes.bool,
    singleCalendarBreakpoint: PropTypes.number,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    defaultDisplayValue: PropTypes.string,
    selectSingleDay: PropTypes.bool,
    wrapperClass: PropTypes.string,
    daySize: PropTypes.number
  };

  static defaultProps = {
    onDateSelected: () => {},
    defaultValue: null,
    alwaysShowCalendar: true,
    singleCalendarBreakpoint: 979,
    ranges: defaultRanges,
    defaultDisplayValue: 'Select a date range',
    selectSingleDay: true,
    wrapperClass: 'DateInputWrapper',
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
    let breakpoint = this.props.singleCalendarBreakpoint;
    let media = 'only screen and (max-width: ' + breakpoint + 'px)';
    this.mediaQuery = window.matchMedia(media);
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
        this.setState({
          focusedInput: 'startDate'
        });
      }
    }
  };

  closeDropdown = (e) => {
    let wrapper = this.dateRangeInputWrapper;

    if (wrapper && !wrapper.contains(e.target)) {
      this.closeDropdownOnTimeout();
    }
  };

  hasValidDate = () => {
    let isValid = false;

    if (this.state.value
      && this.state.value.start instanceof moment
      && this.state.value.end instanceof moment
    ) {
      isValid = true;
    }

    return isValid;
  };

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

    // When picking new start date and we already have
    // an end date, let's clear the end date and
    // allow picking a new one. Otherwise, the
    // calendar will close before we have a chance to
    // select a new end date.
    if (this.state.startDate instanceof moment
      && date.startDate.isBefore(this.state.startDate)
    ) {
      date.endDate = null;
    }

    if (date.startDate && date.endDate) {
      range = moment.range(
        date.startDate.startOf('day'),
        date.endDate.startOf('day')
      );

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

  clearSelectedRange = (clearValue = false) => {
    let newState = {
      startDate: null,
      endDate: null,
      focusedInput: 'startDate'
    };

    if (clearValue) {
      newState.value = null;
    }

    this.setState(newState);
  };

  handleIsOutsideRange = (day) => {
    let outside = false;
    let minDate = null;
    let maxDate = null;

    if (this.props.minimumDate) {
      minDate = moment(this.props.minimumDate);
      if (day.isBefore(minDate)) {
        outside = true;
      }
    }

    if (this.props.maximumDate) {
      maxDate = moment(this.props.maximumDate);
      if (day.isAfter(maxDate)) {
        outside = true;
      }
    }

    return outside;
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
      isOutsideRange: this.handleIsOutsideRange,
      withPortal: false,
      orientation: 'horizontal',
      focusedInput: this.state.focusedInput,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      hideKeyboardShortcutsPanel: true,
      daySize: this.props.daySize,
      minimumNights: 0,
      initialVisibleMonth: () => {
        let month = moment();
        if (this.state.value && this.state.value.start instanceof moment) {
          // Clone the start date
          month = moment(this.state.value.start);
        }
        // Render one month before the start date if there are custom ranges
        if (this.state.numCalendars > 1 && this.props.ranges.length) {
          month = month.subtract(1, 'months');
        }
        return month;
      }
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
    let wrapperClasses = classnames({
      dateRangeInput: true,
      [this.props.wrapperClass]: true
    });

    return (
      <div
        className={wrapperClasses}
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
