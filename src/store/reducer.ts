import { createReducer } from '@reduxjs/toolkit';
import { OFFERS } from '../mocks/offers-mock';
import { setCity, getOffers, setActiveOfferId } from './action';

import type { CityName, Offer } from '../types/types';

const initialState: {city: CityName; offers: Offer[]; activeOfferId: number | null} = {
  city: 'Paris',
  offers: OFFERS,
  activeOfferId: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    });

});

export { reducer };

