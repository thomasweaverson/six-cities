type GeoLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}
type City = {
  location: GeoLocation;
  name: string;
}

type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

type Offer = {
  id: number;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  city: City;
  bedrooms: number;
  description: string;
  goods: string[];
  host: Host;
  images: string[];
  location: GeoLocation;
  maxAdults: number;
}

type OfferBasic = Pick<Offer, 'id' | 'price' | 'rating' | 'title' | 'isPremium' | 'isFavorite' | 'previewImage' | 'type'> & {
  city: Pick<City, 'name'>;
};


type User = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
};

export type { Offer, Review, OfferBasic, City };
