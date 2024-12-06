import { useParams } from 'react-router-dom';

import { splitDescription } from '../../utils/common-utils';

import PlaceCard from '../../components/place-card/place-card';
import HostUser from '../../components/host-user/host-user';
import Map from '../../components/map/map';
import Reviews from '../../components/reviews/reviews';

import { useRoomData } from '../../hooks/use-room-data';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import Gallery from '../../components/gallery/gallery';
import PropertyDetails from '../../components/property-details/property-details';


function Room(): JSX.Element {
  const id = Number(useParams().id);
  const {
    currentOffer,
    comments,
    nearbyOffers,

    isOfferLoadingStatus,
    isCommentsLoadingStatus,
    isNearByOffersLoadingStatus
  } = useRoomData(id);


  if (isOfferLoadingStatus) {
    return (
      <div className="page">
        <Header />
        <Loader />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        {currentOffer &&
        <section className="property">
          <Gallery images={currentOffer.images} />
          <div className="property__container container">
            <div className="property__wrapper">
              <PropertyDetails offer={currentOffer} />

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <HostUser {...currentOffer.host} />
                <div className="property__description">
                  {splitDescription(currentOffer.description).map((paragraph) => (
                    <p className="property__text" key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              {isCommentsLoadingStatus ? <Loader /> : <Reviews comments={comments} />}
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
