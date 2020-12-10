import React from 'react'

import Menu from '../../menu/menu'
import ContentContainer from '../../content-container/content-container'

import './styles.scss'

const HomePage: React.FC = () => {
  return (
    <ContentContainer modifier={'home-page'}>
      <Menu modifier={'menu_home-page'} isOpen={false} />
      <h3>Перейдите в нужный вам раздел</h3>
      <p>Вся информация по интересующему вас разделу будет показываться здесь</p>
    </ContentContainer>
  )
}

export default HomePage
