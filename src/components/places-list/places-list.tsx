import { useAppDispatch } from '../../hooks';
import { setActiveOfferId } from '../../store/action';
import type {Offer} from '../../types/types';

import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
};

function PlacesList({offers}: PlacesListProps): JSX.Element {
  // const activePlace = useAppSelector((state) => state.activeOfferId);
  // eslint-disable-next-line no-console
  // console.log(activePlace);
  const dispatch = useAppDispatch();

  const handleMouseEnter = (id: number) => {
    dispatch(setActiveOfferId(id));
  };

  const handleMouseLeave = () => {
    dispatch(setActiveOfferId(null));
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
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
