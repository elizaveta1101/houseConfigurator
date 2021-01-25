
export const setCategory = (catIndex) =>({
    type: 'SET_CATEGORY',
    payload: catIndex,
})

export const setCategoryHouses = (catIndex) =>({
    type: 'SET_CATEGORY_HOUSES',
    payload: catIndex,
})

export const setCategoryInvest = (catIndex) =>({
    type: 'SET_CATEGORY_INVEST',
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


