import store from '../store';
import { AuthorizationStatus } from '../const';
import { UserInfo } from './user-data';
import { City, Offer, Review, SortType } from './types';

export type AppData = {
  offers: Offer[];
  isOffersLoadingStatus: boolean;
  currentOffer: Offer | null;
  isOfferLoadingStatus: boolean;
  nearbyOffers: Offer[];
  isNearByOffersLoadingStatus: boolean;
  comments: Review[];
  isCommentsLoadingStatus: boolean;
}

export type AppProcess = {
  city: City;
  activeSortType: SortType;
  activeOffer: Offer | null;
  error: string | null;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
