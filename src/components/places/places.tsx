import {useAppSelector} from '../../hooks';

import PlacesList from '../places-list/places-list';
import Map from '../map/map';

import getOffersByCity from '../../utils/cities-utils';

function Places(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);

  const offersByCity = getOffersByCity(currentCity.name, useAppSelector((state) => state.offers));

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersByCity.length} places to stay in {currentCity.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <PlacesList offers={offersByCity} />
      </section>
      <div className="cities__right-section">
        <Map locations={offersByCity.map((offer) => offer.location)} city={currentCity} />
      </div>
    </>
  );
}

export default Places;
