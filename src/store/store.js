import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import rootReducer from './redux/root_reducer';

const persistConfig = {
  key: 'root',
  keyPrefix: 'v.1',
  storage: AsyncStorage,
  debug: __DEV__,
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: __DEV__
    ? getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }).concat(logger)
    : getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});
