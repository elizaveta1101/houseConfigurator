import { css } from 'styled-components'

export const flexElement = (
  direction = 'row',
  justify = 'normal',
  align = 'normal',
  wrap: 'nowrap'
) => css`
  display: flex;
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  align-items: ${align};
  justify-content: ${justify};
`

export const absoluteElemntCenter = () => css`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`

export const animation = (
  name = 'none',
  duration = '0.5s',
  delay = '0s',
  fillMode = 'both',
  timing = 'ease',
  iteration = 'initia'
) => css`
  animation-delay: ${delay};
  animation-duration: ${duration};
  animation-fill-mode: ${fillMode};
  animation-iteration-count: ${iteration};
  animation-name: ${name};
  animation-timing-function: ${timing};
`

export const colors = {
  blueAccnet: '#325fff',
  redWarning: '#ff3232',
  textColor: '#2E2E2E',
  formsTextColor: '#444444',
  formsBorder: '#989898',
  inActiveButtons: '#c8c8c8',
  isActiveBackForms: '#ececec',
  selectHover: '#f3f3f3',
}
