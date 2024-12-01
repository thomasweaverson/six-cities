import { createReducer } from '@reduxjs/toolkit';
import {
  setCity,
  setOffers,
  setCurrentOffer,
  setNearByOffers,
  setComments,
  setCurrentUser,
  setOffersLoadingStatus,
  setOfferLoadingStatus,
  setNearByOffersLoadingStatus,
  setCommentsLoadingStatus,
  setActiveSortType,
  setActiveOffer,
  requireAuthorization,
  setError,
  setOfferLoadingError,
} from './action';
import { cities, CityLocation, AuthorizationStatus } from '../const';
import type { City, Offer, Review, SortType } from '../types/types';
import type { UserInfo } from '../types/user-data';

type InitialState = {
  city: City;
  offers: Offer[];
  activeOffer: Offer | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  activeSortType: SortType;
  isOffersLoadingStatus: boolean;
  isOfferLoadingStatus: boolean;
  isNearByOffersLoadingStatus: boolean;
  isCommentsLoadingStatus: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  offerLoadingError: string | null;
  userInfo: UserInfo | null;
}

const initialState: InitialState = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  offers: [],
  activeOffer: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  activeSortType: 'Popular',
  isOffersLoadingStatus: false,
  isOfferLoadingStatus: false,
  isNearByOffersLoadingStatus: false,
  isCommentsLoadingStatus: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
  offerLoadingError: null,
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
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearByOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoadingStatus = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoadingStatus = action.payload;
    })
    .addCase(setNearByOffersLoadingStatus, (state, action) => {
      state.isNearByOffersLoadingStatus = action.payload;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsLoadingStatus = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCurrentUser, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setActiveSortType, (state, action) => {
      state.activeSortType = action.payload;
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOfferLoadingError, (state, action) => {
      state.offerLoadingError = action.payload;
    });
});

export { reducer };

