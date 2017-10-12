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
    this.selectedValue = props.defaultValue;
    this.state = {
      dropdownOpen: false,
      calendarOpen: false,
      numCalendars: 2,
      value: props.defaultValue
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
    checkinDate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    checkoutDate: PropTypes.oneOfType([
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
    checkinDate: null,
    checkoutDate: null,
    errors: {
      checkin_date: false,
      checkout_date: false
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
    this.mediaQuery = window.matchMedia('only screen and (max-width: 980px)');
    this.mediaQuery.addListener(this.observeMediaQuery);

    this.observeMediaQuery();
  };

  observeMediaQuery = () => {
    let numCalendars = (this.mediaQuery.matches) ? 1 : 2;

    this.setState({numCalendars});
  };

  toggleDropdown = () => {
    let dropdownOpen = !this.state.dropdownOpen;
    this.setState({dropdownOpen});
  };

  closeDropdown = (e) => {
    let wrapper = this.refs.dateRangeInputWrapper;

    if (wrapper && !wrapper.contains(e.target)) {
      this.closeDropdownOnTimeout();
    }
  };

  showCalendar = () => {
    this.setState({calendarOpen: true});
  };

  getDisplayValue = () => {
    let displayValue = this.props.defaultDisplayValue;

    if (this.state.value) {
      let displayFormat = 'DD MMM YYYY'
      displayValue = this.state.value.start.format(displayFormat)
        + ' - '
        + this.state.value.end.format(displayFormat);
    }

    return displayValue;
  };

  handlePredefinedRangeSelect = (range) => {
    this.selectedValue = range;

    this.setState({
      value: range,
      dropdownOpen: false,
      calendarOpen: false
    });

    this.props.onDateSelected(range);
    this.closeDropdownOnTimeout();
  };

  // handleDatePickerSelect = (range) => {
  //   this.setState({
  //     value: range
  //   });

  //   this.props.onDateSelected(range);
  //   this.closeDropdownOnTimeout();
  // };

  handleDateChange = (date) => {
    console.log(date);
    let range = moment.range(date.startDate, date.endDate);

    this.selectedValue = range;

    this.setState({
      value: range
    });

    this.props.onDateSelected(range);
    this.closeDropdownOnTimeout();
  };

  handleHighlightRange = (range) => {
    if (!this.isCalendarOpen()) {
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

    this.setState({
      value: range
    });
  };

  handleUnhighlightRange = () => {
    if (!this.isCalendarOpen()) {
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

    this.setState({
      value: this.selectedValue
    });
  };

  handleShowCustomRange = () => {
    if (!this.isCalendarOpen()) {
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

  handleHideCustomRange = () => {
    if (!this.isCalendarOpen()) {
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

  clearSelectedRange = () => {
    this.setState({
      value: null
    });
  };

  closeDropdownOnTimeout = () => {
    setTimeout(() => {
      this.setState({'dropdownOpen': false});
    }, 0);
  };

  isCalendarOpen = () => {
    return this.props.alwaysShowCalendar || this.state.calendarOpen;
  };

  isValueCustomRange = () => {
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
  };

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

  renderCalendar = () => {
    let props = {
      onDatesChange: this.handleDateChange,
      onFocusChange: this.props.handleFocusChange,
      numberOfMonths: this.state.numCalendars,
      withPortal: false,
      orientation: 'horizontal',
      focusedInput: this.props.focusedInput,
      startDate: this.props.checkinDate,
      endDate: this.props.checkoutDate,
      hideKeyboardShortcutsPanel: true,
      daySize: this.props.daySize,
    };

    return (
      <DayPickerRangeController
          {...props}
          startDate={this.state.value.start}
          endDate={this.state.value.end}
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
              onClick={this.showCalendar}
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
  };

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
}

export default DateRangeInput;
