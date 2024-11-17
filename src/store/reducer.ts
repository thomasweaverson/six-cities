import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers, setActiveSortType, setActiveOfferId } from './action';
import { cities, CityLocation } from '../const';
import type { City, Offer, SortType } from '../types/types';

type State = {
  city: City;
  offers: Offer[];
  activeOfferId: number | null;
  activeSortType: SortType;
}

const initialState: State = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  offers: [],
  activeOfferId: null,
  activeSortType: 'Popular',
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
    .addCase(setActiveSortType, (state, action) => {
      state.activeSortType = action.payload;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    });

});

export { reducer };

