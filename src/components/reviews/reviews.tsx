

import ReviewsList from '../reviews-list/reviews-list';
import CommentForm from '../comment-form/comment-form';
import { useAppSelector } from '../../hooks';
import { Review } from '../../types/types';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type ReviewsProps = {
  comments: Review[];
};

function Reviews( {comments}: ReviewsProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <section className="property__reviews reviews">
      {
        comments.length > 0 &&
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
          <ReviewsList reviews={comments} />
        </>
      }

      {authorizationStatus === 'AUTH' && <CommentForm />}
    </section>
  );
}

export default Reviews;
