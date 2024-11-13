import type { Offer } from '../types/types';

function getOffersByCity(city: string, offers: Offer[]): Offer[] {
  return offers.filter((offer) => offer.city.name === city);
}

export default getOffersByCity;
