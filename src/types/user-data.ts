export type UserData = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
};

export type UserInfo = Omit<UserData, 'token'>;

export type UserComment = {
  comment: string;
  rating: number;
  hotelId: number;
};
