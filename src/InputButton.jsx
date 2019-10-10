import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { START_DATE } from 'react-dates/constants';
import isValidDate from './Utils/isValidDate';
import CalendarContext from './Utils/CalendarContext';
import { UPDATE_STATE_VALUE } from './Utils/reducer';

const InputButton = props => {
  const {
    state: { currentValue, dropdownOpen },
    dispatch,
  } = useContext(CalendarContext);
  const getDisplayValue = () => {
    let displayValue = props.defaultDisplayValue;

    if (isValidDate(currentValue)) {
      let displayFormat = 'DD MMM YYYY';
      displayValue =
        currentValue.start.format(displayFormat) +
        ' - ' +
        currentValue.end.format(displayFormat);
    }

    return displayValue;
  };

  const toggleDropdown = () => {
    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'dropdownOpen',
      value: !dropdownOpen,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'focusedInput',
      value: START_DATE,
    });

    dispatch({
      type: UPDATE_STATE_VALUE,
      name: 'closeDropdown',
      value: false,
    });
  };

  /* eslint-disable max-len */
  return (
    <button
      className="dateRangeInput__input"
      type="button"
      onClick={toggleDropdown}
    >
      <svg
        className="calendar-icon"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 379.9 370.5"
        style={{ enableBackground: 'new 0 0 379.9 370.5' }}
        xmlSpace="preserve"
      >
        <path
          d="M314.1,39.2V16.9c0-6.6-5.4-12-12-12H286c-6.6,0-12,5.4-12,12v22.3l-169.3,0V16.9c0-6.6-5.4-12-12-12H76.6
              c-6.6,0-12,5.4-12,12v22.3l-58.7,0l0,324l366.9,0v-324L314.1,39.2z M177.8,93.2v70h-64.5v-70H177.8z M200.8,93.2h64.5v70h-64.5V93.2
              z M90.3,93.2v70H28.9l0-70H90.3z M28.9,186.2h61.5v67H28.9L28.9,186.2z M113.3,186.2h64.5v67h-64.5V186.2z M177.8,276.2v64.1h-64.5
              v-64.1H177.8z M200.8,276.2h64.5v64.1h-64.5V276.2z M200.8,253.2v-67h64.5v67H200.8z M288.3,186.2h61.5v67h-61.5V186.2z
              M288.3,163.2v-70h61.5v70H288.3z M28.9,276.2h61.5v64.1H28.9L28.9,276.2z M288.3,340.2v-64.1h61.5v64.1H288.3z"
        />
      </svg>
      {getDisplayValue()}
    </button>
  );
  /* eslint-enable max-len */
};

InputButton.propTypes = {
  ranges: PropTypes.array.isRequired,
  defaultDisplayValue: PropTypes.string.isRequired,
};

export default InputButton;
