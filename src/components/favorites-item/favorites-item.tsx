import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import type {Offer} from '../../types/types';
import { City } from '../../const';

type CityName = typeof City[keyof typeof City]

function FavoritesItem({city, offers}: {city: CityName; offers: Offer[]}): JSX.Element {
  const [activePlace, setActivePlace] = useState<Offer | null>(null);
  // eslint-disable-next-line no-console
  console.log(activePlace);


  const handleMouseEnter = (offer: Offer) => {
    setActivePlace(offer);
  };

  const handleMouseLeave = () => {
    setActivePlace(null);
  };


  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            isPremium={offer.isPremium}
            previewImage={offer.previewImage}
            price={offer.price}
            isFavorite={offer.isFavorite}
            rating={offer.rating}
            id={offer.id}
            title={offer.title}
            type={offer.type}
            onMouseEnter={() => handleMouseEnter(offer)}
            onMouseLeave={handleMouseLeave}
            blockClass={'favorites'}
            dimensions={{
              width: 150,
              height: 110,}}
          />))}

      </div>
    </li>
  );
}

export default FavoritesItem;
