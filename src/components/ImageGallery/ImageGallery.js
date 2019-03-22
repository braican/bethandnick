import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './ImageGallery.scss';

const ImageGallery = ({ images }) => {
  const [galleryX, setGalleryPos] = useState(0);
  const [galleryWidth, setGalleryWidth] = useState(0);
  const imageRefs = useRef([]);

  const trackMarginTop = 60;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const windowDiff = windowHeight - windowWidth;
  const imgHeight = windowHeight - trackMarginTop;
  const threshold = 0.5;
  const intersection = windowWidth * threshold;
  const isMobile = windowWidth < 781;

  if (!images) {
    return null;
  }

  useEffect(() => {
    if (isMobile) {
      return;
    }

    let animationFrameHolder;
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
      animationFrameHolder = window.requestAnimationFrame(findScroll);
    };

    animationFrameHolder = window.requestAnimationFrame(findScroll);

    return function cleanup() {
      window.cancelAnimationFrame(animationFrameHolder);
    };
  }, []);

  // If we're on a mobile device, just render the image gallery.
  if (isMobile) {
    return (
      <div className="Gallery">
        {images.map(({ image, caption }, index) => {
          const { src, aspectRatio } = image.localFile.childImageSharp.fluid;
          const aspectClass = aspectRatio > 1.4 ? 'wide' : aspectRatio < 1 ? 'tall' : 'square';

          return (
            <div key={index} className={`gallery-img-wrapper ${aspectClass}`}>
              <div className="gallery-img-constrictor">
                <img src={src} alt="" />
                {caption && <span className="caption">{caption}</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // If we're on a desktop, enhance the gallery to the horizontal scroller.
  return (
    <div className="Gallery" style={{ height: `${galleryWidth + windowDiff - 120}px` }}>
      <div
        className="track"
        style={{
          width: `${galleryWidth}px`,
          transform: `translate3d(-${galleryX}px, 0, 0)`,
          marginTop: `${trackMarginTop}px`,
        }}
      >
        {images.map(({ image, caption }, index) => {
          const { src, aspectRatio } = image.localFile.childImageSharp.fluid;
          const aspectClass = aspectRatio > 1.4 ? 'wide' : aspectRatio < 1 ? 'tall' : 'square';

          return (
            <div
              key={index}
              className={`gallery-img-wrapper ${aspectClass}`}
              ref={div => imageRefs.current.push(div)}
            >
              <div className="gallery-img-constrictor">
                <img src={src} alt="" />
                {caption && <span className="caption">{caption}</span>}
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
      caption: PropTypes.string,
      image: PropTypes.shape({
        localFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({}),
        }),
      }),
    })
  ),
};

export default ImageGallery;
