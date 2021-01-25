export const setPostInfo = (postinfo) => ({
    type: 'SET_POST_INFO',
    payload: postinfo,
});

export const setUserInfo = (userinfo) => ({
    type: 'SET_USER_INFO',
    payload: userinfo,
});

export const setCompletedProjects = (compprojects) => ({
    type: 'SET_COMPLETED_PROJECTS',
    payload: compprojects,
});

export const setCompletedHouses = (comphouses) => ({
    type: 'SET_COMPLETED_HOUSES',
    payload: comphouses,
});

export const setInvestorsHouses = (investorshouses) => ({
    type: 'SET_INVESTORS_HOUSES',
    payload: investorshouses,
});

export const setHeartsArray = (heartArr) => ({
    type: 'SET_HEARTS_ARRAY',
    payload: heartArr,
});

export const setHouseHeartsArray = (heartArr) => ({
    type: 'SET_HOUSE_HEARTS_ARRAY',
    payload: heartArr,
});

export const setInvestHeartsArray = (heartArr) => ({
    type: 'SET_INVEST_HEARTS_ARRAY',
    payload: heartArr,
});


export const setFilterCost = (costArr) => ({
    type: 'SET_FILTER_COST',
    payload: costArr,
})

export const setFilterSquare = (squareArr) => ({
    type: 'SET_FILTER_SQUARE',
    payload: squareArr,
})

export const setFilterCostHouses = (costArr) => ({
    type: 'SET_FILTER_COST_HOUSES',
    payload: costArr,
})

export const setFilterSquareHouses = (squareArr) => ({
    type: 'SET_FILTER_SQUARE_HOUSES',
    payload: squareArr,
})

export const setFilterCostInvest = (costArr) => ({
    type: 'SET_FILTER_COST_INVEST',
    payload: costArr,
})

export const setFilterSquareInvest = (squareArr) => ({
    type: 'SET_FILTER_SQUARE_INVEST',
    payload: squareArr,
})

