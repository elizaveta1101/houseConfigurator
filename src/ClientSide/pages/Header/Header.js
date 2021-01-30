import React from 'react'
import classNames from 'class-names'

import { Link, useLocation } from 'react-router-dom'

import {
  catalogHouses,
  catalogInvests,
  catalogProjects,
  privateCabPage,
  redactorPage,
  savedHousesPage,
  savedInvestsPage,
  savedProjectsPage
} from "../../data/constants";
import {useDispatch} from "react-redux";
import {deleteToken, setActiveModal, setHousesDefault} from "../../redux/actions/houses";

import './Header.css'


function Header() {

  const dispatch = useDispatch()
  const [visibleHeaderPopup, setVisibleHeaderPopup] = React.useState(false)
  const [visibleCatalogPopup, setVisibleCatalogPopup] = React.useState(false)
  const [visibleInfoPopup, setVisibleInfoPopup] = React.useState(false)
  const [visibleCabPopup, setVisibleCabPopup] = React.useState(false)
  const [visibleSmallCatalogPopup, setVisibleSmallCatalogPopup] = React.useState(false)
  const [visibleInfoSmallPopup, setVisibleInfoSmallPopup] = React.useState(false)

  const activeHeaderMain_3 = useLocation().pathname !== catalogInvests
  const activeHeaderMain_2 = useLocation().pathname !== catalogHouses
  const activeHeaderMain_1 = useLocation().pathname !== catalogProjects

  const activeFavorites_1 = useLocation().pathname !== savedProjectsPage
  const activeFavorites_2 = useLocation().pathname !== savedHousesPage
  const activeFavorites_3 = useLocation().pathname !== savedInvestsPage

  const activeHeaderRedactor = useLocation().pathname !== redactorPage
  const activeHeaderInfo = useLocation().pathname !== '/'
  const activeHeaderCab = useLocation().pathname !== privateCabPage

  const catalogPopupRef = React.useRef()
  const catalogPopupBtn = React.useRef()
  const infoPopupRef = React.useRef()
  const infoPopupBtn = React.useRef()
  const cabPopupRef = React.useRef()
  const cabPopupBtn = React.useRef()
  let authorized = false

  if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== "undefined"){
    authorized = true
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    dispatch(deleteToken())
    dispatch(setHousesDefault())
  }

  const bothForInfo = () => {
    if (visibleSmallCatalogPopup) {
      setVisibleSmallCatalogPopup(!visibleSmallCatalogPopup)
    }
    setVisibleInfoSmallPopup(!visibleInfoSmallPopup)
  }

  const bothForCatalog = () => {
    if (visibleInfoSmallPopup) {
      setVisibleInfoSmallPopup(!visibleInfoSmallPopup)
    }
    setVisibleSmallCatalogPopup(!visibleSmallCatalogPopup)
  }

  const handleOutsideClickCatalog = (e) => {
    if (!e.path.includes(catalogPopupRef.current) && !e.path.includes(catalogPopupBtn.current))
      setVisibleCatalogPopup(false)
  }
  const handleOutsideClickInfo = (e) => {
    if (!e.path.includes(infoPopupRef.current) && !e.path.includes(infoPopupBtn.current))
      setVisibleInfoPopup(false)
  }
  const handleOutsideClickCab = (e) => {
    if (!e.path.includes(cabPopupRef.current) && !e.path.includes(cabPopupBtn.current))
      setVisibleCabPopup(false)
  }

  React.useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener('click', handleOutsideClickCatalog)
      document.body.addEventListener('click', handleOutsideClickInfo)
      document.body.addEventListener('click', handleOutsideClickCab)
    }, 500)
  }, [])

  return (
      <div>
        <div className="header-bg">
          <div className="header-wrapper">
            <div className="header-logo-wrapper">
              <svg
                className="header-logo"
                width="60"
                height="60"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M48.8891 10.8341L48.8714 10.8234L48.8308 10.7963C48.791 10.7698 48.7333 10.7319 48.6595 10.684C48.5118 10.5884 48.2991 10.4533 48.0337 10.2917C47.5039 9.96912 46.7599 9.53852 45.9029 9.10689C44.2347 8.26666 41.9687 7.33333 40 7.33333C38.0313 7.33333 35.7653 8.26666 34.0971 9.10689C33.2401 9.53852 32.4961 9.96912 31.9663 10.2917C31.7009 10.4533 31.4882 10.5884 31.3405 10.684C31.2667 10.7319 31.209 10.7698 31.1692 10.7963L31.1286 10.8234L31.1109 10.8341L30.9974 10.9027L30.5596 11.1677C30.1784 11.3984 29.6247 11.7339 28.9343 12.1529C27.5534 12.991 25.6254 14.1634 23.4369 15.5009C19.0611 18.175 13.6387 21.5118 9.46495 24.1552C8.26031 24.9181 7.32122 26.1319 6.68704 27.366C6.05434 28.5973 5.66667 29.9627 5.66667 31.1111L5.66667 36.3889L5.66667 68.0556C5.66667 69.856 5.99741 71.438 7.3668 72.7389C8.73258 74.0364 10.603 74.3333 12.2222 74.3333H67.7778C69.5673 74.3333 71.1349 74.1623 72.6332 72.7389C74.1573 71.291 74.3333 69.4406 74.3333 68.0556V36.3889V31.1111C74.3333 29.9769 73.945 28.6116 73.3136 27.3788C72.6806 26.1428 71.7418 24.9195 70.535 24.1552C66.3613 21.5118 60.9389 18.175 56.5631 15.5009C54.3746 14.1634 52.4466 12.991 51.0657 12.1529C50.3753 11.7339 49.8216 11.3984 49.4404 11.1677L49.0026 10.9027L48.8891 10.8341ZM49.4974 4.19794L49.4974 4.19798L49.5332 4.21947L49.6743 4.30426C49.7985 4.37896 49.9821 4.48946 50.2195 4.6325C50.6941 4.91858 51.3835 5.33483 52.2421 5.8552C53.9594 6.89598 56.3533 8.35311 59.0592 10.0183C64.4743 13.3507 71.128 17.5094 76.112 20.8321C78.1782 22.2096 79 24.5368 79 26.6667V33.3333V70C79 70.2571 78.9215 70.6712 78.7363 71.2205C78.5565 71.7537 78.2972 72.3528 77.9884 72.958C77.3614 74.1865 76.5842 75.3349 75.9596 75.9596C75.3164 76.6027 74.2502 77.3804 73.0906 77.9958C71.9073 78.6238 70.781 79 70 79H10C9.70032 79 9.25584 78.9123 8.69156 78.7171C8.14106 78.5268 7.53447 78.2547 6.93031 77.9366C5.70352 77.2908 4.59318 76.5123 4.04044 75.9596C3.47448 75.3936 2.69534 74.34 2.05808 73.1619C1.40709 71.9584 1 70.7992 1 70V33.3333V26.6667C1 24.5008 1.82004 22.2107 3.88803 20.8321C8.87202 17.5094 15.5257 13.3507 20.9408 10.0183C23.6467 8.35311 26.0406 6.89598 27.7579 5.8552C28.6165 5.33483 29.3059 4.91858 29.7805 4.6325C30.0179 4.48946 30.2015 4.37896 30.3257 4.30426L30.4668 4.21947L30.5026 4.19798L30.5026 4.19797L30.5058 4.19619L30.5514 4.17077C30.5925 4.14801 30.6546 4.11394 30.7357 4.07016C30.898 3.98258 31.1364 3.85632 31.4361 3.70428C32.0362 3.39979 32.878 2.99393 33.8433 2.58874C35.8109 1.76291 38.1541 1 40 1C41.8459 1 44.1891 1.76291 46.1567 2.58874C47.122 2.99393 47.9638 3.39979 48.5639 3.70428C48.8636 3.85632 49.102 3.98258 49.2643 4.07016C49.3454 4.11394 49.4075 4.14801 49.4486 4.17076L49.4942 4.19619L49.4974 4.19794Z"
                  fill="#444444"
                  stroke="#444444"
                  strokeWidth="2"
                />
                <path
                  d="M24.2929 54.0402L24.2929 54.0402L24.2929 54.0402L24.2929 54.0402L24.2946 54.0419C25.1521 54.8994 26.5045 56.2518 28.9612 57.3685C31.4084 58.4809 34.8883 59.3332 40 59.3332C45.1117 59.3332 48.5917 58.4809 51.0389 57.3685C53.4957 56.2518 54.848 54.8995 55.7055 54.042L55.7071 54.0404C56.1307 53.6168 56.8485 53.5253 57.6105 53.9825C58.35 54.4262 59 55.3501 59 56.6665C59 57.9821 58.4431 58.9517 57.4271 59.725C56.3674 60.5315 54.8074 61.1171 52.882 61.5212C49.0331 62.3289 44.1456 62.3332 40 62.3332H39.9998C35.8542 62.3332 30.9668 62.3289 27.1179 61.5212C25.1926 61.1171 23.6326 60.5315 22.5728 59.725C21.5569 58.9517 21 57.9821 21 56.6665C21 55.35 21.65 54.426 22.3895 53.9823C23.1515 53.5251 23.8693 53.6166 24.2929 54.0402Z"
                  fill="#444444"
                  stroke="#444444"
                  strokeWidth="2"
                />
                <path
                  d="M22.333 36.6665L22.333 36.6665C22.333 37.2026 22.3303 37.6352 22.3081 37.9823C22.2186 37.469 21.9845 36.8445 21.3238 36.3702C20.6421 35.8807 19.6587 35.6666 18.3331 35.6666C17.0075 35.6666 16.0241 35.8807 15.3424 36.3702C14.7236 36.8145 14.479 37.3906 14.377 37.8836C14.3347 37.4594 14.3332 37.0126 14.3332 36.6666C14.3332 36.007 14.495 35.596 14.6908 35.325C14.891 35.0477 15.1857 34.8359 15.5796 34.6784C16.4129 34.345 17.4659 34.3332 18.3331 34.3332C19.2004 34.3332 20.2534 34.345 21.0867 34.6784C21.4806 34.8359 21.7752 35.0477 21.9755 35.3249C22.1712 35.5959 22.333 36.007 22.333 36.6665Z"
                  fill="#325FFF"
                  stroke="#325FFF"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="nav-menu-wrapper">
              <svg
                onClick={() => setVisibleHeaderPopup(!visibleHeaderPopup)}
                className="header-popup"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21"
                  stroke="#444444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="#444444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 18L21 18"
                  stroke="#444444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="sub-menu">
                <ul>
                  <Link to="/">
                    <li>Главная</li>
                  </Link>
                  <li
                    ref={catalogPopupBtn}
                    onClick={() => setVisibleCatalogPopup(!visibleCatalogPopup)}
                    className={classNames({
                      'active-header-main':
                        !activeHeaderMain_1 || !activeHeaderMain_2 || !activeHeaderMain_3,
                    })}
                  >
                    Каталог
                    <svg
                      className={classNames('down-arrow', { 'down-arrow__active': visibleCatalogPopup })}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#444444"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </li>
                  {visibleCatalogPopup && (
                    <div
                      ref={catalogPopupRef}
                      onClick={() => setVisibleCatalogPopup(!visibleCatalogPopup)}
                      className="catalog-popup"
                    >
                      <div className="catalog-popup__points">
                        <Link to={catalogProjects}>
                          <p className={classNames({ 'active-catalog-popup': !activeHeaderMain_1 })}>
                            Готовые проекты
                          </p>
                        </Link>
                        <Link to={catalogHouses}>
                          <p className={classNames({ 'active-catalog-popup': !activeHeaderMain_2 })}>
                            Готовые дома
                          </p>
                        </Link>
                        <Link to={catalogInvests}>
                          <p className={classNames({ 'active-catalog-popup': !activeHeaderMain_3 })}>
                            Инвесторам
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}
                  <li className={classNames({ 'active-header-main': !activeHeaderRedactor })}>
                    <Link to={redactorPage}>Конструктор проекта</Link>
                  </li>
                  <li
                    ref={infoPopupBtn}
                    onClick={() => setVisibleInfoPopup(!visibleInfoPopup)}
                    className={classNames({ 'active-header-main': !activeHeaderInfo })}
                  >
                    Информация
                    <svg
                      className={classNames('down-arrow', { 'down-arrow__active': visibleInfoPopup })}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#444444"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </li>
                  {visibleInfoPopup && (
                    <div
                      ref={infoPopupRef}
                      onClick={() => setVisibleInfoPopup(!visibleInfoPopup)}
                      className="info-popup"
                    >
                      <div className="info-popup__points">
                        <Link to="/">
                          <p className={classNames({ 'active-catalog-popup': !activeHeaderMain_1 })}>
                            О компании
                          </p>
                        </Link>
                        <Link to="/">
                          <p className={classNames({ 'active-catalog-popup': !activeHeaderMain_2 })}>
                            Контакты
                          </p>
                        </Link>
                        <Link to="/">
                          <p className={classNames({ 'active-catalog-popup': !activeHeaderMain_3 })}>
                            Сотрудничество
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}
                </ul>
              </div>

              {visibleHeaderPopup && (
                <div className="popup-sub-menu">
                  <ul>
                    <li>
                      <Link to="/">Главная</Link>
                    </li>
                    <li
                      onClick={bothForCatalog}
                      className={classNames({
                        'popup-sub-menu__active':
                          !activeHeaderMain_1 || !activeHeaderMain_2 || !activeHeaderMain_3,
                      })}
                    >
                      Каталог
                      <svg
                        className={classNames('down-popup-arrow', {
                          'down-popup-arrow__active': visibleSmallCatalogPopup,
                        })}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="#444444"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </li>
                    {visibleSmallCatalogPopup && (
                      <div
                        onClick={() => setVisibleCatalogPopup(!visibleCatalogPopup)}
                        className="catalog-small-popup"
                      >
                        <div className="catalog-popup__points">
                          <Link
                            onClick={() => setVisibleSmallCatalogPopup(!visibleSmallCatalogPopup)}
                            to={catalogProjects}
                          >
                            <p
                              onClick={() => setVisibleHeaderPopup(!visibleHeaderPopup)}
                              className={classNames({ 'active-catalog-popup': !activeHeaderMain_1 })}
                            >
                              Готовые проекты
                            </p>
                          </Link>
                          <Link
                            onClick={() => setVisibleSmallCatalogPopup(!visibleSmallCatalogPopup)}
                            to={catalogHouses}
                          >
                            <p
                              onClick={() => setVisibleHeaderPopup(!visibleHeaderPopup)}
                              className={classNames({ 'active-catalog-popup': !activeHeaderMain_2 })}
                            >
                              Готовые дома
                            </p>
                          </Link>
                          <Link
                            onClick={() => setVisibleSmallCatalogPopup(!visibleSmallCatalogPopup)}
                            to={catalogInvests}
                          >
                            <p
                              onClick={() => setVisibleHeaderPopup(!visibleHeaderPopup)}
                              className={classNames({ 'active-catalog-popup': !activeHeaderMain_3 })}
                            >
                              Инвесторам
                            </p>
                          </Link>
                        </div>
                      </div>
                    )}
                    <li className={classNames({ 'popup-sub-menu__active': !activeHeaderRedactor })}>
                      <Link to={redactorPage}>Конструктор проекта</Link>
                    </li>
                    <li
                      onClick={bothForInfo}
                      className={classNames({ 'popup-sub-menu__active': !activeHeaderInfo })}
                    >
                      Информация
                      <svg
                        className={classNames('info-popup-arrow', {
                          'info-popup-arrow__active': visibleInfoSmallPopup,
                        })}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="#444444"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </li>
                    {visibleInfoSmallPopup && (
                      <div className="info-popup-small-menu">
                        <p>О компании</p>
                        <p>Контакты</p>
                        <p>Сотрудничество</p>
                      </div>
                    )}
                  </ul>
                </div>
              )}

              <div className="header-icons">
                <svg
                  className="header-icon header-phone"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.9994 16.9199V19.9199C22.0006 20.1984 21.9435 20.4741 21.832 20.7293C21.7204 20.9845 21.5567 21.2135 21.3515 21.4018C21.1463 21.5901 20.904 21.7334 20.6402 21.8226C20.3764 21.9119 20.0968 21.945 19.8194 21.9199C16.7423 21.5856 13.7864 20.5341 11.1894 18.8499C8.77327 17.3146 6.72478 15.2661 5.18945 12.8499C3.49942 10.2411 2.44769 7.27094 2.11944 4.17994C2.09446 3.90341 2.12732 3.6247 2.21595 3.36157C2.30457 3.09843 2.44702 2.85663 2.63421 2.65157C2.82141 2.4465 3.04925 2.28265 3.30324 2.17047C3.55722 2.05828 3.83179 2.00021 4.10945 1.99994H7.10945C7.59475 1.99517 8.06524 2.16702 8.43321 2.48348C8.80118 2.79993 9.04152 3.23939 9.10944 3.71994C9.23607 4.68001 9.47089 5.62267 9.80945 6.52994C9.94399 6.88787 9.97311 7.27686 9.89335 7.65082C9.8136 8.02479 9.62831 8.36805 9.35944 8.63994L8.08945 9.90994C9.513 12.4135 11.5859 14.4864 14.0894 15.9099L15.3594 14.6399C15.6313 14.3711 15.9746 14.1858 16.3486 14.106C16.7225 14.0263 17.1115 14.0554 17.4694 14.1899C18.3767 14.5285 19.3194 14.7633 20.2794 14.8899C20.7652 14.9585 21.2088 15.2031 21.526 15.5774C21.8431 15.9517 22.0116 16.4295 21.9994 16.9199Z"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {authorized ? <Link to={savedProjectsPage}>
                  <svg
                      className={classNames('header-icon', {
                        'header-icon-active': !activeFavorites_1 || !activeFavorites_2 || !activeFavorites_3,
                      })}
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M11 20.3256C10.6868 20.3256 10.3848 20.2129 10.1495 20.0082C9.26077 19.2363 8.40392 18.5109 7.64793 17.871L7.64407 17.8677C5.42766 15.9915 3.5137 14.3713 2.18201 12.7753C0.693375 10.991 0 9.29928 0 7.45116C0 5.65556 0.619858 3.999 1.74527 2.78643C2.88411 1.55952 4.44676 0.883789 6.14587 0.883789C7.4158 0.883789 8.57881 1.28259 9.60251 2.06902C10.1191 2.46599 10.5874 2.95182 11 3.51851C11.4127 2.95182 11.8809 2.46599 12.3977 2.06902C13.4214 1.28259 14.5844 0.883789 15.8543 0.883789C17.5532 0.883789 19.1161 1.55952 20.2549 2.78643C21.3803 3.999 22 5.65556 22 7.45116C22 9.29928 21.3068 10.991 19.8182 12.7751C18.4865 14.3713 16.5727 15.9914 14.3566 17.8673C13.5993 18.5082 12.7411 19.2348 11.8503 20.0085C11.6152 20.2129 11.313 20.3256 11 20.3256ZM6.14587 2.16389C4.81099 2.16389 3.5847 2.69306 2.6926 3.65405C1.78723 4.62955 1.28856 5.978 1.28856 7.45116C1.28856 9.00552 1.87015 10.3956 3.17415 11.9585C4.43451 13.4692 6.30919 15.056 8.47978 16.8935L8.48381 16.8968C9.24265 17.5392 10.1029 18.2675 10.9982 19.0451C11.8988 18.266 12.7604 17.5365 13.5207 16.8932C15.6911 15.0557 17.5657 13.4692 18.826 11.9585C20.1299 10.3956 20.7114 9.00552 20.7114 7.45116C20.7114 5.978 20.2128 4.62955 19.3074 3.65405C18.4155 2.69306 17.189 2.16389 15.8543 2.16389C14.8764 2.16389 13.9786 2.47266 13.1859 3.08153C12.4794 3.62438 11.9873 4.31061 11.6987 4.79077C11.5504 5.03768 11.2892 5.18507 11 5.18507C10.7108 5.18507 10.4496 5.03768 10.3013 4.79077C10.0129 4.31061 9.52077 3.62438 8.81413 3.08153C8.02139 2.47266 7.12358 2.16389 6.14587 2.16389Z"
                        fill="#444444"
                    />
                  </svg>
                </Link> :
                  <svg
                      onClick={() => dispatch(setActiveModal(true))}
                      className={classNames('header-icon', {
                        'header-icon-active': !activeFavorites_1 || !activeFavorites_2 || !activeFavorites_3,
                      })}
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M11 20.3256C10.6868 20.3256 10.3848 20.2129 10.1495 20.0082C9.26077 19.2363 8.40392 18.5109 7.64793 17.871L7.64407 17.8677C5.42766 15.9915 3.5137 14.3713 2.18201 12.7753C0.693375 10.991 0 9.29928 0 7.45116C0 5.65556 0.619858 3.999 1.74527 2.78643C2.88411 1.55952 4.44676 0.883789 6.14587 0.883789C7.4158 0.883789 8.57881 1.28259 9.60251 2.06902C10.1191 2.46599 10.5874 2.95182 11 3.51851C11.4127 2.95182 11.8809 2.46599 12.3977 2.06902C13.4214 1.28259 14.5844 0.883789 15.8543 0.883789C17.5532 0.883789 19.1161 1.55952 20.2549 2.78643C21.3803 3.999 22 5.65556 22 7.45116C22 9.29928 21.3068 10.991 19.8182 12.7751C18.4865 14.3713 16.5727 15.9914 14.3566 17.8673C13.5993 18.5082 12.7411 19.2348 11.8503 20.0085C11.6152 20.2129 11.313 20.3256 11 20.3256ZM6.14587 2.16389C4.81099 2.16389 3.5847 2.69306 2.6926 3.65405C1.78723 4.62955 1.28856 5.978 1.28856 7.45116C1.28856 9.00552 1.87015 10.3956 3.17415 11.9585C4.43451 13.4692 6.30919 15.056 8.47978 16.8935L8.48381 16.8968C9.24265 17.5392 10.1029 18.2675 10.9982 19.0451C11.8988 18.266 12.7604 17.5365 13.5207 16.8932C15.6911 15.0557 17.5657 13.4692 18.826 11.9585C20.1299 10.3956 20.7114 9.00552 20.7114 7.45116C20.7114 5.978 20.2128 4.62955 19.3074 3.65405C18.4155 2.69306 17.189 2.16389 15.8543 2.16389C14.8764 2.16389 13.9786 2.47266 13.1859 3.08153C12.4794 3.62438 11.9873 4.31061 11.6987 4.79077C11.5504 5.03768 11.2892 5.18507 11 5.18507C10.7108 5.18507 10.4496 5.03768 10.3013 4.79077C10.0129 4.31061 9.52077 3.62438 8.81413 3.08153C8.02139 2.47266 7.12358 2.16389 6.14587 2.16389Z"
                        fill="#444444"
                    />
                  </svg>
                }

                {authorized ? <svg
                    ref={cabPopupBtn}
                    onClick={() => setVisibleCabPopup(!visibleCabPopup)}
                    className={classNames('header-icon', {'header-icon-active': !activeHeaderCab})}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#444444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#444444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg> : <svg
                    ref={cabPopupBtn}
                    onClick={() => dispatch(setActiveModal(true))}
                    className={classNames('header-icon', {'header-icon-active': !activeHeaderCab})}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#444444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#444444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
                }
                {visibleCabPopup && (
                  <div
                    ref={cabPopupRef}
                    onClick={() => setVisibleCabPopup(!visibleCabPopup)}
                    className="cab-popup"
                  >
                    <div className="cab-popup__points">
                      <Link to={privateCabPage}>
                        <p className={classNames({ 'active-catalog-popup': !activeHeaderCab })}>
                          Личный кабинет
                        </p>
                      </Link>
                      <Link to="/">
                        <p>Мои проекты</p>
                      </Link>
                      <Link to="/">
                        <p onClick={removeToken}>Выход</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
          {visibleHeaderPopup && (
              <div
                  onClick={() => setVisibleHeaderPopup(!visibleHeaderPopup)}
                  className="black-screen-catalog"
              />
          )}
        </div>
      </div>
  )
}

export default Header
