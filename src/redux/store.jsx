import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactReducer from './contacts/reduser';
import authReducers from '../redux/auth/auth-reducer';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];
// настройки для сохранения данных в local storage
const authPersistConfig = {
  key: 'auth', //название ключа, который будет отображаться в local storage

  storage,

  whitelist: ['token'], //что отображать в local storage
};

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    auth: persistReducer(authPersistConfig, authReducers),
  },
  middleware,
  // devTools: process.env.NODE_ENV === "development",
});
const persistor = persistStore(store);

export default { persistor, store };

// export default store;
