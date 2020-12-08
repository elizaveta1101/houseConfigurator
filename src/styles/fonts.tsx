import { css } from 'styled-components'

const OpenSans_Reg_woff2 = require('../assets/fonts/OpenSans-Regular.woff2')
const OpenSans_Reg_woff = require('../assets/fonts/OpenSans-Regular.woff')
const OpenSans_SemiBold_woff2 = require('../assets/fonts/OpenSans-SemiBold.woff2')
const OpenSans_SemiBold_woff = require('../assets/fonts/OpenSans-SemiBold.woff')

export const fontFaces = () => css`
  @font-face {
    font-family: 'OpenSans';
    font-weight: 400;
    src: local('OpenSans-Regular'), local('OpenSans-Regular'),
      url(${OpenSans_Reg_woff2}) format('woff2'), url(${OpenSans_Reg_woff}) format('woff2');
  }

  @font-face {
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: 500;
    src: local('OpenSans-Semibold'), local('OpenSans-Semibold'),
      url(${OpenSans_SemiBold_woff2}) format('woff2'), url(${OpenSans_SemiBold_woff}) format('woff');
  }
`
