export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_KEY = 'SET_USER_KEY';
export const SET_CONTEXT = 'SET_CONTEXT';
export const ADD_MESSAGE = 'ADD_MESSAGE';

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

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});
