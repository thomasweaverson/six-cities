import {useAppSelector} from '../../hooks';

import PlacesList from '../places-list/places-list';
import Map from '../map/map';

import SortDropdown from '../sort-dropdown/sort-dropdown';
import LoadingScreen from '../loader/loader';
import { getCity } from '../../store/app-process/selectors';
import { getIsOffersLoadingStatus, selectOffers } from '../../store/app-data/selectors';

function Places(): JSX.Element {
  const offers = useAppSelector(selectOffers);
  const isOffersLoadingStatus = useAppSelector(getIsOffersLoadingStatus);
  const currentCity = useAppSelector(getCity);

  if (isOffersLoadingStatus) {
    return (
      <LoadingScreen />
    );
  }

  if (offers.length === 0) {
    return (
      <>
        <section className='cities__no-places'>
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </>
    );
  }

  return (
    <>
      <section className='cities__places places'>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
        <SortDropdown />
        <PlacesList offers={offers} />
      </section>
      <div className="cities__right-section">
        <Map offers={offers} city={currentCity} />
      </div>
    </>
  );
}

export default Places;
