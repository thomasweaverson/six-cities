import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, Review } from '../types/types';
import {
  setOffers,
  setCurrentOffer,
  setNearByOffers,
  setComments,
  setCurrentUser,
  requireAuthorization,
  setOffersLoadingStatus,
  setError,
  setOfferLoadingError,
  setOfferLoadingStatus,
  setNearByOffersLoadingStatus,
  setCommentsLoadingStatus,
} from './action';
import { dropToken, saveToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { UserComment, UserData } from '../types/user-data';
import { store } from './';

export const clearErrorAction = createAsyncThunk(
  'user/clearError',
  () => {
    setTimeout(
      () => {
        store.dispatch(setError(null));
        store.dispatch(setOfferLoadingError(null));
      },
      TIMEOUT_SHOW_ERROR);
  }
);


export const fetchOffersAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api }) => {
      try {
        dispatch(setOffersLoadingStatus(true));
        const { data } = await api.get<Offer[]>(APIRoute.Hotels);
        dispatch(setOffers(data));
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setOffersLoadingStatus(false));
      }
    }
  );

export const fetchOfferAction = createAsyncThunk<void, number,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchOffer',
    async (id, {dispatch, extra: api }) => {
      try {
        dispatch(setOfferLoadingStatus(true));
        const { data } = await api.get<Offer>(`${APIRoute.Hotels}/${id}`);
        dispatch(setCurrentOffer(data));
      } catch (error) {
        dispatch(setError((error as Error).message));
        dispatch(setOfferLoadingError((error as Error).message));
      } finally {
        dispatch(setOfferLoadingStatus(false));
      }
    }
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, number,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchNearbyOffers',
    async (id, {dispatch, extra: api }) => {
      try {
        dispatch(setNearByOffersLoadingStatus(true));
        const { data } = await api.get<Offer[]>(`${APIRoute.Hotels}/${id}/nearby`);
        dispatch(setNearByOffers(data));
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setNearByOffersLoadingStatus(false));
      }
    }
  );

export const fetchReviewsAction = createAsyncThunk<void, number,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchReviews',
    async (id, {dispatch, extra: api }) => {
      try {
        dispatch(setCommentsLoadingStatus(true));
        const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
        dispatch(setComments(data));
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setCommentsLoadingStatus(false));
      }
    }
  );

export const sendNewCommentAction = createAsyncThunk<boolean, UserComment,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchNewComment',
    async ({comment, rating, hotelId}, {dispatch, extra: api }) => {
      try {
        const { data } = await api.post<Review[]>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});
        dispatch(setComments(data));
        return true;
      } catch (error) {
        dispatch(setError((error as Error).message));
        return false;
      }
    }
  );

export const checkAuthAction = createAsyncThunk<void, undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));

      const {data} = await api.get<UserData>(APIRoute.Login);
      const userInfo = {
        name: data.name,
        avatarUrl: data.avatarUrl,
        email: data.email,
        id: data.id,
        isPro: data.isPro
      };
      dispatch(setCurrentUser(userInfo));
    }
    catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    const userInfo = {
      name: data.name,
      avatarUrl: data.avatarUrl,
      email: data.email,
      id: data.id,
      isPro: data.isPro
    };
    const token = data.token;
    saveToken(token);
    dispatch(setCurrentUser(userInfo));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

