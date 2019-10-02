import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { START_DATE } from 'react-dates/constants';
import RangeOptionItem from './RangeOptionItem';
import CalendarContext from './Utils/CalendarContext';
import { UPDATE_STATE_VALUE } from './Utils/reducer';

const RangeOptions = props => {
  const {
    state: { currentValue, isCustomRange },
    dispatch,
  } = useContext(CalendarContext);

  useEffect(() => {
    if (!props.ranges.length) {
      return;
    }

    let isCustom = true;

    props.ranges.forEach(range => {
      if (currentValue && currentValue.isSame(range.value)) {
        isCustom = false;
      }
    });

    if (isCustom !== isCustomRange) {
      dispatch({
        type: UPDATE_STATE_VALUE,
        name: 'isCustomRange',
        value: isCustom,
      });
    }
  }, [isCustomRange, currentValue, props.ranges, dispatch]);

  const clearSelectedRange = () => {
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'isCustomRange',
      value: true,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'currentValue',
      value: null,
    });

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
      value: START_DATE,
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

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'closeDropdown',
      value: true,
    });
  };

  let ranges = '';

  if (props.ranges.length > 0) {
    ranges = (
      <ul className="dateRangeInput__defined-ranges">
        {props.ranges.map(range => {
          return (
            <RangeOptionItem
              key={`range_${range.label}`}
              value={range.value}
              label={range.label}
              onClick={handlePredefinedRangeSelect}
            />
          );
        })}
        <RangeOptionItem
          value={null}
          label="Custom Range"
          onClick={clearSelectedRange.bind(null)}
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
