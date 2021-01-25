
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

    initialProjectsCost: 0,
    initialHousesCost: 0,
    initialInvestCost: 0,

    initialProjectsSquare: 0,
    initialHousesSquare: 0,
    initialInvestSquare: 0,
}


const houses = (state = initialState, action) => {
    if(action.type === 'SET_POST_INFO'){
        return {
            ...state,
            postinfo: action.payload.data.token,
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
            initialProjectsCost: action.payload.data.max_cost,
            initialProjectsSquare: action.payload.data.max_square,
        }
    }
    if(action.type === 'SET_COMPLETED_HOUSES'){
        return {
            ...state,
            comphouses: action.payload.data.query,
            totalCountHouses: action.payload.data.total,
            initialHousesCost: action.payload.data.max_cost,
            initialHousesSquare: action.payload.data.max_square,
        }
    }
    if(action.type === 'SET_INVESTORS_HOUSES'){
        return {
            ...state,
            investorshouses: action.payload.data.query,
            totalCountInvest: action.payload.data.total,
            initialInvestCost: action.payload.data.max_cost,
            initialInvestSquare: action.payload.data.max_square,
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

    return state;
}

export default houses;
