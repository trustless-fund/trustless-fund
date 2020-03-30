import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import logger from 'redux-logger';
import preloadedState from '../reducers/initialState';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('../reducers/rootReducer', () => store.replaceReducer(rootReducer))
}

export default store;