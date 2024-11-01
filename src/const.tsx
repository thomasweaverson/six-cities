import {City as CityType} from './types/types';

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

enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

const AmsterdamCenter: CityType = {
  location: {
    latitude: 52.374030,
    longitude: 4.889690,
    zoom: 10
  },
  name: City.Amsterdam
};


export {AppRoute, AuthorizationStatus, City, AmsterdamCenter};
