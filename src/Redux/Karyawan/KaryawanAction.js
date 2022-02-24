import {SET_KARYAWAN, SET_SELECT} from './KaryawanType';
import {
  defaultDoneState,
  defaultInitState,
  defaultFailedState,
} from '../helper';
import server from '../../Apis/server';
export const setKaryawan = payload => {
  return {
    type: SET_KARYAWAN,
    payload,
  };
};

export const getKaryawan = payload => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setKaryawan(defaultInitState));
      server({
        url: '/admin/user/all',
        method: 'GET',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: {...payload, limit: 10},
      })
        .then(({data}) => {
          dispatch(setKaryawan(defaultDoneState(data)));
        })
        .catch(err => {
          dispatch(setKaryawan(defaultFailedState(err.response.data)));
        });
    });
  };
};

export const saveKaryawan = payload => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: '/admin/user/register',
        method: 'POST',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: payload,
      })
        .then(() => {
          resolve('karyawan berhasil ditambahkan');
        })
        .catch(err => {
          reject(err.response.data);
        });
    });
  };
};

export function setSelect(payload) {
  return {
    type: SET_SELECT,
    payload,
  };
}
