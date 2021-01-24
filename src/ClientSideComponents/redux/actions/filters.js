
export const setCategory = (catIndex) =>({
    type: 'SET_CATEGORY',
    payload: catIndex,
})

export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
})
export const setCurrentPageHouses = (page) => ({
    type: 'SET_CURRENT_PAGE_HOUSES',
    payload: page,
})
export const setCurrentPageInvest = (page) => ({
    type: 'SET_CURRENT_PAGE_INVEST',
    payload: page,
})


export const setFilterCost = (costArr) => ({
    type: 'SET_FILTER_COST',
    payload: costArr,
})

export const setFilterSquare = (squareArr) => ({
    type: 'SET_FILTER_SQUARE',
    payload: squareArr,
})

export const setFilterCostHouses = (costArr) => ({
    type: 'SET_FILTER_COST_HOUSES',
    payload: costArr,
})

export const setFilterSquareHouses = (squareArr) => ({
    type: 'SET_FILTER_SQUARE_HOUSES',
    payload: squareArr,
})

export const setFilterCostInvest = (costArr) => ({
    type: 'SET_FILTER_COST_INVEST',
    payload: costArr,
})

export const setFilterSquareInvest = (squareArr) => ({
    type: 'SET_FILTER_SQUARE_INVEST',
    payload: squareArr,
})

