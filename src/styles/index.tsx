import { createGlobalStyle } from 'styled-components'
import { animations } from './animation'
import { fontFaces } from './fonts'
import { colors } from './mixins'

export default createGlobalStyle`
${animations}
${fontFaces}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  color: ${colors.textColor};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${colors.blueAccnet};
  }
}

.app {
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  color: ${colors.textColor};
  font-family: 'OpenSans', sans-serif;
}
`
