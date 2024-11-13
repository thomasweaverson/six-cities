import type {City, CityName} from './types/types';

enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer',
  Login = '/login',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const cities: Record<CityName, City> = {
  Paris: {
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 10
    },
    name: 'Paris'
  },
  Cologne: {
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 10
    },
    name: 'Cologne'
  },
  Brussels: {
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 10
    },
    name: 'Brussels'
  },
  Amsterdam: {
    location: {
      latitude: 52.374030,
      longitude: 4.889690,
      zoom: 10
    },
    name: 'Amsterdam'
  },
  Hamburg: {
    location: {
      latitude: 53.550341,
      longitude: 9.993683,
      zoom: 10
    },
    name: 'Hamburg'
  },
  Dusseldorf: {
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 10
    },
    name: 'Dusseldorf'
  }
};


export {AppRoute, AuthorizationStatus, cities};
