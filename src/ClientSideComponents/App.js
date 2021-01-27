import React from 'react'

import { Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

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
import Authorisation from "./pages/components/Authorisation/Authorisation";
import {setActiveModal} from "./redux/actions/houses";


function App() {
    const shouldShowHeader = useLocation().pathname !== '/'
    const shouldShowRedactorHeader = useLocation().pathname !== constructorPage
    const shouldShowFooter = useLocation().pathname !== '/'
    const shouldShowRedactorFooter = useLocation().pathname !== constructorPage
    const posts = useSelector(({ houses }) => houses.postinfo)
    const modal = useSelector(({ houses }) => houses.modalBool)
    let is_authorized = false
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setActiveModal(false))
    }

    if(posts !== '' && posts !== undefined){
        is_authorized = true
    }


    return (
        <>
            <div className="global-wrapper">
                {modal && !is_authorized && <div><Authorisation closeModal={closeModal}/></div>}
                {modal && !is_authorized && <div onClick={() => dispatch(setActiveModal(false))} className="black-bg" />}

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
                        {is_authorized && <Route exact path={privateCabPage} component={PrivateCab}/>}

                        <Route exact path={catalogProjects} component={CatalogCompletedProjects} />
                        <Route exact path={catalogHouses} component={CatalogCompletedHouses} />
                        <Route exact path={catalogInvests} component={CatalogInvestors} />

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
