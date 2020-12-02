export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_KEY = 'SET_USER_KEY';
export const SET_CONTEXT = 'SET_CONTEXT';

export const setUserName = (userName) => ({
  type: SET_USER_NAME,
  userName,
});

export const setUserKey = (userKey) => ({
  type: SET_USER_KEY,
  userKey,
});

export const setContext = (context) => ({
  type: SET_CONTEXT,
  context,
});
