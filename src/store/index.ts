import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { setOffers } from './action';
import { OFFERS } from '../mocks/offers-mock';

export const store = configureStore({reducer});

store.dispatch(setOffers(OFFERS));
