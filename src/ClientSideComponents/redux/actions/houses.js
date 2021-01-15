
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

export const setPostInfo = (postinfo) => ({
    type: 'SET_POST_INFO',
    payload: postinfo,
});

export const setUserInfo = (userinfo) => ({
    type: 'SET_USER_INFO',
    payload: userinfo,
});

export const setPostCost = (costinfo) => ({
    type: 'SET_POST_COST',
    payload: costinfo,
});

export const addHeartId = (id) => ({
    type: 'SET_HEART_ID',
    payload: id,
});

export const addHouseHeartId = (id) => ({
    type: 'SET_HOUSE_HEART_ID',
    payload: id,
});

export const addInvestHeartId = (id) => ({
    type: 'SET_INVEST_HEART_ID',
    payload: id,
});


export const setProjectsPage = (id) => ({
    type: 'SET_PROJECTS_PAGE',
    payload: id,
});

export const setHousesPage = (id) => ({
    type: 'SET_HOUSES_PAGE',
    payload: id,
});

export const setInvestPage = (id) => ({
    type: 'SET_INVESTS_PAGE',
    payload: id,
});


