import React from 'react';

import CatalogCompletedHouses from "./CatalogPages/HouseCatalog/CatalogCompletedHouses";
import CatalogInvestors from "./CatalogPages/InvestCatalog/CatalogInvestors";
import CatalogCompletedProjects from "./CatalogPages/ProjectsCatalog/CatalogCompletedProjects";


function CatalogPage() {
    return (
        <div className="catalog">
            <div className="cards-wrapper">
                <CatalogCompletedHouses />
                <CatalogInvestors />
                <CatalogCompletedProjects />
            </div>
        </div>
    );
}

export default CatalogPage;