
const initialState = {
    compprojects: [],
    comphouses: [],
    investorshouses: [],

    postinfo:[],
    userinfo:[],

    pageid: [],

    heart_id: [],
    house_heart_id: [],
    invest_heart_id: [],

    projects_page_id: 1,
    houses_page_id: 1,
    invests_page_id: 1,

    isFetching: true,

    currentPage: 1,
    perPage: 9,
    totalCount: 0,
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
            totalCount: action.payload,
        }
    }
    if(action.type === 'SET_COMPLETED_HOUSES'){
        return {
            ...state,
            comphouses: action.payload.data.query,
        }
    }
    if(action.type === 'SET_INVESTORS_HOUSES'){
        return {
            ...state,
            investorshouses: action.payload.data.query,
        }
    }
    if(action.type === 'SET_CURRENT_PAGE'){
        return {
            ...state,
            currentPage: action.payload
        }
    }
    if(action.type === 'SET_HEART_ID'){
        return {
            ...state,
            heart_id: action.payload
        }
    }
    if(action.type === 'SET_HOUSE_HEART_ID'){
        return {
            ...state,
            house_heart_id: action.payload
        }
    }
    if(action.type === 'SET_INVEST_HEART_ID'){
        return {
            ...state,
            invest_heart_id: action.payload
        }
    }

    if(action.type === 'SET_PROJECTS_PAGE'){
        return {
            ...state,
            projects_page_id: action.payload
        }
    }
    if(action.type === 'SET_HOUSES_PAGE'){
        return {
            ...state,
            houses_page_id: action.payload
        }
    }
    if(action.type === 'SET_INVESTS_PAGE'){
        return {
            ...state,
            invests_page_id: action.payload
        }
    }

    return state;
}

export default houses;
