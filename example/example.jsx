import DateRangeInput from '../lib/index.js';
import React from 'react';
import ReactDom from 'react-dom';
import {} from './styles.scss';

ReactDom.render(
  <DateRangeInput />,
  document.getElementById('dateRangeExample')
);

ReactDom.render(
  <DateRangeInput ranges={[]} />,
  document.getElementById('dateRangeExampleNoRanges')
);
