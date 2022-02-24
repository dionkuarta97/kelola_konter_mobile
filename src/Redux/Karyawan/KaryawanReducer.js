import {SET_KARYAWAN, SET_SELECT} from './KaryawanType';

const initialState = {
  karyawan: {
    data: null,
    error: null,
    loading: false,
  },
  select: 0,
};

function KaryawanReducer(state = initialState, action) {
  if (action.type === SET_KARYAWAN) {
    return {...state, karyawan: action.payload};
  } else if (action.type === SET_SELECT) {
    return {...state, select: action.payload};
  }
  return state;
}

export default KaryawanReducer;
