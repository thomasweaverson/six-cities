import type {Review} from '../../types/types';
import ReviewItem from '../review-item/review-item';

const sortByDateDescending = (comments: Review[]): Review[] => comments.sort((a, b) => {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();
  return dateB - dateA;
});

function ReviewsList({reviews}: {reviews: Review[]}): JSX.Element {
  // eslint-disable-next-line
  console.log(reviews);
  const sortedReviews = sortByDateDescending([...reviews]);
  const trimmedReviews = sortedReviews.slice(0, 10);
  return (
    <ul className="reviews__list">
      {trimmedReviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
