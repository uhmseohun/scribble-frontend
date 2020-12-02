import {
  SET_USER_NAME,
  SET_USER_KEY,
  SET_CONTEXT,
} from './actions';

const initialState = {
  context: {
    users: [],
    drawer: null,
    turnEndAt: null,
  },
  userInfo: {
    name: null,
    key: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      state.userInfo.name = action.userName;
      break;
    case SET_USER_KEY:
      state.userInfo.key = action.userKey
      break;
    case SET_CONTEXT:
      state.context = action.context;
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
