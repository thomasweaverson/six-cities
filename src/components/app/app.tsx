import { BrowserRouter, Routes, Route } from 'react-router-dom';

import type { Offer, Cities } from '../../types/types';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = {
  offers: Offer[];
  cities: Cities;
};

function App( {offers, cities}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Main offers={offers} cities={cities}/>}
        />

        <Route
          path={AppRoute.Login}
          element={<Login />}
        />

        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Room offers={offers}/>}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />

        <Route
          path='*'
          element={<NotFoundScreen />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
