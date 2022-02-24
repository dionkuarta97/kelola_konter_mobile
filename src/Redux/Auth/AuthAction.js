import {SET_LOGIN, SET_MENU_IDX} from './AuthType';
import server from '../../Apis/server';
import {
  defaultDoneState,
  defaultFailedState,
  defaultInitState,
} from '../helper';

export function setMenuIdx(payload) {
  return {
    type: SET_MENU_IDX,
    payload,
  };
}
export function setLogin(payload) {
  return {
    type: SET_LOGIN,
    payload,
  };
}

export function getLogin(payload) {
  return async (dispatch, getState) => {
    dispatch(setLogin(defaultInitState));
    try {
      console.log(payload);
      const {data} = await server({
        url: '/global/login',
        method: 'POST',
        data: payload,
      });
      console.log(data, 'log data');
      dispatch(setLogin(defaultDoneState(data)));
    } catch (err) {
      console.log(err, 'err');
      dispatch(setLogin(defaultFailedState(err.response.data.message)));
    }
  };
}
