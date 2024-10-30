import type {Review} from '../../types/types';
import ReviewItem from '../review-item/review-item';

function ReviewsList({reviews}: {reviews: Review[]}): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
