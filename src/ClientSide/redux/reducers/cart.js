const initialState = {
    compprojects: [],
    comphouses: {},
    investhouses: {},
}

const cart = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_HOUSE_CART':
            return {
                ...state,
                compprojects: {
                    ...state.compprojects,
                    [action.payload.id]: !state.compprojects[action.payload.id]
                        ? [action.payload]
                        : [...state.compprojects[action.payload.id], action.payload]
                }
            }
        case 'ADD_COMPLETED_HOUSE_CART':
            return {
                ...state,
                comphouses: {
                    ...state.comphouses,
                    [action.payload.id]: !state.comphouses[action.payload.id]
                        ? [action.payload]
                        : [...state.comphouses[action.payload.id], action.payload]
                }
            }
        case 'ADD_INVESTORS_HOUSE_CART':
            return {
                ...state,
                investhouses: {
                    ...state.investhouses,
                    [action.payload.id]: !state.investhouses[action.payload.id]
                        ? [action.payload]
                        : [...state.investhouses[action.payload.id], action.payload]
                }
            }
        default:
            return state;
    }
}

export default cart;