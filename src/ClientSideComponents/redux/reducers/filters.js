const initialState = {
    category: [],

    costArr: '',
    costArrHouses: '',
    costArrInvest: '',

    squareArr: '',
    squareArrHouses: '',
    squareArrInvest: '',

    currentPage: 1,
    currentPageHouses: 1,
    currentPageInvest: 1,
}

const filters = (state = initialState, action) => {
    if(action.type === 'SET_CATEGORY'){
        return {
            ...state,
            category: action.payload,
        }
    }
    if(action.type === 'SET_CURRENT_PAGE'){
        return {
            ...state,
            currentPage: action.payload,
        }
    }
    if(action.type === 'SET_CURRENT_PAGE_HOUSES'){
        return {
            ...state,
            currentPageHouses: action.payload,
        }
    }
    if(action.type === 'SET_CURRENT_PAGE_INVEST'){
        return {
            ...state,
            currentPageInvest: action.payload,
        }
    }

    if(action.type === 'SET_FILTER_COST'){
        return {
            ...state,
            costArr: action.payload,
        }
    }
    if(action.type === 'SET_FILTER_SQUARE'){
        return {
            ...state,
            squareArr: action.payload,
        }
    }
    if(action.type === 'SET_FILTER_COST_HOUSES'){
        return {
            ...state,
            costArrHouses: action.payload,
        }
    }
    if(action.type === 'SET_FILTER_SQUARE_HOUSES'){
        return {
            ...state,
            squareArrHouses: action.payload,
        }
    }
    if(action.type === 'SET_FILTER_COST_INVEST'){
        return {
            ...state,
            costArrInvest: action.payload,
        }
    }
    if(action.type === 'SET_FILTER_SQUARE_INVEST'){
        return {
            ...state,
            squareArrInvest: action.payload,
        }
    }

    return state;
}

export default filters;