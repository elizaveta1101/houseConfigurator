import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import CheckoutButton from '../../../components/Buttons/CheckoutButton'

import CompletedHouseImg from '../../../../../assets/img/CompletedHouse.png'

import '../ProjectCard/HouseCard.css'
import './CompletedCard.css'

import {housePage} from "../../../../data/constants";
import axios from "axios";
import {setHouseHeartsArray} from "../../../../redux/actions/houses";


const CompletedCard = React.memo(function CompletedCard({onClickItem, address, style, bedrooms, cost, floors, id, name, size, square, style_id, onClickAddHouse,}) {

  const [filledHeart, setFilledHeart] = React.useState(false)
  const heart_ids = useSelector(({ houses }) => houses.house_hearts_arr)
  const dispatch = useDispatch()
  const posts = useSelector(({houses}) => houses.postinfo)

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
            {params: {category: 'house'},
              headers: {Authorization: posts}})
        .then(({data}) => {
          dispatch(setHouseHeartsArray(data))
        })
  }, [])

  return (
    <div className="card-wrapper">
      <div className="triangle">
        <svg
          onClick={() => onAddHouse(id)}
          className="heart"
          id={id}
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
        </svg>
        {filledHeart && (
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
        <Link to={`${housePage}${id}`}>
          <img src={CompletedHouseImg} alt="CompletedHouseImg" />
        </Link>
      </div>
      <div className="card-info">
        <div className="type">
          <p>{style}</p>
        </div>
        <div className="house-name">
          <Link to={`${housePage}${id}`}>
            <h1>{name}</h1>
          </Link>
        </div>
        <div className="chars-and-btns">
          <div className="characteristics">
            <div className="left-house-feature">
              <div className="house-feature">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.33333 1H2.33333C1.97971 1 1.64057 1.14048 1.39052 1.39052C1.14048 1.64057 1 1.97971 1 2.33333V4.33333M13 4.33333V2.33333C13 1.97971 12.8595 1.64057 12.6095 1.39052C12.3594 1.14048 12.0203 1 11.6667 1H9.66667M9.66667 13H11.6667C12.0203 13 12.3594 12.8595 12.6095 12.6095C12.8595 12.3594 13 12.0203 13 11.6667V9.66667M1 9.66667V11.6667C1 12.0203 1.14048 12.3594 1.39052 12.6095C1.64057 12.8595 1.97971 13 2.33333 13H4.33333"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>{square} м2</p>
              </div>
              <div className="house-feature">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0939 7.84131H11.7194C11.3742 7.84131 11.0944 8.12112 11.0944 8.46631C11.0944 8.81149 11.3742 9.09131 11.7194 9.09131H12.5855L9.58737 12.0894C9.34327 12.3335 9.34327 12.7292 9.58737 12.9732C9.83143 13.2173 10.2271 13.2174 10.4712 12.9733L13.4694 9.97518V10.8413C13.4694 11.1865 13.7492 11.4663 14.0944 11.4663C14.4396 11.4663 14.7194 11.1865 14.7194 10.8413V8.46631C14.7194 8.46621 14.7194 8.46612 14.7194 8.46603C14.7192 8.1264 14.4432 7.84106 14.0939 7.84131Z"
                    fill="#444444"
                  />
                  <path
                    d="M15.375 0.84375H11.6875C11.3423 0.84375 11.0625 1.12356 11.0625 1.46875V4.53125H8.00003C7.65488 4.53125 7.37503 4.81106 7.37503 5.15625V8.21875H4.31253C3.96734 8.21875 3.68753 8.49856 3.68753 8.84375V11.9062H0.625C0.279813 11.9062 0 12.1861 0 12.5312C0 12.8764 0.279813 13.1562 0.625 13.1562H4.31253C4.47828 13.1562 4.63728 13.0904 4.75447 12.9732C4.87169 12.856 4.93753 12.697 4.93753 12.5312L4.9375 9.46875H8.00003C8.16578 9.46875 8.32478 9.40291 8.44197 9.28569C8.55919 9.1685 8.62503 9.0095 8.62503 8.84375L8.625 5.78125H11.6875C11.8533 5.78125 12.0122 5.71541 12.1294 5.59819C12.2467 5.481 12.3125 5.322 12.3125 5.15625L12.3125 2.09375H15.375C15.7202 2.09375 16 1.81394 16 1.46875C16 1.12356 15.7202 0.84375 15.375 0.84375Z"
                    fill="#444444"
                  />
                </svg>
                <p>этажи: {floors}</p>
              </div>
            </div>
            <div className="right-house-feature">
              <div className="house-feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2H14V6"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 14H2V10"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.9997 2L9.33301 6.66667"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 13.9999L6.66667 9.33325"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>{size} м</p>
              </div>
              <div className="house-feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0003 2.66675H2.00033C1.26395 2.66675 0.666992 3.2637 0.666992 4.00008V12.0001C0.666992 12.7365 1.26395 13.3334 2.00033 13.3334H14.0003C14.7367 13.3334 15.3337 12.7365 15.3337 12.0001V4.00008C15.3337 3.2637 14.7367 2.66675 14.0003 2.66675Z"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.666992 6.66675H15.3337"
                    stroke="#444444"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>спальни: {bedrooms}</p>
              </div>
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-placeholder-box">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3.33325C7 5.66659 4 7.66659 4 7.66659C4 7.66659 1 5.66659 1 3.33325C1 2.5376 1.31607 1.77454 1.87868 1.21193C2.44129 0.649322 3.20435 0.333252 4 0.333252C4.79565 0.333252 5.55871 0.649322 6.12132 1.21193C6.68393 1.77454 7 2.5376 7 3.33325Z"
                  stroke="#ADADAD"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4.33325C4.55228 4.33325 5 3.88554 5 3.33325C5 2.78097 4.55228 2.33325 4 2.33325C3.44772 2.33325 3 2.78097 3 3.33325C3 3.88554 3.44772 4.33325 4 4.33325Z"
                  stroke="#ADADAD"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Местоположение</p>
            </div>
            <h1>{address}</h1>
          </div>
        </div>
        <div className="card-btns">
          <div className="checkout">
            <CheckoutButton
              className="blue-checkout-btn"
              children={'Оформить заказ'}
              active={true}
            />
          </div>
          <div className="completed-price">
            <div className="completed-price__price">
              <p>Цена от</p>
              <h1>{cost} ₽</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CompletedCard