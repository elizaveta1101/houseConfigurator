import React from 'react'
import cx from 'classnames'

import './styles.scss'

interface IContainer {
  children: React.ReactNode
  modifier?: string
}

const ContentContainer: React.FC<IContainer> = ({ modifier, children }) => (
  <div
    className={cx('content-container', {
      [modifier as string]: modifier,
    })}
  >
    {children}
  </div>
)

export default ContentContainer
