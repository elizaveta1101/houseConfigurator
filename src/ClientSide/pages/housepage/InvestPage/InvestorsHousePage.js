import React from 'react';
import axios from "axios";

import HousePageSlider from "../PageSlider/HousePageSlider";
import CheckoutButton from "../../components/Buttons/CheckoutButton";

import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {getProjectPageInfo} from "../../../redux/actions/housePage";
import {setInvestHeartsArray} from "../../../redux/actions/houses";

import '../HouseProjectPage.css';
import {HostURL} from "../../../data/constants";



function InvestorsHousePage() {
    const pageLink = useLocation().pathname
    const pageId = Number(pageLink.match(/\d+/))
    const dispatch = useDispatch()
    const [filledHeart, setFilledHeart] = React.useState(false)
    const heart_ids = useSelector(({ houses }) => houses.invest_hearts_arr)
    const pageInfo = useSelector(({ housePage }) => housePage.projectPageInfo)

    const onAddHouse = (id) => {
        axios.post(`${HostURL}favorites`, {
            id: id,
            category: 'invest'
        }, {headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')}})

        setFilledHeart(!filledHeart)
        if (heart_ids.includes(id)) {
            heart_ids.splice(heart_ids.indexOf(id), 1)
        }
    }

    if (heart_ids.includes(pageId)) {
        if (!filledHeart) {
            setFilledHeart(!filledHeart)
        }
    }

    let authorized = false

    if(localStorage.getItem('token') !== null){
        authorized = true
    }

    React.useEffect(() => {
        axios
            .get(`${HostURL}invest`,
                {params: {id: pageId},
                    headers: {Authorization: localStorage.getItem('token')}})
            .then(({data}) => {
                dispatch(getProjectPageInfo(data))
            })

        axios
            .get(`${HostURL}favorites/main_page`,
                {params: {category: 'invest'},
                    headers: {Authorization: localStorage.getItem('token')}})
            .then(({data}) => {
                dispatch(setInvestHeartsArray(data))
            })
    }, [])


    return (
        <div className="house-project-page-wrapper">
            <div className="investors-pre-btn-ellipse">
                <svg width="525" height="478" viewBox="0 0 525 478" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M103.39 0.745342C69.8379 26.7127 42.9701 60.3157 25.0216 98.7595C7.07306 137.203 -1.43737 179.377 0.198064 221.773C1.8335 264.169 13.5675 305.561 34.4243 342.508C55.281 379.455 84.6577 410.888 120.111 434.194C155.564 457.499 196.069 472.003 238.258 476.499C280.446 480.995 323.099 475.354 362.667 460.044C402.236 444.734 437.577 420.198 465.752 388.477C493.927 356.755 514.122 318.765 524.655 277.666L503.17 272.16C493.513 309.838 475 344.666 449.169 373.748C423.339 402.829 390.939 425.323 354.664 439.359C318.388 453.395 279.286 458.567 240.608 454.444C201.931 450.323 164.797 437.026 132.294 415.66C99.7916 394.294 72.8599 365.477 53.739 331.605C34.6181 297.733 23.8606 259.785 22.3613 220.918C20.862 182.05 28.6641 143.387 45.1188 108.142C61.5736 72.8981 86.2053 42.0918 116.965 18.2856L103.39 0.745342Z" fill="#325FFF"/>
                </svg>
                <svg className="pre-btn-ellipse-abs" width="466" height="198" viewBox="0 0 466 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M465.667 196.935C456.424 142.467 428.405 92.9529 386.47 56.9853C344.535 21.0177 291.331 0.866163 236.091 0.0272665C180.851 -0.81163 127.06 17.7151 84.0522 52.3927C41.0445 87.0703 11.5342 135.71 0.641992 189.873L6.67974 191.087C17.2883 138.335 46.0301 90.9616 87.9179 57.187C129.806 23.4124 182.196 5.36814 235.998 6.18519C289.799 7.00224 341.618 26.6291 382.46 61.66C423.303 96.6909 450.593 144.915 459.595 197.965L465.667 196.935Z" fill="#325FFF"/>
                </svg>
            </div>
            <div className="house-project-page__main-block">
                <div className="house-project-page__slider">
                    <HousePageSlider />
                    {authorized && <svg onClick={() => onAddHouse(pageId)} className="heart1" width="27" height="24"
                          viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 16C8.74374 16 8.49669 15.9072 8.30415 15.7388C7.577 15.1035 6.87593 14.5065 6.2574 13.9799L6.25424 13.9772C4.44081 12.4332 2.87485 11.0998 1.78528 9.7863C0.567307 8.31791 0 6.92567 0 5.40473C0 3.92701 0.507156 2.56372 1.42795 1.56581C2.35973 0.556101 3.63826 0 5.02844 0C6.06747 0 7.01903 0.3282 7.8566 0.975406C8.2793 1.3021 8.66245 1.70192 9 2.16828C9.33769 1.70192 9.7207 1.3021 10.1435 0.975406C10.9811 0.3282 11.9327 0 12.9717 0C14.3617 0 15.6404 0.556101 16.5722 1.56581C17.493 2.56372 18 3.92701 18 5.40473C18 6.92567 17.4328 8.31791 16.2149 9.78616C15.1253 11.0998 13.5595 12.433 11.7463 13.9769C11.1267 14.5043 10.4245 15.1023 9.69571 15.739C9.50331 15.9072 9.25612 16 9 16ZM5.02844 1.05348C3.93626 1.05348 2.93294 1.48897 2.20303 2.27983C1.46228 3.08263 1.05428 4.19236 1.05428 5.40473C1.05428 6.68391 1.53012 7.82794 2.59703 9.11412C3.62823 10.3574 5.16206 11.6633 6.938 13.1755L6.9413 13.1782C7.56216 13.7069 8.26598 14.3062 8.99849 14.9461C9.7354 14.3049 10.4403 13.7047 11.0624 13.1752C12.8382 11.663 14.3719 10.3574 15.4031 9.11412C16.4699 7.82794 16.9457 6.68391 16.9457 5.40473C16.9457 4.19236 16.5377 3.08263 15.797 2.27983C15.0672 1.48897 14.0637 1.05348 12.9717 1.05348C12.1716 1.05348 11.437 1.30758 10.7884 1.80866C10.2104 2.25541 9.80777 2.82016 9.5717 3.21531C9.4503 3.41852 9.23662 3.53981 9 3.53981C8.76338 3.53981 8.5497 3.41852 8.4283 3.21531C8.19237 2.82016 7.78972 2.25541 7.21156 1.80866C6.56296 1.30758 5.82838 1.05348 5.02844 1.05348Z"
                            fill="#325FFF"/>
                    </svg>}
                    {filledHeart && authorized && (
                        <svg
                            className={filledHeart ? 'project-page__filled-heart' : 'heart1'}
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
                        </svg>)}
                </div>
                <div className="house-project-page__right-block">
                    <div className="investors-house-project-page__info">
                        <div className="invest-page__info-header" />
                        <div className="invest-page__info-header__small" />
                        <h1>{pageInfo && pageInfo.name}</h1>
                        <div className="house-project-page__info-params">
                            <div className="info-params">
                                <p>Минимальное вложение</p>
                                <span>{pageInfo && pageInfo.cost} ₽</span>
                            </div>
                            <div className="info-params">
                                <p>Тип вложений</p>
                                <span>{pageInfo && pageInfo.conditions}</span>
                            </div>
                        </div>
                    </div>
                    <div className="house-project-page__pre-btn-text">
                        <div className="invest-page-id">
                            <p>id проекта:<span> {pageInfo && pageInfo.id}</span></p>
                        </div>
                        <div className="investors-page-button">
                            <CheckoutButton className="house-page__open-project-btn" children={'Хочу стать инвестором'} active={true}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="completed-page__info">
                <div className="project-desription__invest">
                    <div className="investors-descriptions">
                        <div className="project-desription">
                            <h1>Описание проекта</h1>
                                <p>{pageInfo && pageInfo.long_info}</p>
                        </div>
                    </div>
                </div>
                <div className="condition_of_terms">
                    <h1>Условия участия</h1>
                    <p>{pageInfo && pageInfo.conditions}</p>
                </div>
            </div>
        </div>
    );
}

export default InvestorsHousePage;
