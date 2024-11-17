import type { Offer, SortType } from '../types/types';
import { SortTypeEnum } from '../const';


function getOffersByCity(city: string, offers: Offer[]): Offer[] {
  return offers.filter((offer) => offer.city.name === city);
}

function sortOffers(offers: Offer[], sortType: SortType): Offer[] {
  // Создаем новый массив, чтобы не мутировать оригинальный
  const sortedOffers = [...offers];

  switch (sortType) {
    case SortTypeEnum.PriceLowToHigh:
      return sortedOffers.sort((a, b) => a.price - b.price);

    case SortTypeEnum.PriceHighToLow:
      return sortedOffers.sort((a, b) => b.price - a.price);

    case SortTypeEnum.TopRatedFirst:
      return sortedOffers.sort((a, b) => b.rating - a.rating);

    case SortTypeEnum.Popular:
    default:
      // Возвращаем новый массив без изменения порядка
      return sortedOffers;
  }
}

export {sortOffers, getOffersByCity };
