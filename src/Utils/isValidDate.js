export default currentValue => {
  let isValid = false;

  if (currentValue) {
    try {
      currentValue.start.format('DD MMM YYYY');
      currentValue.end.format('DD MMM YYYY');
      isValid = true;
    } catch (error) {
      // Do nothing
      throw new Error('Invalid date');
    }
  }

  return isValid;
};
