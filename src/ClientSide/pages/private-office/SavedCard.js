import React from 'react'
import SavedImg from '../../../assets/img/SavedImg.png'

import './SavedCard.css'
import '../housepage/HouseProjectPage.css'
import CheckoutButton from '../components/CheckoutButton'

function SavedCard() {
  return (
    <div className="saved-card">
      <div className="triangle-saved"></div>
      <div className="saved-card-img">
        <img src={SavedImg} alt="SavedImg" />
      </div>
      <div className="saved-card-info">
        <span>Стоимость</span>
        <p>4 490 000 ₽</p>
        <h1>Супер крутой дом первый</h1>
        <div className="saved-card-info-btn-1">
          <CheckoutButton
            className="saved-projects-card-1"
            children={'Оформить заказ'}
            active={true}
          />
        </div>
        <div className="saved-card-info-btn-2">
          <CheckoutButton
            className="saved-projects-card-2"
            children={'Открыть в редакторе'}
            active={true}
          />
        </div>
      </div>
    </div>
  )
}

export default SavedCard
