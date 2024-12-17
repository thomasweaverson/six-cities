import type { ChangeEvent } from 'react';

import { Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { postReview } from '../../store/action';

function CommentForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewText, setReviewText] = useState<string>('');

  const dispatch = useAppDispatch();

  const hotelId = Number(useParams().id);

  const ratingTitles: Record<number, string> = {
    5: 'perfect',
    4: 'good',
    3: 'not bad',
    2: 'badly',
    1: 'terribly',
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmitDisabled && !isSubmitting) {
      setIsSubmitting(true);
      const isSentSuccessfully = await dispatch(postReview({comment: reviewText, rating, hotelId})).unwrap();

      if (isSentSuccessfully) {
        setReviewText('');
        setRating(null);
      }

      setIsSubmitting(false);
    }

    //@thws should do shake animation
  };

  const isSubmitDisabled = rating === null || reviewText.length < 50 || reviewText.length > 300;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(event) => {void handleSubmit(event);}}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <Fragment key={`Star ${star}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star} //@thws в примере defaultValue
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={handleInputChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingTitles[star]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={handleTextAreaChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled || isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
