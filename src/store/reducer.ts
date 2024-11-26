import { createReducer } from '@reduxjs/toolkit';
import { setCity, loadOffers, setCurrentUser, setOffersLoadingStatus, setActiveSortType, setActiveOfferId, requireAuthorization, setError } from './action';
import { cities, CityLocation, AuthorizationStatus } from '../const';
import type { City, Offer, SortType } from '../types/types';
import type { UserInfo } from '../types/user-data';

type InitialState = {
  city: City;
  offers: Offer[];
  activeOfferId: number | null;
  activeSortType: SortType;
  isOffersLoadingStatus: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userInfo: UserInfo | null;
}

const initialState: InitialState = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  offers: [],
  activeOfferId: null,
  activeSortType: 'Popular',
  isOffersLoadingStatus: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
  userInfo: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = {
        name: action.payload,
        location: CityLocation[action.payload]
      };
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoadingStatus = action.payload;
    })
    .addCase(setCurrentUser, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setActiveSortType, (state, action) => {
      state.activeSortType = action.payload;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };

