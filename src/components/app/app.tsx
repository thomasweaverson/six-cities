import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
};

function App( {offersCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main offersCount={offersCount}/>}
        />

        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Room />}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Login}
          element={<Login />}
        />

        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
