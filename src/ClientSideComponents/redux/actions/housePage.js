export const getProjectPageId = (id) => ({
    type: 'GET_PROJECT_ID',
    payload: id,
})

export const getProjectPageInfo = (state, id) => ({
    type: 'GET_PROJECT_PAGE_INFO',
    payload: state.houses.compprojects[id-1],
})