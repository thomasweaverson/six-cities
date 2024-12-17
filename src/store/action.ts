import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Offer, Review } from '../types/types';
import { AuthData } from '../types/auth-data';
import { UserComment, UserData, UserInfo } from '../types/user-data';

import { APIRoute, AppRoute, HttpCode } from '../const';
import { dropToken, saveToken } from '../services/token';


type Extra = {
  api: AxiosInstance;
  history: History;
}

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  FETCH_NEARBY_OFFERS: 'offers/fetch-nearby',
  FETCH_REVIEWS: 'offer/fetch-reviews',
  POST_REVIEW: 'offer/post-review',
  CHECK_AUTH: 'user/check-auth',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'redirect-to-route',
};

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: Extra }>(
  Action.FETCH_OFFERS,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOffer = createAsyncThunk<Offer, Offer['id'], {extra: Extra}>(
  Action.FETCH_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch (error) {
      const AxiosError = error as AxiosError;

      if (AxiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(error);
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], Offer['id'], { extra: Extra }>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

export const fetchReviews = createAsyncThunk<Review[], Offer['id'], { extra: Extra }>(
  Action.FETCH_REVIEWS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const postReview = createAsyncThunk<Review[], UserComment, { extra: Extra }>(
  Action.POST_REVIEW,
  async ({comment, rating, hotelId}, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<Review[]>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});

    return data;
  }
);

export const checkAuth = createAsyncThunk<UserInfo, undefined,{ extra: Extra }>(
  Action.CHECK_AUTH,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<UserInfo>(APIRoute.Login);

    return data;
  }
);

export const login = createAsyncThunk<UserInfo, AuthData, { extra: Extra}>(
  Action.LOGIN,
  async ({email, password}, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    const { token } = data;

    saveToken(token);
    history.push(AppRoute.Root);

    return data;
  }
);
//@thws реализовать переход не в root, а на ту страницу, на которой пользователь был перед логином

export const logout = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT,
  async (_arg, { extra }) => {
    const { api } = extra;
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);

export type RedirectToRouteAction = ReturnType<typeof redirectToRoute>;

// export const clearErrorAction = createAsyncThunk(
//   'user/clearError',
//   () => {
//     setTimeout(
//       () => {
//         store.dispatch(setError(null));
//         store.dispatch(setOfferLoadingError(null));
//       },
//       TIMEOUT_SHOW_ERROR);
//   }
// );
