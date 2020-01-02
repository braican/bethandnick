import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { TransitionGroup, Transition } from 'react-transition-group';
import VisibilitySensor from 'react-visibility-sensor';

const timeout = 100;

const getTransitionStyles = {
  entering: {
    overflow: 'hidden',
    width: 0,
    height: 0,
    opacity: 0,
    transform: 'scale(.98)',
  },
  entered: {
    transition: `opacity ${timeout * 2}ms ease-in-out, transform ${timeout * 6}ms ease-out`,
    transform: 'scale(1)',
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
};


import styles from './ImageGallery.module.scss';

const ImageGallery = ({ wordpressBethandnickGallery: images }) => {
  const { gallery } = images;


  if (!gallery || gallery.length < 1) {
    return null;
  }

  const [img, setImg] = useState(gallery[0].image.localFile.childImageSharp.fluid.src);

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryImage}>
        <TransitionGroup>
          <Transition key={img} timeout={timeout}>{status => <div style={{ ...getTransitionStyles[status] }}><img className={styles.img} src={img} alt=""/></div>}</Transition>
        </TransitionGroup>
      </div>

      {gallery.map(({ image, caption }) => (

        <div key={image.id} className={styles.imageTrigger}>
          <VisibilitySensor
            onChange={visible => {
              if (visible) {
                setImg(image.localFile.childImageSharp.fluid.src);
              }
            }}
          >
            <p className={styles.caption}>{caption}</p>
          </VisibilitySensor>
        </div>
      ))}

      {/* {gallery.map(({ image, caption }) => (
        <GalleryImage image={image} caption={caption} key={image.id} />
      ))} */}
    </div>
  );
};

ImageGallery.propTypes = {
  wordpressBethandnickGallery: PropTypes.shape({
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        caption: PropTypes.string,
        image: PropTypes.object,
      })
    ),
  }),
};

const ImageGalleryWithQuery = () => (
  <StaticQuery
    query={graphql`
      query GalleryPage {
        wordpressBethandnickGallery {
          gallery {
            caption
            image {
              id
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1620, quality: 90) {
                    src
                    presentationWidth
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={ImageGallery}
  />
);

export default ImageGalleryWithQuery;
