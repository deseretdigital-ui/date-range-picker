import DateRangeInput from '../lib/index.js';
import React from 'react';
import ReactDom from 'react-dom';
import {} from './styles.scss';

let date = new Date();
let lastMonth = new Date();
let nextMonth = new Date();

lastMonth.setMonth(date.getMonth() - 1);
lastMonth.setDate(14);

nextMonth.setMonth(date.getMonth() + 1);
nextMonth.setDate(16);

ReactDom.render(
  <DateRangeInput />,
  document.getElementById('dateRangeExample')
);

ReactDom.render(
  <DateRangeInput ranges={[]} />,
  document.getElementById('dateRangeExampleNoRanges')
);

ReactDom.render(
  <DateRangeInput
    minimumDate={lastMonth}
    maximumDate={nextMonth}
    ranges={[]}
    defaultValue={{}}
  />,
  document.getElementById('dateRangeExampleNoRangesBlockedDates')
);
