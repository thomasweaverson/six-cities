import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/types';
import { loadOffers, setOffersLoadingStatus } from './action'; //requireAuthorization
// saveToken dropToken
import { APIRoute } from '../const';
//AuthData type
//UserData type

export const fetchOffersAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api }) => {
      dispatch(setOffersLoadingStatus(true));
      const { data } = await api.get<Offer[]>(APIRoute.Hotels);

      dispatch(loadOffers(data));
      dispatch(setOffersLoadingStatus(false));
    }
  );


// checkAuthAction loginAction logoutAction
