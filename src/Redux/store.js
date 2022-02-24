import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AuthReducer from './Auth/AuthReducer';
import KaryawanReducer from './Karyawan/KaryawanReducer';
import KonterReducer from './Konter/KonterReducer';
import ProdukReducer from './Produk/ProdukReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['menuIdx'],
};

const reducer = combineReducers({
  AuthReducer: persistReducer(persistConfig, AuthReducer),
  KonterReducer: KonterReducer,
  KaryawanReducer: KaryawanReducer,
  ProdukReducer: ProdukReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
