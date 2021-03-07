/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-07 10:55:42
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-07 11:07:19
 */

/**
 * @description date object to string
 * @param {Object|String} dateObject Date object
 * @param {String} format date format
 */
const dateObjectToString = (date, format = 'yyyy-mm-dd') => {
  const dateObject = new Date(date);
  switch (format) {
    case 'yyyy-mm-dd':
      return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
    case 'h:i a':
      // eslint-disable-next-line no-case-declarations
      let hours = dateObject.getHours();
      // eslint-disable-next-line no-case-declarations
      const minutes = dateObject.getMinutes();
      // eslint-disable-next-line no-case-declarations
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12;
      return `${hours
        .toString()
        .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    default:
      return date;
  }
};

/**
 * @description change date,month,year
 * @param {Object} dateObject Date object
 */
const changeDate = (dateObject) => ({
  setSeconds(seconds) {
    dateObject.setSeconds(dateObject.getSeconds() + seconds);
    return this;
  },
  setDays(dayCount) {
    dateObject.setDate(dateObject.getDate() + dayCount);
    return this;
  },
  setMonth(monthCount) {
    dateObject.setMonth(dateObject.getMonth() + monthCount);
    return this;
  },
  setYear(yearCount) {
    dateObject.setYear(dateObject.getFullYear() + yearCount);
    return this;
  },
  getDate(format = 'none') {
    return dateObjectToString(dateObject, format);
  },
});

export { changeDate, dateObjectToString };
