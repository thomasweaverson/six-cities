import { createAction } from '@reduxjs/toolkit';
import type { Offer, CityName } from '../types/types';

export const setCity = createAction('setCity', (city: CityName) => ({ payload: city }));

export const getOffers = createAction('getOffers', (offers: Offer[]) => ({ payload: offers }));

export const setActiveOfferId = createAction('setActiveOfferId', (activeOfferId: number | null) => ({ payload: activeOfferId }));
