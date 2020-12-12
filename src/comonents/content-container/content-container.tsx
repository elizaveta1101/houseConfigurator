import React from 'react'
import cx from 'classnames'

import './styles.scss'

interface IContentContainer {
  modifier?: string
  children: React.ReactNode
}

const ContentContainer: React.FC<IContentContainer> = ({
  modifier,
  children,
}: IContentContainer) => (
  <div
    className={cx('content-container', {
      [modifier as string]: modifier,
    })}
  >
    {children}
  </div>
)

export default ContentContainer
