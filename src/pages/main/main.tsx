import Logo from '../../components/logo/logo';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

import CitiesList from '../../components/cities-list/cities-list';

import Places from '../../components/places/places';

function Main(): JSX.Element {
  // const currentCity = useAppSelector((state) => state.city);
  // const activeOfferId = useAppSelector((state) => state.activeOfferId);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <Places />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
