import { useNavigate, useParams } from 'react-router-dom';

import { shuffleArray, splitDescription } from '../../utils/common-utils';

import PlaceCard from '../../components/place-card/place-card';
import HostUser from '../../components/host-user/host-user';
import Map from '../../components/map/map';
import Reviews from '../../components/reviews/reviews';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveOffer, setCity } from '../../store/action';
import { useEffect } from 'react';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import { fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { AppRoute } from '../../const';


function Room(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = Number(useParams().id);

  const currentOffer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);

  const isOfferLoadingStatus = useAppSelector((state) => state.isOfferLoadingStatus);
  const isNearByOffersLoadingStatus = useAppSelector((state) => state.isNearByOffersLoadingStatus);
  const isCommentsLoadingStatus = useAppSelector((state) => state.isCommentsLoadingStatus);

  const offerLoadingError = useAppSelector((state) => state.offerLoadingError);

  useEffect(() => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchReviewsAction(id));
    return () => {
      dispatch(setActiveOffer(null));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOffer) {
      dispatch(setActiveOffer(currentOffer));
      dispatch(setCity(currentOffer.city.name));
    }
  }, [dispatch, currentOffer]);

  if (isOfferLoadingStatus) {
    return (
      <div className="page">
        <Header />
        <Loader />
      </div>
    );
  }

  if (offerLoadingError) {
    navigate(AppRoute.NotFound);
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        {currentOffer &&
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {shuffleArray(currentOffer.images).slice(0, 6).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="offer view"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className={`property__bookmark-button button ${currentOffer.isFavorite ? 'property__bookmark-button--active' : ''}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${currentOffer.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <HostUser {...currentOffer.host} />
                <div className="property__description">
                  {splitDescription(currentOffer.description).map((paragraph) => (
                    <p className="property__text" key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              {isCommentsLoadingStatus ? <Loader /> : <Reviews />}
            </div>
          </div>
          {isNearByOffersLoadingStatus ? <Loader /> : <Map city={currentOffer.city} offers={[...nearbyOffers, currentOffer]} blockClass="property__map" />}
        </section>}
        <div className="container">
          {isNearByOffersLoadingStatus && <Loader />}
          {!isNearByOffersLoadingStatus &&
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer) => (
                <PlaceCard
                  key={offer.id}
                  offer={offer}
                  blockClass={'near-places'}
                  dimensions={{
                    width: 260,
                    height: 200,}}
                />))}
            </div>
          </section>}
        </div>
      </main>
    </div>
  );
}

export default Room;
