import { useAppDispatch } from '../../hooks';

import type {Offer} from '../../types/types';

import PlaceCard from '../place-card/place-card';
import { useAppSelector } from '../../hooks';
import { sortOffers } from '../../utils/cities-utils';
import { setActiveOfferId } from '../../store/action';

type PlacesListProps = {
  offers: Offer[];
};

function PlacesList({offers}: PlacesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const activeSortType = useAppSelector((state) => state.activeSortType);
  const sortedOffers = sortOffers(offers, activeSortType);

  const handleMouseEnter = (id: number) => {
    dispatch(setActiveOfferId(id));
  };

  const handleMouseLeave = () => {
    dispatch(setActiveOfferId(null));
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          id={offer.id}
          price={offer.price}
          rating={offer.rating}
          title={offer.title}
          isPremium={offer.isPremium}
          isFavorite={offer.isFavorite}
          previewImage={offer.previewImage}
          type={offer.type}
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

