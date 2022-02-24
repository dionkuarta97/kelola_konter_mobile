import {SET_LIST_PRODUK, SET_PRODUK_KATEGORI} from './ProdukType';

const initialState = {
  listProduk: {
    data: null,
    loading: false,
    error: null,
  },
  kategori: {
    data: null,
    loading: false,
    error: null,
  },
};

const ProdukReducer = (state = initialState, action) => {
  if (action.type === SET_PRODUK_KATEGORI) {
    return {...state, kategori: action.payload};
  } else if (action.type === SET_LIST_PRODUK) {
    return {...state, listProduk: action.payload};
  }
  return state;
};

export default ProdukReducer;
