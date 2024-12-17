import { Middleware } from '@reduxjs/toolkit';
import { reducer } from '../reducer';
import { Action, type RedirectToRouteAction } from '../action';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
(_store) =>
  (next) =>
    (action: RedirectToRouteAction) => {
      if (action.type === Action.REDIRECT_TO_ROUTE) {
        browserHistory.push(action.payload);
      }

      return next(action);
    };
