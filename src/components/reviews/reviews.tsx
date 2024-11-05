import type {Review} from '../../types/types';

import ReviewsList from '../reviews-list/reviews-list';
import CommentForm from '../comment-form/comment-form';

function Reviews({reviews}: {reviews: Review[]}): JSX.Element {
  return (
    <section className="property__reviews reviews">
      {
        reviews.length > 0 &&
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
          <ReviewsList reviews={reviews} />
        </>
      }

      <CommentForm />
    </section>
  );
}

export default Reviews;
