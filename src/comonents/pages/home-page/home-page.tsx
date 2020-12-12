import React from 'react'

import Menu from '../../menu/menu'
import ContentContainer from '../../content-container/content-container'

import './styles.scss'

const HomePage: React.FC = () => {
  return (
    <ContentContainer modifier={'home-page'}>
      <h2 className="home-page__menu-title">Перейти в раздел</h2>

      <Menu modifier={'menu_home-page'} />

      <h3 className="home-page__title">Перейдите в нужный вам раздел</h3>
      <p className="home-page__text">
        Вся информация по интересующему вас разделу <br /> будет показываться здесь
      </p>
    </ContentContainer>
  )
}

export default HomePage
