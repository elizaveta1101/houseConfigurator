import { css } from 'styled-components'

export const animations = () => css`
  @keyframes fadeInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes fadeInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes fadeIn {
    from {
      filter: opacity(0);
    }
  }
`
