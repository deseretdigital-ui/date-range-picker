/* global module:readonly */
import { hot } from 'react-hot-loader';
import React, { useEffect, useCallback, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { START_DATE } from 'react-dates/constants';
import classnames from 'classnames';
import CalendarDropdown from './CalendarDropdown';
import InputButton from './InputButton';
import CalendarContext from './Utils/CalendarContext';
import momentRangeProp from './Utils/momentRangeProp';
import reducer, { UPDATE_STATE_VALUE } from './Utils/reducer';
import moment from './Utils/momentRange';

const defaultRanges = [
  {
    label: 'Today',
    value: moment.range(moment().startOf('day'), moment().startOf('day')),
  },
  {
    label: 'Yesterday',
    value: moment.range(
      moment()
        .startOf('day')
        .subtract(1, 'days'),
      moment()
        .endOf('day')
        .subtract(1, 'days')
    ),
  },
  {
    label: 'Last 7 Days',
    value: moment.range(
      moment()
        .startOf('day')
        .subtract(6, 'days'),
      moment().endOf('day')
    ),
  },
  {
    label: 'Last 30 Days',
    value: moment.range(
      moment()
        .startOf('day')
        .subtract(30, 'days'),
      moment().endOf('day')
    ),
  },
  {
    label: 'This Month',
    value: moment.range(
      moment()
        .startOf('month')
        .startOf('day'),
      moment()
        .endOf('month')
        .endOf('day')
    ),
  },
  {
    label: 'Last Month',
    value: moment.range(
      moment()
        .subtract(1, 'month')
        .startOf('month')
        .startOf('day'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
        .endOf('day')
    ),
  },
];

const DateRangeInput = props => {
  let wrapperClasses = classnames({
    dateRangeInput: true,
    [props.wrapperClass]: true,
  });

  const dateRangeInputWrapperRef = useRef(null);

  const getInitialCurrentValue = () => {
    let newValue = props.value;

    if (!newValue && props.defaultValue) {
      newValue = props.defaultValue;
    }

    return newValue;
  };

  const getInitialStartDate = () => {
    let startDate = null;

    if (!props.value && props.defaultValue) {
      startDate = props.defaultValue.start;
    }

    return startDate;
  };

  const getInitialEndDate = () => {
    let endDate = null;

    if (!props.value && props.defaultValue) {
      endDate = props.defaultValue.end;
    }

    return endDate;
  };

  const initialState = {
    isCustomRange: false,
    dropdownOpen: false,
    calendarOpen: false,
    numCalendars: 2,
    focusedInput: START_DATE,
    currentValue: getInitialCurrentValue(),
    startDate: getInitialStartDate(),
    endDate: getInitialEndDate(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let media =
      'only screen and (max-width: ' + props.singleCalendarBreakpoint + 'px)';
    const mediaQuery = window.matchMedia(media);
    const observeMediaQuery = () => {
      let matches = mediaQuery.matches;
      let numCalendars = matches ? 1 : 2;

      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'numCalendars',
        value: numCalendars,
      });
    };

    mediaQuery.addListener(observeMediaQuery);

    observeMediaQuery();

    return () => {
      mediaQuery.removeListener(observeMediaQuery);
    };
  }, [dispatch, props.singleCalendarBreakpoint]);

  const isCalendarOpen = () => {
    return props.alwaysShowCalendar || state.calendarOpen;
  };

  // These close functions need to be defined before the following useCallback
  const closeDropdownOnTimeout = useCallback(() => {
    setTimeout(() => {
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'dropdownOpen',
        value: false,
      });

      if (state.startDate && !state.endDate) {
        // If the dropdown is closing and the user selected only a start date,
        // set the end date to be the same as the start date
        // and update currentValue
        const newEndDate = moment(state.startDate);
        dispatch({
          type: UPDATE_STATE_VALUE,
          name: 'endDate',
          value: newEndDate,
        });

        dispatch({
          type: UPDATE_STATE_VALUE,
          name: 'currentValue',
          value: moment.range(state.startDate, newEndDate),
        });
      }
    }, 0);
  }, [state.startDate, state.endDate]);

  const closeDropdown = useCallback(
    e => {
      let wrapper = dateRangeInputWrapperRef.current;

      if (state.dropdownOpen && wrapper && !wrapper.contains(e.target)) {
        closeDropdownOnTimeout();
      }
    },
    [state.dropdownOpen, closeDropdownOnTimeout, dateRangeInputWrapperRef]
  );

  useEffect(() => {
    window.addEventListener('mousedown', closeDropdown, false);
    window.addEventListener('touchstart', closeDropdown, false);

    return () => {
      window.removeEventListener('mousedown', closeDropdown);
      window.removeEventListener('touchstart', closeDropdown);
    };
  }, [closeDropdown]);

  // Determine if the state needs to be udpated
  let dateRange = null;

  if (
    props.value &&
    state.currentValue &&
    !props.value.isSame(state.currentValue)
  ) {
    dateRange = props.value;
  } else if (!props.value && !state.currentValue && !state.isCustomRange) {
    dateRange = props.defaultValue;
  }

  if (dateRange) {
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'currentValue',
      value: dateRange,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'startDate',
      value: dateRange.start,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'endDate',
      value: dateRange.end,
    });
  }

  return (
    <CalendarContext.Provider
      value={{ state, dispatch, isCalendarOpen, closeDropdownOnTimeout }}
    >
      <div className={wrapperClasses} ref={dateRangeInputWrapperRef}>
        <InputButton
          ranges={props.ranges}
          defaultDisplayValue={props.defaultDisplayValue}
        />
        <CalendarDropdown
          ranges={props.ranges}
          onDateSelected={props.onDateSelected}
          maximumDate={props.maximumDate}
          minimumDate={props.minimumDate}
          daySize={props.daySize}
        />
      </div>
    </CalendarContext.Provider>
  );
};

DateRangeInput.propTypes = {
  onDateSelected: PropTypes.func,
  ranges: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: momentRangeProp,
    })
  ),
  value: momentRangeProp,
  defaultValue: momentRangeProp,
  alwaysShowCalendar: PropTypes.bool,
  singleCalendarBreakpoint: PropTypes.number,
  maximumDate: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
  defaultDisplayValue: PropTypes.string,
  wrapperClass: PropTypes.string,
  // Visual size of each day in the calendar in pixels
  daySize: PropTypes.number,
};

DateRangeInput.defaultProps = {
  onDateSelected: () => {},
  ranges: defaultRanges,
  value: null,
  defaultValue: moment.range(),
  alwaysShowCalendar: true,
  singleCalendarBreakpoint: 979,
  maximumDate: null,
  minimumDate: null,
  defaultDisplayValue: 'Select a date range',
  wrapperClass: 'DateInputWrapper',
  daySize: 36,
};

export default hot(module)(DateRangeInput);
