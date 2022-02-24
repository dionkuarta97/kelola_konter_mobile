import {SET_KONTER, SET_SAVE_KONTER} from './KonterType';

const initialState = {
  konter: {
    data: null,
    loading: false,
    error: null,
  },
  saveKonter: {
    data: null,
    loading: null,
    error: null,
  },
};

const KonterReducer = (state = initialState, action) => {
  if (action.type === SET_KONTER) {
    return {...state, konter: action.payload};
  } else if (action.type === SET_SAVE_KONTER) {
    return {...state, saveKonter: action.payload};
  }
  return state;
};

export default KonterReducer;
