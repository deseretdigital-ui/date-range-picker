import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isValidDate from './Utils/isValidDate';
import CalendarContext from './Utils/CalendarContext';
import { UPDATE_STATE_VALUE } from './Utils/reducer';

const RangeOptionItem = props => {
  const {
    state: { currentValue },
    dispatch,
    isCalendarOpen,
  } = useContext(CalendarContext);
  const calendarOpen = isCalendarOpen();
  const handleHighlightRange = range => {
    if (!isCalendarOpen()) {
      return;
    }

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'startDate',
      value: range ? range.start : null,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'endDate',
      value: range ? range.start : null,
    });
  };

  const handleUnhighlightRange = () => {
    if (!isCalendarOpen()) {
      return;
    }

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'startDate',
      value: currentValue ? currentValue.start : null,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'endDate',
      value: currentValue ? currentValue.end : null,
    });
  };

  const classes = {
    dateRangeInput__rangeButton: true,
    'dateRangeInput__rangeButton--active':
      (isValidDate(currentValue) &&
        props.value &&
        currentValue.isSame(props.value)) ||
      (props.isCustomRange || calendarOpen),
  };

  if (calendarOpen) {
    classes['dateRangeInput__rangeButton--active'] = false;
  }

  return (
    <li>
      <button
        type="button"
        onMouseEnter={handleHighlightRange.bind(null, props.value)}
        onMouseLeave={handleUnhighlightRange}
        className={classnames(classes)}
        onClick={props.onClick.bind(null, props.value)}
      >
        {props.label}
      </button>
    </li>
  );
};

RangeOptionItem.propTypes = {
  value: PropTypes.object,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isCustomRange: PropTypes.bool,
};

RangeOptionItem.defaultProps = {
  isCustomRange: false,
};

export default RangeOptionItem;
