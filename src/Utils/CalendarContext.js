import React from 'react';

export default React.createContext({
  // State values
  dropdownOpen: false,
  calendarOpen: false,
  numCalendars: 2,
  focusedInput: 'startDate',
  currentValue: null,
  startDate: null,
  endDate: null,

  // Util functions
  closeDropdownOnTimeout: () => {},
  closeDropdown: () => {},
  isCalendarOpen: () => {},
});
