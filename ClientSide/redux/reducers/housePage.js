const initialState = {
    pageId: null,
    projectPageInfo: [],
}


const housePage = (state = initialState, action) => {
    if(action.type === 'GET_PROJECT_ID'){
        return {
            ...state,
            pageId: action.payload,
        }
    }
    if(action.type === 'GET_PROJECT_PAGE_INFO'){
        return {
            ...state,
            projectPageInfo: action.payload
        }
    }

    return state;
}

export default housePage;