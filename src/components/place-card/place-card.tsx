import type { Offer } from '../../types/types';

import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { capitalize } from '../../utils/common-utils';
import Bookmark from '../bookmark/bookmark';
import { memo } from 'react';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter?: (offer: Offer) => void; //@thws onMouseMove in example
  onMouseLeave?: () => void;
  blockClass: 'cities' | 'favorites' | 'near-places';
  dimensions: {
    width: number;
    height: number;
  };
}

function PlaceCard({
  offer,
  blockClass = 'cities',
  onMouseEnter = () => void 0,
  onMouseLeave = () => void 0,

  dimensions
}: PlaceCardProps): JSX.Element {
  const premiumMark: JSX.Element = <div className="place-card__mark"><span>Premium</span></div>;

  const handleMouseEnter = () => {
    onMouseEnter(offer);
  };

  return (
    <article onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave} className={`${blockClass}__card place-card`}>
      {offer.isPremium && premiumMark}
      <div className={`${blockClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={dimensions.width} height={dimensions.height} alt="Place"/>
        </Link>
      </div>
      <div className={`${blockClass}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark id={offer.id} isActive={offer.isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(offer.type)}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard, (prevProps, nextProps) => prevProps.offer.isFavorite === nextProps.offer.isFavorite);
