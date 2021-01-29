const initialState = {
    pageId: null,
    projectPageInfo: [],
    projectPageId: [],
    pageNum: null,
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
    if(action.type === 'SET_PROJECT_ID'){
        return {
            ...state,
            projectPageId: action.payload
        }
    }
    if(action.type === 'CLEAR_ARRAY'){
        return {
            projectPageId: []
        }
    }


    return state;
}

export default housePage;