import { DateRange } from 'moment-range';

export default (props, propName, componentName) => {
  const propValue = props[propName];

  if (propValue !== null) {
    const message =
      'Invalid prop `' +
      propName +
      '` supplied to' +
      ' `' +
      componentName +
      '`. Must be of type `DateRange`.' +
      ' Validation failed.';

    // Don't return error if the following is true
    if (
      propValue instanceof DateRange ||
      propValue.constructor.name === 'DateRange'
    ) {
      return;
    }

    return new Error(message);
  }
};
