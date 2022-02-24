import server from '../../Apis/server';
import {
  defaultDoneState,
  defaultFailedState,
  defaultInitState,
} from '../helper';

import {SET_KONTER, SET_SAVE_KONTER} from './KonterType';

export function setKonter(payload) {
  return {
    type: SET_KONTER,
    payload,
  };
}

export function getKonter(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setKonter(defaultInitState));
      const params = {
        status: payload,
        limit: 100,
      };
      const {data} = await server({
        url: '/admin/konter/all',
        method: 'GET',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params,
      });

      dispatch(setKonter(defaultDoneState(data)));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setSaveKonter(payload) {
  return {
    type: SET_SAVE_KONTER,
    payload,
  };
}

export function postSaveKonter(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, rejected) => {
      server({
        url: '/admin/konter/create',
        method: 'Post',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: {nama: payload},
      })
        .then(({data}) => {
          resolve(data);
        })
        .catch(err => {
          rejected(err);
        })
        .finally(() => {
          dispatch(getKonter('active'));
        });
    });
  };
}
