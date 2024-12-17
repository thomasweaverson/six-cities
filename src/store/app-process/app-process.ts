import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppProcess } from '../../types/state';
import type { CityName, Offer, SortType } from '../../types/types';
import { cities, CityLocation, SortTypes, NameSpace } from '../../const';

const initialState: AppProcess = {
  city: {
    name: cities[0],
    location: CityLocation[cities[0]]
  },
  activeSortType: SortTypes[0],
  activeOffer: null,
  error: null
};

export const appProcess = createSlice({
  name: NameSpace.AppProcess,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = {
        name: action.payload,
        location: CityLocation[action.payload]
      };
    },
    setActiveSortType: (state, action: PayloadAction<SortType>) => {
      state.activeSortType = action.payload;
    },
    setActiveOffer: (state, action: PayloadAction<Offer | null>) => {
      state.activeOffer = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
});

export const { setCity, setActiveSortType, setActiveOffer, setError, clearError } = appProcess.actions;
