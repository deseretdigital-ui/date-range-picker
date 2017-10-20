import DateRangeInput from '../lib/index.js';
import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import {} from 'moment-range';
import {} from './styles.scss';

let date = new Date();
let lastMonth = new Date();
let nextMonth = new Date();

lastMonth.setMonth(date.getMonth() - 1);
lastMonth.setDate(14);

nextMonth.setMonth(date.getMonth() + 1);
nextMonth.setDate(16);

ReactDom.render(
  <DateRangeInput
    defaultValue={
      moment.range(
        moment().startOf('day').subtract(6, 'days'),
        moment().startOf('day')
      )
    }
  />,
  document.getElementById('dateRangeExample')
);

ReactDom.render(
  <DateRangeInput
    ranges={[]}
    defaultValue={
      moment.range(
        moment().startOf('day').subtract(6, 'days'),
        moment().startOf('day')
      )
    }
  />,
  document.getElementById('dateRangeExampleNoRanges')
);

ReactDom.render(
  <DateRangeInput
    minimumDate={lastMonth}
    maximumDate={nextMonth}
    ranges={[]}
    defaultValue={null}
    singleCalendarBreakpoint={1260}
  />,
  document.getElementById('dateRangeExampleNoRangesBlockedDates')
);
