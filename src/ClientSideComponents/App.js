import React from 'react'
import axios from 'axios'

import { Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPostInfo } from './redux/actions/houses'
import { setCost, setCostProjects, setSquare, setSquareProjects } from './redux/actions/filters'

import Header from './pages/Header'
import MainPage from './pages/main-page/MainPage'
import Footer from './pages/Footer'
import HouseProjectPage from './pages/housepage/HouseProjectPage'
import CompletedHousePage from './pages/housepage/CompletedHousePage'
import InvestorsHousePage from './pages/housepage/InvestorsHousePage'
import RedactorPage from './pages/redactor/RedactorPage'
import PrivateCab from './pages/private-office/PrivateCab'
import CatalogInvestors from './pages/catalog/HousePages/CatalogInvestors'
import CatalogCompletedHouses from './pages/catalog/HousePages/CatalogCompletedHouses'
import CatalogCompletedProjects from './pages/catalog/HousePages/CatalogCompletedProjects'
import FavoriteProjects from './pages/private-office/favorite-pages/FavoriteProjects'
import FavoriteHouses from './pages/private-office/favorite-pages/FavoriteHouses'
import FavoriteInvestors from './pages/private-office/favorite-pages/FavoriteInvestors'
import Constructor from './pages/redactor/Constructor'
import RedactorHeader from './pages/redactor/RedactorHeader'

import './styles.scss'

function App() {
  const shouldShowHeader = useLocation().pathname !== '/'
  const shouldShowRedactorHeader = useLocation().pathname !== '/constructor'
  const shouldShowFooter = useLocation().pathname !== '/'
  const shouldShowRedactorFooter = useLocation().pathname !== '/constructor'
  const posts = useSelector(({ houses }) => houses.postinfo)
  const dispatch = useDispatch()

  React.useEffect(() => {
    async function FetchPosts() {
      await axios
        .post(
          'http://127.0.0.1:5000/auth',
          { login: 'admin', password: 'admin' },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(({ data }) => {
          dispatch(setPostInfo(data))
        })
      await axios
        .get('http://127.0.0.1:5000/project', {
          params: { pagination: true, page: 1 },
          headers: { Authorization: posts },
        })
        .then(({ data }) => {
          dispatch(setCostProjects(data))
        })
      await axios
        .get('http://127.0.0.1:5000/project', {
          params: { pagination: true, page: 1 },
          headers: { Authorization: posts },
        })
        .then(({ data }) => {
          dispatch(setSquareProjects(data))
        })

      await axios
        .get('http://127.0.0.1:5000/house', {
          params: { pagination: true, page: 1 },
          headers: { Authorization: posts },
        })
        .then(({ data }) => {
          dispatch(setCost(data))
        })
      await axios
        .get('http://127.0.0.1:5000/house', {
          params: { pagination: true, page: 1 },
          headers: { Authorization: posts },
        })
        .then(({ data }) => {
          dispatch(setSquare(data))
        })

      await axios
        .get('http://127.0.0.1:5000/invest', {
          params: { pagination: true, page: 1 },
          headers: { Authorization: posts },
        })
        .then(({ data }) => {
          dispatch(setCost(data))
        })
      await axios
        .get('http://127.0.0.1:5000/invest', {
          params: { pagination: true, page: 1 },
          headers: { Authorization: posts },
        })
        .then(({ data }) => {
          dispatch(setSquare(data))
        })
    }
    FetchPosts()
  }, [dispatch])

  return (
    <>
      <div className="global-wrapper">
        {shouldShowHeader && shouldShowRedactorHeader && <Header />}
        {!shouldShowRedactorHeader && <RedactorHeader />}

        <div className="main-wrapper">
          <Route exact path="/" component={MainPage} />
        </div>

        <div className="wrapper">
          <Route exact path="/house_page/:id" component={HouseProjectPage} />
          <Route exact path="/completed_house_page" component={CompletedHousePage} />
          <Route exact path="/investors_house_page" component={InvestorsHousePage} />
          <Route exact path="/redactor_page" component={RedactorPage} />
          <Route exact path="/private_cab" component={PrivateCab} />

          <Route exact path="/catalog" component={CatalogCompletedProjects} />
          <Route exact path="/catalog_comp_houses" component={CatalogCompletedHouses} />
          <Route exact path="/catalog_investors_houses" component={CatalogInvestors} />

          <Route exact path="/saved_projects" component={FavoriteProjects} />
          <Route exact path="/saved_houses" component={FavoriteHouses} />
          <Route exact path="/saved_investors" component={FavoriteInvestors} />
        </div>

        <Route exact path="/constructor" component={Constructor} />

        <main role="main" />

        {shouldShowFooter && shouldShowRedactorFooter && <Footer />}
      </div>
    </>
  )
}

export default App
