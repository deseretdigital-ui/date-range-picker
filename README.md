# Date Range Input

This is a wrapper around https://github.com/airbnb/react-dates v13.0.4

This is the barebones version of the library. Currently, it's setup so you'll need to use ES6 imports to bring in the library and then compile it with WebPack.

## matchMedia

This library uses window.matchMedia to control whether to show the one or two calendars. Make sure you have a polyfill installed if you are supporting older browsers. This library does not provide the polyfill for you.

# Props

* onDateSelected - Function to call when date range is selected.
* ranges - Predefined ranges for the user to select. Defaults to [today, yesterday, last 7 days, last 30 days, this month, last month].
* defaultValue - A moment range object with the default range you want selected. Defaults to `this.props.ranges[2]` (i.e. last 7 days).
* alwaysShowCalendar - Controls whether the calendar always shows or only for custom ranges. Defaults to true.
* minimumDate - The minimum date you want the user to be able to select.
* maximumDate - The maximum date you want the user to be able to select.
* defaultDisplayValue - The value that is displayed when no dates have been selected yet. Defaults to "Select a date range"
* selectSingleDay - Deprecated to always allowing picking a single date
* wrapperClass - Allows you to pass in a string to add additional classes to the wrapper
* daySize - This controls the size of the calendar days

# Styles

A basic stylesheet is included for you in lib/styles.css or scss/index.scss. This is optional. If you wish customize it and use different styles, copy the scss to your own projects directory and change as needed.

# Simple Example

```jsx
ReactDOM.render(
  <div>
    <DateRangeInput />
  </div>,
  document.getElementById('testRange')
);
```
