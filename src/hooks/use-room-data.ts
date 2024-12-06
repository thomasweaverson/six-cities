import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction } from '../store/api-actions';
import { setActiveOffer, setCity } from '../store/action';

export function useRoomData(id: number) {
  const dispatch = useAppDispatch();
  const {
    currentOffer,
    comments,
    nearbyOffers,

    offerLoadingError,

    isOfferLoadingStatus,
    isCommentsLoadingStatus,
    isNearByOffersLoadingStatus
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchReviewsAction(id));
    return () => {
      dispatch(setActiveOffer(null));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOffer) {
      dispatch(setActiveOffer(currentOffer));
      dispatch(setCity(currentOffer.city.name));
    }
  }, [dispatch, currentOffer]);

  return { currentOffer, comments, offerLoadingError, isOfferLoadingStatus, nearbyOffers, isCommentsLoadingStatus, isNearByOffersLoadingStatus };
}
