import { createReducer } from '@reduxjs/toolkit';
import { setCity, loadOffers, setOffersLoadingStatus, setActiveSortType, setActiveOfferId } from './action';
import { cities, CityLocation } from '../const';
import type { City, Offer, SortType } from '../types/types';

type State = {
  city: City;
  offers: Offer[];
  activeOfferId: number | null;
  activeSortType: SortType;
  isOffersLoadingStatus: boolean;
}

const initialState: State = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  offers: [],
  activeOfferId: null,
  activeSortType: 'Popular',
  isOffersLoadingStatus: false
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
    .addCase(setActiveSortType, (state, action) => {
      state.activeSortType = action.payload;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    });

});

export { reducer };

