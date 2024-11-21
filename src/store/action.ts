import { createAction } from '@reduxjs/toolkit';
import type { Offer, CityName, SortType } from '../types/types';

export const Action = {
  SET_CITY: 'city/set',
  SET_ACTIVE_SORT_TYPE: 'sorting/set-active-sort-type',
  SET_ACTIVE_OFFER_ID: 'offers/set-active',
  LOAD_OFFERS: 'data/loadOffers',
  SET_OFFERS_LOADING_STATUS: 'data/setOffersLoadedStatus',
};

export const setCity = createAction<CityName>(Action.SET_CITY);

export const setActiveSortType = createAction<SortType>(Action.SET_ACTIVE_SORT_TYPE);

export const setActiveOfferId = createAction<number | null>(Action.SET_ACTIVE_OFFER_ID);

export const loadOffers = createAction<Offer[]>(Action.LOAD_OFFERS);

export const setOffersLoadingStatus = createAction<boolean>(Action.SET_OFFERS_LOADING_STATUS);
