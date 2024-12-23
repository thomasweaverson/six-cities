import CitiesList from '../../components/cities-list/cities-list';
import Places from '../../components/places/places';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getIsOffersLoadingStatus, selectOffers } from '../../store/app-data/selectors';

function Main(): JSX.Element {
  const isOffersLoadingStatus = useAppSelector(getIsOffersLoadingStatus);
  const offers = useAppSelector(selectOffers);
  const isEmpty = !isOffersLoadingStatus && offers.length === 0;
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${isEmpty ? 'cities__places-container--empty' : ''}`}>
            <Places />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
