import type { OfferBasic } from '../../types/types';

import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { capitalize } from '../../utils/common-utils';

type PlaceCardProps = Omit<OfferBasic, 'city'> & {
  onMouseEnter: (id: number) => void; //@thws onMouseMove in example
  onMouseLeave: () => void;
  blockClass: string;
  dimensions: {
    width: number;
    height: number;
  };
}

function PlaceCard({
  id,
  price,
  rating,
  title,
  isPremium,
  isFavorite,
  previewImage,
  type,
  blockClass = 'cities',
  onMouseEnter,
  onMouseLeave,

  dimensions
}: PlaceCardProps): JSX.Element {
  const premiumMark: JSX.Element = <div className="place-card__mark"><span>Premium</span></div>;

  const handleMouseEnter = () => {
    onMouseEnter(id);
  };

  return (
    <article onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave} className={`${blockClass}__card place-card`}>
      {isPremium && premiumMark}
      <div className={`${blockClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width={dimensions.width} height={dimensions.height} alt="Place"/>
        </Link>
      </div>
      <div className={`${blockClass}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
