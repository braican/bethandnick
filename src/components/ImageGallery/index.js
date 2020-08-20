import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import GalleryImage from './Image';

import styles from './ImageGallery.module.scss';

const ImageGallery = ({ wordpressBethandnickGallery: images }) => {
  const { gallery } = images;

  if (!gallery) {
    return null;
  }

  // If we're on a desktop, enhance the gallery to the horizontal scroller.
  return (
    <div className={styles.gallery}>
      {gallery
        .filter(({ image }) => image)
        .map(({ image, caption }) => (
          <GalleryImage image={image} caption={caption} key={image.id} />
        ))}
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
                    ...GatsbyImageSharpFluid
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
