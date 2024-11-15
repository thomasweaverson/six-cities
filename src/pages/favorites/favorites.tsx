import type {Offer, CityName} from '../../types/types';

import { cities } from '../../const';
import Logo from '../../components/logo/logo';
import FavoritesItem from '../../components/favorites-item/favorites-item';
import { useAppSelector } from '../../hooks';

type GroupedOffers = {
  city: CityName;
  offers: Offer[];
};

function filterFavoritesAndGroupByCity(offers: Offer[]): GroupedOffers[] | null {
  const groupedOffers = cities
    .map((city) => ({
      city,
      offers: offers.filter((offer) => offer.city.name === city && offer.isFavorite),
    }))
    .filter((group) => group.offers.length > 0);

  return groupedOffers.length > 0 ? groupedOffers : null;
}

function Favorites(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const groupedOffers = filterFavoritesAndGroupByCity(offers);
  const isOffersEmpty = (!groupedOffers || groupedOffers.length === 0);

  const divPageElementClass = `page ${isOffersEmpty ? 'page--favorites-empty' : ''}`;
  const mainElementClass = `page__main page__main--favorites ${isOffersEmpty ? 'page__main--favorites-empty' : ''}`;
  const sectionFavoritesElementClass = `favorites ${isOffersEmpty ? 'favorites--empty' : ''}`;
  // eslint-disable-next-line no-console
  console.log('groupedOffers', groupedOffers);
  return (
    <div className={divPageElementClass}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={mainElementClass}>
        <div className="page__favorites-container container">
          <section className={sectionFavoritesElementClass}>
            {
              isOffersEmpty &&
                <>
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                  </div>
                </>
            }

            {
              !isOffersEmpty &&
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {groupedOffers && groupedOffers.map((group) => (
                      <FavoritesItem
                        key={group.city}
                        city={group.city}
                        offers={group.offers}
                      />
                    ))}
                  </ul>
                </>
            }
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
