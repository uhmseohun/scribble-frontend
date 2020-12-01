import { REFRESH_CONTEXT } from './actions';

const initialState = {
  context: {
    users: [],
    drawer: null,
    turnEndAt: null,
  },
  userInfo: {
    name: null,
    key: null,
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_CONTEXT:
      return {
        ...state,
        context: action.context
      }
    default:
      return state;
  }
};

export default reducer;
