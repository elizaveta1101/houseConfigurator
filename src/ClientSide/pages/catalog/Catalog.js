import React from 'react';

import CatalogCompletedHouses from "./HousePages/CatalogCompletedHouses";
import CatalogInvestors from "./HousePages/CatalogInvestors";
import CatalogCompletedProjects from "./HousePages/CatalogCompletedProjects";
import CatalogHeader from "./CatalogHeader";


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