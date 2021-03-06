/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-09 10:19:05
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-10 21:17:59
 */

/**
 * --------------------------------------------
 * @Description: Base template colors
 * --------------------------------------------
 */
const baseTemplate = {
  palette: {
    primary: {
      light: '#4466f2',
      main: '#4466f2',
      dark: '#4466f2',
    },
    secondary: {
      light: '#DC3545',
      main: '#DC3545',
      dark: '#DC3545',
    },
  },
};

const formCacheLevel = {
  none: 'NONE',
  updateOnFormGroupChange: 'FORMGROUP',
  updateOnIndividual: 'INDIVIDUAL',
};

const screenSizeTypes = {
  largeDevice: {
    width: 1200,
    key: 'DESKTOP',
  },
  mediumDevice: {
    width: 992,
    key: 'TAB',
  },
  smallDevice: {
    width: 768,
    key: 'MOBILE',
  },
};

export { baseTemplate, formCacheLevel, screenSizeTypes };
