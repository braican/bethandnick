import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';

const GalleryPage = ({ wordpressBethandnickGallery: data }) => (
  <Wrapper contextClass="layout--gallery">
    <Header contextClass="header--main" />

    <main className="gallery-main">
      <ImageGallery images={data.gallery} />
    </main>

    <Footer />
  </Wrapper>
);

GalleryPage.propTypes = {
  wordpressBethandnickGallery: PropTypes.shape({
    gallery: PropTypes.arrayOf(PropTypes.object),
  }),
};

const GalleryPageWithQuery = () => (
  <StaticQuery
    query={graphql`
      query GalleryPage {
        wordpressBethandnickGallery {
          gallery {
            caption
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 780, quality: 90) {
                    src
                    aspectRatio
                    presentationWidth
                    presentationHeight
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
