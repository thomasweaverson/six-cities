enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer',
  Login = '/login',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export {AppRoute, AuthorizationStatus};
