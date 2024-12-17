import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { fetchOffers, checkAuth } from './action';
import browserHistory from '../browser-history';
import { redirect } from './middlewares/redirect';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
          history: browserHistory
        },
      },
    }).concat(redirect),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

export default store;
