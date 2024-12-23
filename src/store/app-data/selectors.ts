import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer, Review } from '../../types/types';
import { getActiveSortType, getCity } from '../app-process/selectors';
import { getOffersByCity, sortOffers } from '../../utils/cities-utils';

export const getOffers = ({[NameSpace.AppData]: APP_DATA}: State): Offer[] => APP_DATA.offers;
export const getIsOffersLoadingStatus = ({[NameSpace.AppData]: APP_DATA}: State): boolean => APP_DATA.isOffersLoadingStatus;

export const getCurrentOffer = ({[NameSpace.AppData]: APP_DATA}: State): Offer | null => APP_DATA.currentOffer;
export const getIsOfferLoadingStatus = ({[NameSpace.AppData]: APP_DATA}: State): boolean => APP_DATA.isOfferLoadingStatus;

export const getNearbyOffers = ({[NameSpace.AppData]: APP_DATA}: State): Offer[] => APP_DATA.nearbyOffers;
export const getIsNearByOffersLoadingStatus = ({[NameSpace.AppData]: APP_DATA}: State): boolean => APP_DATA.isNearByOffersLoadingStatus;

export const getComments = ({[NameSpace.AppData]: APP_DATA}: State): Review[] => APP_DATA.comments;
export const getIsCommentsLoadingStatus = ({[NameSpace.AppData]: APP_DATA}: State): boolean => APP_DATA.isCommentsLoadingStatus;

export const getFavoriteOffers = ({[NameSpace.AppData]: APP_DATA}: State): Offer[] => APP_DATA.favoriteOffers;
export const getIsFavoriteOffersLoadingStatus = ({[NameSpace.AppData]: APP_DATA}: State): boolean => APP_DATA.isFavoriteOffersLoadingStatus;

export const selectOffers = createSelector(
  [getOffers, getCity, getActiveSortType],
  (offers, city, activeSortType) => sortOffers(getOffersByCity(city.name, offers), activeSortType)
);
