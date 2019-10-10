import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Calendar from './Calendar';
import RangeOptions from './RangeOptions';
import CalendarContext from './Utils/CalendarContext';

const CalendarDropdown = props => {
  const {
    state: { dropdownOpen },
    isCalendarOpen,
  } = useContext(CalendarContext);

  if (!dropdownOpen) {
    return '';
  }

  let dropdownClasses = {
    dateRangeInput__dropdown: true,
    'dateRangeInput__dropdown--calendar-open': isCalendarOpen(),
    'dateRangeInput__dropdown--has-ranges': props.ranges.length > 0,
  };

  return (
    <div className={classnames(dropdownClasses)}>
      <RangeOptions
        ranges={props.ranges}
        onDateSelected={props.onDateSelected}
      />
      {isCalendarOpen() ? (
        <div className="dateRangeInput__calendarWrapper">
          <Calendar
            ranges={props.ranges}
            onDateSelected={props.onDateSelected}
            maximumDate={props.maximumDate}
            minimumDate={props.minimumDate}
            daySize={props.daySize}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

CalendarDropdown.propTypes = {
  daySize: PropTypes.number.isRequired,
  onDateSelected: PropTypes.func.isRequired,
  ranges: PropTypes.array.isRequired,
  maximumDate: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
};

export default CalendarDropdown;
