import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import moment from './Utils/momentRange';
import isValidDate from './Utils/isValidDate';
import CalendarContext from './Utils/CalendarContext';
import { UPDATE_STATE_VALUE } from './Utils/reducer';

const Calendar = props => {
  const {
    state: { numCalendars, focusedInput, startDate, endDate, currentValue },
    dispatch,
    closeDropdownOnTimeout,
  } = useContext(CalendarContext);
  const handleIsOutsideRange = day => {
    let outside = false;
    let minDate = null;
    let maxDate = null;

    if (props.minimumDate) {
      minDate = moment(props.minimumDate);
      if (day.isBefore(minDate)) {
        outside = true;
      }
    }

    if (props.maximumDate) {
      maxDate = moment(props.maximumDate);
      if (day.isAfter(maxDate)) {
        outside = true;
      }
    }

    return outside;
  };

  const handleFocusChange = newFocusedInput =>
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'focusedInput',
      value: newFocusedInput ? newFocusedInput : START_DATE,
    });

  const handleDateChange = date => {
    if (date.startDate && date.endDate) {
      let range = moment.range(
        date.startDate.startOf('day'),
        date.endDate.startOf('day')
      );

      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'currentValue',
        value: range,
      });
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'startDate',
        value: date.startDate,
      });
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'endDate',
        value: date.endDate,
      });

      props.onDateSelected(range);

      // Close the calendar after selecting the end date
      if (focusedInput == END_DATE) {
        closeDropdownOnTimeout();
      }
    } else if (date.startDate) {
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'startDate',
        value: date.startDate,
      });
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'endDate',
        value: null,
      });
    } else if (date.endDate) {
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'startDate',
        value: null,
      });
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'endDate',
        value: date.endDate,
      });
    }
  };

  let calendarProps = {
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
    initialVisibleMonth: () => {
      let month = moment();
      let endDate = null;

      if (isValidDate(currentValue)) {
        // Clone the start date
        month = moment(currentValue.start);
        endDate = currentValue.end;
      }

      // Render one month before the start date if there are custom ranges
      // only render one month before if end date and start date are in the
      // same month
      if (
        numCalendars > 1 &&
        props.ranges.length &&
        (endDate === null || endDate.month() === month.month())
      ) {
        month = month.subtract(1, 'months');
      }

      return month;
    },
  };

  return <DayPickerRangeController {...calendarProps} />;
};

Calendar.propTypes = {
  daySize: PropTypes.number.isRequired,
  onDateSelected: PropTypes.func.isRequired,
  ranges: PropTypes.array.isRequired,
  maximumDate: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
};

export default Calendar;
