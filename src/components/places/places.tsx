import {useAppSelector} from '../../hooks';

import PlacesList from '../places-list/places-list';
import Map from '../map/map';

import {getOffersByCity} from '../../utils/cities-utils';
import SortDropdown from '../sort-dropdown/sort-dropdown';
import LoadingScreen from '../loader/loader';

function Places(): JSX.Element {
  const {isOffersLoadingStatus, offers} = useAppSelector((state) => state); //authorizationStatus in {...}
  const currentCity = useAppSelector((state) => state.city);

  if (isOffersLoadingStatus) {
    return (
      <LoadingScreen />
    );
  }


  const offersByCity = getOffersByCity(currentCity.name, offers);

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersByCity.length} places to stay in {currentCity.name}</b>
        <SortDropdown />
        <PlacesList offers={offersByCity} />
      </section>
      <div className="cities__right-section">
        <Map offers={offersByCity} city={currentCity} />
      </div>
    </>
  );
}

export default Places;
