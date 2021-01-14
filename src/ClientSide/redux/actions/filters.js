export const setSortBy = (name) => ({
    type: 'SET_SORT_BY',
    payload: name,
});

export const setCategory = (catIndex) =>({
    type: 'SET_CATEGORY',
    payload: catIndex,
})

export const setCost = (cost) => ({
    type: 'SET_COST',
    payload: cost,
})

export const setSquare = (square) => ({
    type: 'SET_SQUARE',
    payload: square,
})

export const setCostProjects = (square) => ({
    type: 'SET_SQUARE',
    payload: square,
})

export const setSquareProjects = (square) => ({
    type: 'SET_SQUARE',
    payload: square,
})

export const setFilterCost = (costArr) => ({
    type: 'SET_FILTER_COST',
    payload: costArr,
})

export const setFilterSquare = (squareArr) => ({
    type: 'SET_FILTER_SQUARE',
    payload: squareArr,
})

