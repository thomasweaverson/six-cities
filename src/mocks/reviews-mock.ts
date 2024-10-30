import {Review} from '../types/types';

const REVIEWS: Review[] = [
  {
    'id': 1,
    'user': {
      'id': 12,
      'isPro': true,
      'name': 'Isaac',
      'avatarUrl': 'https://10.react.htmlacademy.pro/static/avatar/3.jpg'
    },
    'rating': 5,
    'comment': 'I stayed here for one night and it was an unpleasant experience.',
    'date': '2024-07-09T10:05:37.009Z'
  },
  {
    'id': 2,
    'user': {
      'id': 15,
      'isPro': false,
      'name': 'Kendall',
      'avatarUrl': 'https://10.react.htmlacademy.pro/static/avatar/6.jpg'
    },
    'rating': 3,
    'comment': 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    'date': '2024-07-02T10:05:37.009Z'
  },
  {
    'id': 3,
    'user': {
      'id': 18,
      'isPro': true,
      'name': 'Sophie',
      'avatarUrl': 'https://10.react.htmlacademy.pro/static/avatar/9.jpg'
    },
    'rating': 4,
    'comment': 'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
    'date': '2024-07-02T10:05:37.009Z'
  }
];

export {REVIEWS};
