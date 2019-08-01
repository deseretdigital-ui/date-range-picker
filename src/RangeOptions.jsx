import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RangeOptionItem from './RangeOptionItem';
import CalendarContext from './Utils/CalendarContext';
import { UPDATE_STATE_VALUE } from './Utils/reducer';

const RangeOptions = props => {
  const {
    state: { currentValue },
    dispatch,
    closeDropdownOnTimeout,
  } = useContext(CalendarContext);
  const clearSelectedRange = (clearCurrentValue = false) => {
    if (clearCurrentValue) {
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'currentValue',
        value: null,
      });
    }

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'startDate',
      value: null,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'endDate',
      value: null,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'focusedInput',
      value: 'startDate',
    });
  };
  const handlePredefinedRangeSelect = range => {
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'currentValue',
      value: range,
    });
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'startDate',
      value: range.start,
    });
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'endDate',
      value: range.end,
    });
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'calendarOpen',
      value: false,
    });

    props.onDateSelected(range);
    closeDropdownOnTimeout();
  };
  const isCurrentValueCustomRange = () => {
    // if (currentValue === null) {
    //   return false;
    // }

    let isCustom = true;
    props.ranges.forEach(range => {
      if (currentValue && currentValue.isSame(range.value)) {
        isCustom = false;
      }
    });

    return isCustom;
  };
  let ranges = '';

  if (props.ranges.length > 0) {
    const isCustomRange = isCurrentValueCustomRange();
    ranges = (
      <ul className="dateRangeInput__defined-ranges">
        {props.ranges.map(range => {
          return (
            <RangeOptionItem
              key={`range_${range.label}`}
              ranges={ranges}
              value={range.value}
              label={range.label}
              onClick={handlePredefinedRangeSelect}
              isCustomRange={isCustomRange}
            />
          );
        })}
        <RangeOptionItem
          value={null}
          label="Custom Range"
          onClick={clearSelectedRange.bind(null, true)}
          isCustomRange={isCustomRange}
        />
      </ul>
    );
  }

  return ranges;
};

RangeOptions.propTypes = {
  ranges: PropTypes.array.isRequired,
  onDateSelected: PropTypes.func.isRequired,
};

export default RangeOptions;
