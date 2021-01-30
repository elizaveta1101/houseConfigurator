const initialState = {
    projectPageInfo: [],
}


const housePage = (state = initialState, action) => {
    if(action.type === 'GET_PROJECT_PAGE_INFO'){
        return {
            ...state,
            projectPageInfo: action.payload
        }
    }

    return state;
}

export default housePage;