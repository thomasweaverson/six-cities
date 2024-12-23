import React from 'react';

function Gallery({ images } : { images: string[] }): JSX.Element {

  return(
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, 6).map((image) => (
          <div className="property__image-wrapper" key={image}>
            <img className="property__image" src={image} alt="offer view"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Gallery);
