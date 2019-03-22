import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './ImageGallery.scss';

const ImageGallery = ({ images }) => {
  const [galleryX, setGalleryPos] = useState(0);
  const [galleryWidth, setGalleryWidth] = useState(0);
  const imageRefs = useRef([]);

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const windowDiff = windowHeight - windowWidth;
  const imgHeight = windowHeight;
  const threshold = 0.5;
  const intersection = windowWidth * threshold;

  if (!images) {
    return null;
  }

  useEffect(() => {
    const imagePosMap = [intersection * -1];

    const initGalleryWidth = images.reduce((prev, { image }) => {
      const {
        presentationWidth,
        presentationHeight,
        aspectRatio,
      } = image.localFile.childImageSharp.fluid;

      const imgWidth = presentationHeight > imgHeight ? imgHeight * aspectRatio : presentationWidth;
      const rightEdge = prev + imgWidth;
      imagePosMap.push(rightEdge - intersection);
      return rightEdge;
    }, 0);

    setGalleryWidth(initGalleryWidth);

    const findScroll = () => {
      const scrollPos = window.pageYOffset;
      setGalleryPos(scrollPos);
      imagePosMap.forEach((x, i) => {
        if (x < scrollPos && imageRefs.current[i]) {
          imageRefs.current[i].classList.add('active');
        }
      });
      window.requestAnimationFrame(findScroll);
    };

    window.requestAnimationFrame(findScroll);
  }, []);

  return (
    <div
      className="Gallery"
      id="gallery-root"
      style={{ height: `${galleryWidth + windowDiff - 120}px` }}
    >
      <div
        className="track"
        style={{
          width: `${galleryWidth}px`,
          transform: `translate3d(-${galleryX}px, 0, 0)`,
        }}
      >
        {images.map(({ image }, index) => {
          const { src, aspectRatio } = image.localFile.childImageSharp.fluid;
          const aspectClass = aspectRatio > 1.4 ? 'wide' : aspectRatio < 1 ? 'tall' : 'square';

          return (
            <div key={index} className={`gallery-img-wrapper ${aspectClass}`}>
              <div className="gallery-img-constrictor">
                <img src={src} alt="" ref={div => imageRefs.current.push(div)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({}),
        }),
      }),
    })
  ),
};

export default ImageGallery;
