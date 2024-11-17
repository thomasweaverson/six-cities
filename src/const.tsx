import type {GeoLocation, CityName} from './types/types';

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

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

const CityLocation: {[key in CityName]: GeoLocation} = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  Amsterdam: {
    latitude: 52.374030,
    longitude: 4.889690,
    zoom: 13
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 9.993683,
    zoom: 13
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
};

const SortTypes = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;

enum SortTypeEnum {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export {AppRoute, AuthorizationStatus, cities, CityLocation, SortTypes, SortTypeEnum};
