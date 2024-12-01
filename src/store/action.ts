import { createAction, PayloadAction } from '@reduxjs/toolkit';
import type { Offer, CityName, SortType, Review } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserInfo } from '../types/user-data';

export const Action = {
  SET_CITY: 'city/set',
  SET_ACTIVE_SORT_TYPE: 'sorting/set-active-sort-type',
  SET_ACTIVE_OFFER: 'offers/set-active',
  SET_OFFERS: 'data/setOffers',
  SET_CURRENT_OFFER: 'data/setCurrentOffer',
  SET_NEARBY_OFFERS: 'data/setNearbyOffers',
  SET_COMMENTS: 'data/setComments',
  SET_OFFERS_LOADING_STATUS: 'data/setOffersLoadingStatus',
  SET_OFFER_LOADING_STATUS: 'data/setOfferLoadingStatus',
  SET_NEARBY_OFFERS_LOADING_STATUS: 'data/setNearbyOffersLoadedStatus',
  SET_COMMENTS_LOADING_STATUS: 'data/setCommentsLoadingStatus',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  SET_ERROR: 'user/setError',
  SET_OFFER_LOADING_ERROR: 'data/setOfferLoadingError',
  SET_CURRENT_USER: 'user/setCurrentUser',
  REDIRECT_TO_ROUTE: 'redirect/redirectToRoute',
} as const;


export const setCity = createAction<CityName>(Action.SET_CITY);

export const setActiveSortType = createAction<SortType>(Action.SET_ACTIVE_SORT_TYPE);

export const setActiveOffer = createAction<Offer | null>(Action.SET_ACTIVE_OFFER);

export const setOffers = createAction<Offer[]>(Action.SET_OFFERS);

export const setCurrentOffer = createAction<Offer | null>(Action.SET_CURRENT_OFFER);

export const setNearByOffers = createAction<Offer[]>(Action.SET_NEARBY_OFFERS);

export const setComments = createAction<Review[]>(Action.SET_COMMENTS);

export const setCurrentUser = createAction<UserInfo>(Action.SET_CURRENT_USER);

export const setOffersLoadingStatus = createAction<boolean>(Action.SET_OFFERS_LOADING_STATUS);

export const setOfferLoadingStatus = createAction<boolean>(Action.SET_OFFER_LOADING_STATUS);

export const setNearByOffersLoadingStatus = createAction<boolean>(Action.SET_NEARBY_OFFERS_LOADING_STATUS);

export const setCommentsLoadingStatus = createAction<boolean>(Action.SET_COMMENTS_LOADING_STATUS);

export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);

export const setError = createAction<string | null>(Action.SET_ERROR);

export const setOfferLoadingError = createAction<string | null>(Action.SET_OFFER_LOADING_ERROR);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);


export type RedirectToRouteAction = PayloadAction<string, typeof Action.REDIRECT_TO_ROUTE>;

