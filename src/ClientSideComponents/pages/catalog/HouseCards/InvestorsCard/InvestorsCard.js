import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import CheckoutButton from '../../../components/Buttons/CheckoutButton'

import InvestorsHouseImg from '../../../../../assets/img/InvestorsCard.png'

import '../ProjectCard/HouseCard.css'
import '../HouseCard/CompletedCard.css'
import './InvestorsCard.css'
import {investsPage} from "../../../../data/constants";
import axios from "axios";
import {setInvestHeartsArray} from "../../../../redux/actions/houses";

const InvestorsCard = React.memo(function InvestorsCard({year_percent, style, conditions, cost, id, name, onClickItem,}) {

  const [filledHeart, setFilledHeart] = React.useState(false)
  const heart_ids = useSelector(({ houses }) => houses.invest_hearts_arr)
  const dispatch = useDispatch()
  const posts = useSelector(({houses}) => houses.postinfo)

  let authorized = false

  if(posts !== '' && posts !== undefined){
    authorized = true
  }

  const onAddHouse = (id) => {
    setFilledHeart(!filledHeart)
    onClickItem(id)

    if (heart_ids.includes(id)) {
      heart_ids.splice(heart_ids.indexOf(id), 1)
    }
  }

  if (heart_ids.includes(id)) {
    if (!filledHeart) {
      setFilledHeart(!filledHeart)
    }
  }

  React.useEffect(() => {
    axios
        .get('http://127.0.0.1:5000/favorites/main_page',
            {params: {category: 'invest'},
              headers: {Authorization: posts}})
        .then(({data}) => {
          dispatch(setInvestHeartsArray(data))
        })
  }, [])


  return (
    <div className="card-wrapper">
      <div className="triangle">
        {authorized && <svg
            onClick={() => onAddHouse(id)}
            className="heart"
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M9 16C8.74374 16 8.49669 15.9072 8.30415 15.7388C7.577 15.1035 6.87593 14.5065 6.2574 13.9799L6.25424 13.9772C4.44081 12.4332 2.87485 11.0998 1.78528 9.7863C0.567307 8.31791 0 6.92567 0 5.40473C0 3.92701 0.507156 2.56372 1.42795 1.56581C2.35973 0.556101 3.63826 0 5.02844 0C6.06747 0 7.01903 0.3282 7.8566 0.975406C8.2793 1.3021 8.66245 1.70192 9 2.16828C9.33769 1.70192 9.7207 1.3021 10.1435 0.975406C10.9811 0.3282 11.9327 0 12.9717 0C14.3617 0 15.6404 0.556101 16.5722 1.56581C17.493 2.56372 18 3.92701 18 5.40473C18 6.92567 17.4328 8.31791 16.2149 9.78616C15.1253 11.0998 13.5595 12.433 11.7463 13.9769C11.1267 14.5043 10.4245 15.1023 9.69571 15.739C9.50331 15.9072 9.25612 16 9 16ZM5.02844 1.05348C3.93626 1.05348 2.93294 1.48897 2.20303 2.27983C1.46228 3.08263 1.05428 4.19236 1.05428 5.40473C1.05428 6.68391 1.53012 7.82794 2.59703 9.11412C3.62823 10.3574 5.16206 11.6633 6.938 13.1755L6.9413 13.1782C7.56216 13.7069 8.26598 14.3062 8.99849 14.9461C9.7354 14.3049 10.4403 13.7047 11.0624 13.1752C12.8382 11.663 14.3719 10.3574 15.4031 9.11412C16.4699 7.82794 16.9457 6.68391 16.9457 5.40473C16.9457 4.19236 16.5377 3.08263 15.797 2.27983C15.0672 1.48897 14.0637 1.05348 12.9717 1.05348C12.1716 1.05348 11.437 1.30758 10.7884 1.80866C10.2104 2.25541 9.80777 2.82016 9.5717 3.21531C9.4503 3.41852 9.23662 3.53981 9 3.53981C8.76338 3.53981 8.5497 3.41852 8.4283 3.21531C8.19237 2.82016 7.78972 2.25541 7.21156 1.80866C6.56296 1.30758 5.82838 1.05348 5.02844 1.05348Z"
              fill="#325FFF"
          />
        </svg>}
        {filledHeart && authorized && (
          <svg
            className={filledHeart ? 'filled-heart' : 'heart'}
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 16C8.74374 16 8.49669 15.9072 8.30415 15.7388C7.577 15.1035 6.87593 14.5065 6.2574 13.9799L6.25424 13.9772C4.44081 12.4332 2.87485 11.0998 1.78528 9.7863C0.567307 8.31791 0 6.92567 0 5.40473C0 3.92701 0.507156 2.56372 1.42795 1.56581C2.35973 0.556101 3.63826 0 5.02844 0C6.06747 0 7.01903 0.3282 7.8566 0.975406C8.2793 1.3021 8.66245 1.70192 9 2.16828C9.33769 1.70192 9.7207 1.3021 10.1435 0.975406C10.9811 0.3282 11.9327 0 12.9717 0C14.3617 0 15.6404 0.556101 16.5722 1.56581C17.493 2.56372 18 3.92701 18 5.40473C18 6.92567 17.4328 8.31791 16.2149 9.78616C15.1253 11.0998 13.5595 12.433 11.7463 13.9769C11.1267 14.5043 10.4245 15.1023 9.69571 15.739C9.50331 15.9072 9.25612 16 9 16ZM5.02844 1.05348C3.93626 1.05348 2.93294 1.48897 2.20303 2.27983C1.46228 3.08263 1.05428 4.19236 1.05428 5.40473C1.05428 6.68391 1.53012 7.82794 2.59703 9.11412C3.62803 10.3571 5.16146 11.6628 6.93695 13.1746L6.938 13.1755L6.9413 13.1782C7.56216 13.7069 8.26598 14.3062 8.99849 14.9461C9.7354 14.3049 10.4403 13.7047 11.0624 13.1752C11.064 13.1738 11.0656 13.1724 11.0672 13.1711C12.841 11.6607 14.3728 10.3562 15.4031 9.11412C16.4699 7.82794 16.9457 6.68391 16.9457 5.40473C16.9457 4.19236 16.5377 3.08263 15.797 2.27983C15.0672 1.48897 14.0637 1.05348 12.9717 1.05348C12.1716 1.05348 11.437 1.30758 10.7884 1.80866C10.2104 2.25541 9.80777 2.82016 9.5717 3.21531C9.4503 3.41852 9.23662 3.53981 9 3.53981C8.76338 3.53981 8.5497 3.41852 8.4283 3.21531C8.19237 2.82016 7.78972 2.25541 7.21156 1.80866C6.56296 1.30758 5.82838 1.05348 5.02844 1.05348Z"
              fill="#325FFF"
            />
            <path
              d="M5.02844 1.05348C3.93626 1.05348 2.93294 1.48897 2.20303 2.27983C1.46228 3.08263 1.05428 4.19236 1.05428 5.40473C1.05428 6.68391 1.53012 7.82794 2.59703 9.11412C3.62803 10.3571 5.16146 11.6628 6.93695 13.1746L6.938 13.1755L6.9413 13.1782C7.56216 13.7069 8.26598 14.3062 8.99849 14.9461C9.7354 14.3049 10.4403 13.7047 11.0624 13.1752L11.0672 13.1711C12.841 11.6607 14.3728 10.3562 15.4031 9.11412C16.4699 7.82794 16.9457 6.68391 16.9457 5.40473C16.9457 4.19236 16.5377 3.08263 15.797 2.27983C15.0672 1.48897 14.0637 1.05348 12.9717 1.05348C12.1716 1.05348 11.437 1.30758 10.7884 1.80866C10.2104 2.25541 9.80777 2.82016 9.5717 3.21531C9.4503 3.41852 9.23662 3.53981 9 3.53981C8.76338 3.53981 8.5497 3.41852 8.4283 3.21531C8.19237 2.82016 7.78972 2.25541 7.21156 1.80866C6.56296 1.30758 5.82838 1.05348 5.02844 1.05348Z"
              fill="#325FFF"
            />
          </svg>
        )}
      </div>
      <div className="triangle2" />
      <div className="card-img">
        <Link to={`${investsPage}${id}`}>
          <img src={InvestorsHouseImg} alt="InvestorsHouseImg" />
        </Link>
      </div>
      <div className="card-info">
        <div className="type">
          <p>{style}</p>
        </div>
        <div className="house-name">
          <Link to={`${investsPage}${id}`}>
            <h1>{name}</h1>
          </Link>
        </div>
        <div className="chars-and-btns">
          <div className="characteristics">
            <div className="right-house-feature">
              <div className="house-feature house-feature__investors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.334 4.66675H2.66732C1.93094 4.66675 1.33398 5.2637 1.33398 6.00008V12.6667C1.33398 13.4031 1.93094 14.0001 2.66732 14.0001H13.334C14.0704 14.0001 14.6673 13.4031 14.6673 12.6667V6.00008C14.6673 5.2637 14.0704 4.66675 13.334 4.66675Z"
                    stroke="#25282B"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.6673 14V3.33333C10.6673 2.97971 10.5268 2.64057 10.2768 2.39052C10.0267 2.14048 9.68761 2 9.33398 2H6.66732C6.3137 2 5.97456 2.14048 5.72451 2.39052C5.47446 2.64057 5.33398 2.97971 5.33398 3.33333V14"
                    stroke="#25282B"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>{conditions}</p>
              </div>
              <div className="house-feature house-feature__investors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6673 3.33325L3.33398 12.6666"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.33268 6.00008C5.25316 6.00008 5.99935 5.25389 5.99935 4.33341C5.99935 3.41294 5.25316 2.66675 4.33268 2.66675C3.41221 2.66675 2.66602 3.41294 2.66602 4.33341C2.66602 5.25389 3.41221 6.00008 4.33268 6.00008Z"
                    stroke="#444444"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.6667 13.3333C12.5871 13.3333 13.3333 12.5871 13.3333 11.6667C13.3333 10.7462 12.5871 10 11.6667 10C10.7462 10 10 10.7462 10 11.6667C10 12.5871 10.7462 13.3333 11.6667 13.3333Z"
                    stroke="#444444"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>{year_percent}% годовых</p>
              </div>
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-placeholder-box card-placeholder-box__investors">
              <p>Минимальное вложение</p>
            </div>
            <div className="completed-price__price completed-price__price__investors">
              <h1>{cost} ₽</h1>
            </div>
          </div>
        </div>
        <div className="card-btns">
          <div className="checkout">
            <CheckoutButton
              className="blue-checkout-btn"
              children={'Инвестировать'}
              active={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default InvestorsCard
