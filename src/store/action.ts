import { createAction } from '@reduxjs/toolkit';
import type { Offer, CityName, SortType } from '../types/types';

export const Action = {
  SET_CITY: 'city/set',
  SET_OFFERS: 'offers/set',
  SET_ACTIVE_SORT_TYPE: 'sorting/set-active-sort-type',
  SET_ACTIVE_OFFER_ID: 'offers/set-active'
};

export const setCity = createAction<CityName>(Action.SET_CITY);

export const setOffers = createAction<Offer[]>(Action.SET_OFFERS);

export const setActiveSortType = createAction<SortType>(Action.SET_ACTIVE_SORT_TYPE);

export const setActiveOfferId = createAction<number | null>(Action.SET_ACTIVE_OFFER_ID);
