import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../components/logo/logo';
import PlaceCard from '../../components/place-card/place-card';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import CommentForm from '../../components/comment-form/comment-form';
import type {Offer} from '../../types/types';

import { REVIEWS } from '../../mocks/reviews-mock';
import HostUser from '../../components/host-user/host-user';
import { shuffleArray, splitDescription } from '../../utils/common-utils';
import ReviewsList from '../../components/reviews-list/reviews-list';


function Room({offers}: {offers: Offer[]}): JSX.Element {

  const id = Number(useParams().id);

  const [activePlace, setActivePlace] = useState<Offer | null>(null);
  // eslint-disable-next-line no-console
  console.log(activePlace);


  const handleMouseEnter = (offer: Offer) => {
    setActivePlace(offer);
  };

  const handleMouseLeave = () => {
    setActivePlace(null);
  };
  const roomOffer = offers.find((offer) => offer.id === id);
  // eslint-disable-next-line no-console
  if (!roomOffer) {
    return <NotFoundScreen />;
  }

  const temporaryNearByOffers = offers.filter((offer) => offer.id !== id).slice(0, 3);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {shuffleArray(roomOffer.images).slice(0, 6).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="offer view"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {roomOffer.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {roomOffer.title}
                </h1>
                <button className={`property__bookmark-button button ${roomOffer.isFavorite ? 'property__bookmark-button--active' : ''}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${roomOffer.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{roomOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {roomOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {roomOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {roomOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{roomOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {roomOffer.goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <HostUser {...roomOffer.host} />
                <div className="property__description">
                  {splitDescription(roomOffer.description).map((paragraph) => (
                    <p className="property__text" key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ReviewsList reviews={REVIEWS} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {temporaryNearByOffers.map((offer) => (
                <PlaceCard
                  key={offer.id}
                  isPremium={offer.isPremium}
                  previewImage={offer.previewImage}
                  price={offer.price}
                  isFavorite={offer.isFavorite}
                  rating={offer.rating}
                  id={offer.id}
                  title={offer.title}
                  type={offer.type}
                  onMouseEnter={() => handleMouseEnter(offer)}
                  onMouseLeave={handleMouseLeave}
                  blockClass={'near-places'}
                  dimensions={{
                    width: 260,
                    height: 200,}}
                />))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
