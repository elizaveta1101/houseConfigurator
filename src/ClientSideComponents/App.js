import React from 'react'
import axios from 'axios'

import { Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCompletedHouses, setCompletedProjects, setHeartsArray, setInvestorsHouses, setPostInfo } from './redux/actions/houses'
import { setCost, setCostProjects, setSquare, setSquareProjects } from './redux/actions/filters'

import Header from './pages/Header/Header'
import MainPage from './pages/main-page/MainPage'
import Footer from './pages/Footer/Footer'
import HouseProjectPage from './pages/housepage/ProjectPage/HouseProjectPage'
import CompletedHousePage from './pages/housepage/HousePage/CompletedHousePage'
import InvestorsHousePage from './pages/housepage/InvestPage/InvestorsHousePage'
import RedactorPage from './pages/redactor/RedactorPage'
import PrivateCab from './pages/private-office/PrivateCab'
import CatalogInvestors from './pages/catalog/CatalogPages/InvestCatalog/CatalogInvestors'
import CatalogCompletedHouses from './pages/catalog/CatalogPages/HouseCatalog/CatalogCompletedHouses'
import CatalogCompletedProjects from './pages/catalog/CatalogPages/ProjectsCatalog/CatalogCompletedProjects'
import FavoriteProjects from './pages/private-office/favorite-pages/FavoriteProjects'
import FavoriteHouses from './pages/private-office/favorite-pages/FavoriteHouses'
import FavoriteInvestors from './pages/private-office/favorite-pages/FavoriteInvestors'
import Constructor from './pages/redactor/Constructor'
import RedactorHeader from './pages/redactor/RedactorHeader'

import './styles.scss'
import {
    catalogProjects,
    catalogHouses,
    catalogInvests,
    projectPageId,
    housePageId,
    investsPageId,
    redactorPage,
    privateCabPage,
    savedProjectsPage,
    savedHousesPage,
    savedInvestsPage,
    constructorPage
} from "./data/constants";



function App() {
  const shouldShowHeader = useLocation().pathname !== '/'
  const shouldShowRedactorHeader = useLocation().pathname !== constructorPage
  const shouldShowFooter = useLocation().pathname !== '/'
  const shouldShowRedactorFooter = useLocation().pathname !== constructorPage
  const posts = useSelector(({ houses }) => houses.postinfo)
  const dispatch = useDispatch()

      React.useEffect(() => {
        async function FetchPosts() {
            axios
                .post(
                    'http://127.0.0.1:5000/auth',
                    { login: 'privet@yandex.ru', password: 'privet' },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then(({ data }) => {
                    dispatch(setPostInfo(data))
                })

            axios
                .get('http://127.0.0.1:5000/project',
                    {params: {pagination: true, page: 1},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(setCompletedProjects(data))
                })

            await axios
                .get('http://127.0.0.1:5000/house',
                {params: {pagination: true, page: 1},
                    headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(setCompletedHouses(data))
                })

            await axios
                .get('http://127.0.0.1:5000/invest',
                    {params: {pagination: true, page: 1},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(setInvestorsHouses(data))
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
        }
        FetchPosts()
      }, [])

    let is_authorized = false

    if(posts !== ''){
        is_authorized = true
    }


  return (
    <>
      <div className="global-wrapper">
        {shouldShowHeader && shouldShowRedactorHeader && <Header />}
        {!shouldShowRedactorHeader && <RedactorHeader />}


        <div className="main">
        <div className="main-wrapper">
          <Route exact path="/" component={MainPage} />
        </div>

        <div className="wrapper">
          <Route exact path={projectPageId} component={HouseProjectPage} />
          <Route exact path={housePageId} component={CompletedHousePage} />
          <Route exact path={investsPageId} component={InvestorsHousePage} />
          <Route exact path={redactorPage} component={RedactorPage} />
            {is_authorized &&<Route exact path={privateCabPage} component={PrivateCab} />}

            {is_authorized &&<Route exact path={catalogProjects} component={CatalogCompletedProjects} />}
            {is_authorized &&<Route exact path={catalogHouses} component={CatalogCompletedHouses} />}
            {is_authorized &&<Route exact path={catalogInvests} component={CatalogInvestors} />}

            {is_authorized && <Route exact path={savedProjectsPage} component={FavoriteProjects}/>}
            {is_authorized && <Route exact path={savedHousesPage} component={FavoriteHouses} />}
            {is_authorized && <Route exact path={savedInvestsPage} component={FavoriteInvestors} />}
        </div>

        <Route exact path={constructorPage} component={Constructor} />

        </div>

        {shouldShowFooter && shouldShowRedactorFooter && <Footer />}
      </div>
    </>
  )
}

export default App
