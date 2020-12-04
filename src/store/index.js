import {
  SET_USER_NAME,
  SET_USER_KEY,
  SET_CONTEXT,
  ADD_MESSAGE,
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
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      state = {
        ...state,
        userInfo: {
          ...(state.userInfo),
          name: action.userName,
        },
      };
      break;
    case SET_USER_KEY:
      state = {
        ...state,
        userInfo: {
          ...(state.userInfo),
          name: action.userKey,
        },
      };
      break;
    case SET_CONTEXT:
      state = {
        ...state,
        context: action.context
      };
      break;
    case ADD_MESSAGE:
      state = {
        ...state,
        messages: [
          ...(state.messages),
          action.message,
        ],
      };
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
