import {SET_LOGIN, SET_MENU_IDX} from './AuthType';

const initialState = {
  login: {
    loading: false,
    error: null,
    data: null,
  },

  menuIdx: 2,
};

function AuthReducer(state = initialState, action) {
  if (action.type === SET_LOGIN) {
    return {...state, login: action.payload};
  } else if (action.type === SET_MENU_IDX) {
    return {...state, menuIdx: action.payload};
  }
  return state;
}

export default AuthReducer;
