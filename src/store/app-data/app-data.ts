import { createSlice } from '@reduxjs/toolkit';

import type { AppData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchOffers, fetchOffer, fetchNearbyOffers, fetchReviews, postReview, fetchFavoriteOffers, postFavorite, logout } from '../action';

const initialState: AppData = {
  offers: [],
  isOffersLoadingStatus: false,
  currentOffer: null,
  isOfferLoadingStatus: false,
  nearbyOffers: [],
  isNearByOffersLoadingStatus: false,
  comments: [],
  isCommentsLoadingStatus: false,
  favoriteOffers: [],
  isFavoriteOffersLoadingStatus: false,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoadingStatus = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoadingStatus = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoadingStatus = false;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoadingStatus = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoadingStatus = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isOfferLoadingStatus = false;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearByOffersLoadingStatus = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearByOffersLoadingStatus = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isNearByOffersLoadingStatus = false;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isCommentsLoadingStatus = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoadingStatus = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isCommentsLoadingStatus = false;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoadingStatus = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoadingStatus = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoadingStatus = false;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => (offer.id === updatedOffer.id ? updatedOffer : offer));

        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer = updatedOffer;
        }

        if (updatedOffer.isFavorite) {
          state.favoriteOffers = [...state.favoriteOffers, updatedOffer];
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.favoriteOffers = [];
        state.offers = state.offers.map((offer) => ({...offer, isFavorite: false}));
      });
  }
});
