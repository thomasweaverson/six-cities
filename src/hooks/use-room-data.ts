import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchNearbyOffers, fetchOffer, fetchReviews } from '../store/action';
import { setActiveOffer, setCity } from '../store/app-process/app-process';
import { getComments, getCurrentOffer, getIsCommentsLoadingStatus, getIsNearByOffersLoadingStatus, getIsOfferLoadingStatus, getNearbyOffers } from '../store/app-data/selectors';

export function useRoomData(id: number) {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getCurrentOffer);
  const comments = useAppSelector(getComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isOfferLoadingStatus = useAppSelector(getIsOfferLoadingStatus);
  const isCommentsLoadingStatus = useAppSelector(getIsCommentsLoadingStatus);
  const isNearByOffersLoadingStatus = useAppSelector(getIsNearByOffersLoadingStatus);

  useEffect(() => {
    dispatch(fetchOffer(id));
    dispatch(fetchNearbyOffers(id));
    dispatch(fetchReviews(id));
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

  return { currentOffer, comments, isOfferLoadingStatus, nearbyOffers, isCommentsLoadingStatus, isNearByOffersLoadingStatus };
}
