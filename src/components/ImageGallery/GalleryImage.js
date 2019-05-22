import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import VisibilitySensor from 'react-visibility-sensor';

import '../../svg/expand.svg';

const GalleryImage = ({ image, caption }) => {
  const [isVisible, setVisible] = useState(false);
  const [isFullWidth, setFullWidth] = useState(false);
  const imageData = image.localFile.childImageSharp.fluid;
  const { aspectRatio } = imageData;
  const aspectClass = aspectRatio > 1.4 ? 'wide' : aspectRatio < 1 ? 'tall' : 'square';

  const onChange = visible => {
    if (visible) {
      setVisible(true);
    }
  };

  return (
    <VisibilitySensor key={image.id} onChange={onChange} partialVisibility={true} minTopValue={250}>
      <div
        className={`GalleryImage ${aspectClass}${isVisible ? ' GalleryImage-visible' : ''}${
          isFullWidth ? ' GalleryImage-fullwidth' : ''
        }`}
      >
        <div className="gallery-img-wrapper">
          <button className="gallery-fullwidth-trigger" onClick={() => setFullWidth(!isFullWidth)}>
            <Image fluid={image.localFile.childImageSharp.fluid} />
          </button>
        </div>
        {caption && <span className="caption">{caption}</span>}
      </div>
    </VisibilitySensor>
  );
};

GalleryImage.propTypes = {
  image: PropTypes.shape({
    localFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({
          aspectRatio: PropTypes.number,
          base64: PropTypes.string,
          sizes: PropTypes.string,
          src: PropTypes.string,
          srcSet: PropTypes.string,
          presentationWidth: PropTypes.number,
        }),
      }),
    }),
  }),
  caption: PropTypes.string,
};

export default GalleryImage;
