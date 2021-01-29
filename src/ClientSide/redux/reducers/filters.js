const initialState = {
    category: [],
    sortBy: 'onefloor',
    sortByCost: 5000000,
    sortBySquare: 400,

    indices: [],
    costArr: '',
    squareArr: '',

    sortByCostProjects: 3000000,
    sortBySquareProjects: 0,
}

const filters = (state = initialState, action) => {
    if(action.type === 'SET_SORT_BY'){
        return {
            ...state,
            sortBy: action.payload,
        }
    }
    if(action.type === 'SET_CATEGORY'){
        return {
            ...state,
            category: action.payload,
        }
    }
    if(action.type === 'SET_COST'){
        return {
            ...state,
            sortByCost: action.payload.data.max_cost,
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
    if(action.type === 'SET_SQUARE'){
        return {
            ...state,
            sortBySquare: action.payload.data.max_square,
        }
    }
    if(action.type === 'SET_COST_PROJECTS'){
        return {
            ...state,
            sortBySquareProjects: action.payload.data.max_square,
        }
    }
    if(action.type === 'SET_SQUARE_PROJECTS'){
        return {
            ...state,
            sortBySquareProjects: action.payload.data.max_square,
        }
    }

    return state;
}

export default filters;