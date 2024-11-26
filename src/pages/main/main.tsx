import CitiesList from '../../components/cities-list/cities-list';
import Places from '../../components/places/places';
import Header from '../../components/header/header';

function Main(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
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
