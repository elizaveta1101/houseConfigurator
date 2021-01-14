export const addHouseToCart = (houseObj) => ({
    type: 'ADD_HOUSE_CART',
    payload: houseObj,
})

export const addCompletedHouseToCart = (completedObj) => ({
    type: 'ADD_COMPLETED_HOUSE_CART',
    payload: completedObj,
})

export const addInvestorsHouseToCart = (investorsObj) => ({
    type: 'ADD_INVESTORS_HOUSE_CART',
    payload: investorsObj,
})