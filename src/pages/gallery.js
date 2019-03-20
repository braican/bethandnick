import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './styles/gallery.scss';

const GalleryPage = ({ wordpressBethandnickGallery: data }) => {
  const { gallery } = data;

  const galleryWidth = gallery.reduce((prev, { image }) => {
    const { presentationWidth } = image.localFile.childImageSharp.fluid;
    return prev + presentationWidth;
  }, 0);

  return (
    <Wrapper contextClass="layout--gallery">
      <Header contextClass="header--main" />

      <main className="GalleryLayout">
        {gallery ? (
          <div className="Gallery" style={{ width: `${galleryWidth}px` }}>
            {gallery.map(({ image }, index) => {
              const { src, aspectRatio } = image.localFile.childImageSharp.fluid;
              const aspectClass = aspectRatio > 1.4 ? 'wide' : aspectRatio < 1 ? 'tall' : 'base';

              return (
                <div key={index} className={`gallery-img-wrapper ${aspectClass}`}>
                  <img src={src} alt="" />
                </div>
              );
            })}
          </div>
        ) : null}
      </main>

      <Footer />
    </Wrapper>
  );
};

GalleryPage.propTypes = {
  wordpressBethandnickGallery: PropTypes.shape({
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.shape({
          localFile: PropTypes.shape({
            childImageSharp: PropTypes.shape({}),
          }),
        }),
      })
    ),
  }),
};

const GalleryPageWithQuery = () => (
  <StaticQuery
    query={graphql`
      query GalleryPage {
        wordpressBethandnickGallery {
          gallery {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 980, quality: 90) {
                    src
                    aspectRatio
                    presentationWidth
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={GalleryPage}
  />
);

export default GalleryPageWithQuery;
