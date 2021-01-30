const initialState = {
    compprojects: [],
    comphouses: [],
    investhouses: [],

    projects_total: 1,
    houses_total: 1,
    invest_total: 1,
}

const cart = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_HOUSE_CART':
            return {
                ...state,
                compprojects: action.payload.data.query,
                projects_total: action.payload.data.total,
            }
        case 'ADD_COMPLETED_HOUSE_CART':
            return {
                ...state,
                comphouses: action.payload.data.query,
                houses_total: action.payload.data.total,
            }
        case 'ADD_INVESTORS_HOUSE_CART':
            return {
                ...state,
                investhouses: action.payload.data.query,
                invest_total: action.payload.data.total,
            }
        default:
            return state;
    }
}

export default cart;