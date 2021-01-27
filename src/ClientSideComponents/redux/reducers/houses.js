
const initialState = {
    compprojects: [],
    comphouses: [],
    investorshouses: [],

    postinfo: '',
    userinfo:[],

    hearts_arr: [],
    house_hearts_arr: [],
    invest_hearts_arr: [],

    totalCountProjects: 0,
    totalCountHouses: 0,
    totalCountInvest: 0,

    costArr: '',
    squareArr: '',
    costArrHouses: '',
    squareArrHouses: '',
    costArrInvest: '',
    squareArrInvest: '',

    initialProjectsCost: 0,
    initialHousesCost: 0,
    initialInvestCost: 0,

    initialProjectsSquare: 0,
    initialHousesSquare: 0,
    initialInvestSquare: 0,

    modalBool: false,
}


const houses = (state = initialState, action) => {
    if(action.type === 'SET_POST_INFO'){
        return {
            ...state,
            postinfo: action.payload.data.token,
        }
    }
    if(action.type === 'DELETE_TOKEN'){
        return {
            ...state,
            postinfo: action.payload,
        }
    }
    if(action.type === 'SET_USER_INFO'){
        return {
            ...state,
            userinfo: action.payload,
        }
    }
    if(action.type === 'SET_COMPLETED_PROJECTS'){
        return {
            ...state,
            compprojects: action.payload.data.query,
            totalCountProjects: action.payload.data.total,
            costArr: action.payload.data.max_cost,
            squareArr: action.payload.data.max_square,
        }
    }
    if(action.type === 'SET_COMPLETED_HOUSES'){
        return {
            ...state,
            comphouses: action.payload.data.query,
            totalCountHouses: action.payload.data.total,
            costArrHouses: action.payload.data.max_cost,
            squareArrHouses: action.payload.data.max_square,
        }
    }
    if(action.type === 'SET_INVESTORS_HOUSES'){
        return {
            ...state,
            investorshouses: action.payload.data.query,
            totalCountInvest: action.payload.data.total,
            costArrInvest: action.payload.data.max_cost,
            squareArrInvest: action.payload.data.max_square,
        }
    }
    if(action.type === 'SET_HEARTS_ARRAY'){
        return {
            ...state,
            hearts_arr: action.payload.data,
        }
    }
    if(action.type === 'SET_HOUSE_HEARTS_ARRAY'){
        return {
            ...state,
            house_hearts_arr: action.payload.data,
        }
    }
    if(action.type === 'SET_INVEST_HEARTS_ARRAY'){
        return {
            ...state,
            invest_hearts_arr: action.payload.data,
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
    if(action.type === 'SET_ACTIVE_MODAL'){
        return {
            ...state,
            modalBool: action.payload,
        }
    }


    return state;
}

export default houses;
