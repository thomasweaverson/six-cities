import { useAppDispatch } from '../../hooks';

import type {Offer} from '../../types/types';

import PlaceCard from '../place-card/place-card';
import { useAppSelector } from '../../hooks';
import { sortOffers } from '../../utils/cities-utils';
import { setActiveOffer } from '../../store/action';

type PlacesListProps = {
  offers: Offer[];
};

function PlacesList({offers}: PlacesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const activeSortType = useAppSelector((state) => state.activeSortType);
  const sortedOffers = sortOffers(offers, activeSortType);

  const handleMouseEnter = (offer: Offer) => {
    dispatch(setActiveOffer(offer));
  };

  const handleMouseLeave = () => {
    dispatch(setActiveOffer(null));
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          blockClass={'cities'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          dimensions={{
            width: 260,
            height: 200,}}
        />))}
    </div>
  );
}

export default PlacesList;

