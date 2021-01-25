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




