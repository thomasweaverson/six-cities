import { createAction } from '@reduxjs/toolkit';
import type { Offer, CityName } from '../types/types';

export const Action = {
  SET_CITY: 'city/set',
  SET_OFFERS: 'offers/set',
  SET_ACTIVE_OFFER_ID: 'offers/set-active'
};

export const setCity = createAction<CityName>(Action.SET_CITY);

export const setOffers = createAction<Offer[]>(Action.SET_OFFERS);

export const setActiveOfferId = createAction('setActiveOfferId', (activeOfferId: number | null) => ({ payload: activeOfferId }));
//@thws ^
