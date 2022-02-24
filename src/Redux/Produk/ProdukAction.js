import {SET_LIST_PRODUK, SET_PRODUK_KATEGORI} from './ProdukType';
import {
  defaultDoneState,
  defaultInitState,
  defaultFailedState,
} from '../helper';
import server from '../../Apis/server';

export const setKategori = payload => {
  return {
    type: SET_PRODUK_KATEGORI,
    payload,
  };
};

export const getKategori = (params, key) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setKategori(defaultInitState));
      server({
        url: `/admin/category/${key}/all`,
        method: 'GET',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: params,
      })
        .then(({data}) => {
          dispatch(setKategori(defaultDoneState(data)));
        })
        .catch(err => {
          dispatch(setKategori(defaultFailedState(err.response.data)));
        });
    });
  };
};

export const createKategory = (data, key) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: `/admin/category/${key}/create`,
        method: 'POST',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data,
      })
        .then(() => {
          resolve({message: 'data berhasil di tambahkan'});
        })
        .catch(err => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(
            getKategori(
              {
                status: 'active',
                limit: 100,
              },
              key,
            ),
          );
        });
    });
  };
};

export const setListProduk = payload => {
  return {
    type: SET_LIST_PRODUK,
    payload,
  };
};

export const getListProduk = (key, params) => {
  return (dispatch, getState) => {
    dispatch(setListProduk(defaultInitState));
    return new Promise((resolve, reject) => {
      server({
        url: `/admin/produk/${key}/all`,
        method: 'GET',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        params: params,
      })
        .then(({data}) => {
          dispatch(setListProduk(defaultDoneState(data)));
        })
        .catch(err => {
          dispatch(setListProduk(defaultFailedState(err.response.data)));
        });
    });
  };
};

export const updateCategory = (key, id, body) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      server({
        url: `/admin/category/${key}/update/${id}`,
        method: 'PUT',
        headers: {
          access_token: getState().AuthReducer.login.data.access_token,
        },
        data: body,
      })
        .then(() => {
          resolve({message: 'data berhasil di ubah'});
        })
        .catch(err => {
          reject(err.response.data);
        })
        .finally(() => {
          dispatch(
            getKategori(
              {
                status: 'active',
                limit: 100,
              },
              key,
            ),
          );
        });
    });
  };
};
