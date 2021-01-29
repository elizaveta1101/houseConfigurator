export const getProjectPageId = (id) => ({
    type: 'GET_PROJECT_ID',
    payload: id,
})

export const getProjectPageInfo = (state, id) => ({
    type: 'GET_PROJECT_PAGE_INFO',
    payload: state.houses.compprojects[id],
})

export const setProjectPageId =  (id) => ({
    type: 'SET_PROJECT_ID',
    payload: id
})

export const clearArray = () => ({
    type: 'CLEAR_ARRAY',
})